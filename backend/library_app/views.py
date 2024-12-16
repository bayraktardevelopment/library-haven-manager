from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Book, Student, Lending
from .serializers import BookSerializer, StudentSerializer, LendingSerializer

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [permissions.IsAuthenticated()]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]

class LendingViewSet(viewsets.ModelViewSet):
    queryset = Lending.objects.all()
    serializer_class = LendingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Lending.objects.all()
        return Lending.objects.filter(student__user=self.request.user)

    @action(detail=True, methods=['put'])
    def approve(self, request, pk=None):
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        lending = self.get_object()
        lending.status = 'APPROVED'
        lending.borrow_date = timezone.now()
        lending.save()
        
        lending.book.available = False
        lending.book.save()
        
        return Response(self.get_serializer(lending).data)

    @action(detail=True, methods=['put'])
    def return_book(self, request, pk=None):
        lending = self.get_object()
        lending.status = 'RETURNED'
        lending.return_date = timezone.now()
        lending.save()
        
        lending.book.available = True
        lending.book.save()
        
        return Response(self.get_serializer(lending).data)
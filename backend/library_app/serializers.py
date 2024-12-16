from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Student, Lending

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = '__all__'

class LendingSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Lending
        fields = '__all__'
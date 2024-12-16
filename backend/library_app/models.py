from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=200, verbose_name="Kitap Adı")
    author = models.CharField(max_length=200, verbose_name="Yazar")
    isbn = models.CharField(max_length=13, unique=True, verbose_name="ISBN")
    available = models.BooleanField(default=True, verbose_name="Müsait")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Kitap"
        verbose_name_plural = "Kitaplar"

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_number = models.CharField(max_length=20, unique=True, verbose_name="Öğrenci Numarası")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.student_number})"

    class Meta:
        verbose_name = "Öğrenci"
        verbose_name_plural = "Öğrenciler"

class Lending(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Onay Bekliyor'),
        ('APPROVED', 'Onaylandı'),
        ('RETURNED', 'İade Edildi'),
        ('REJECTED', 'Reddedildi'),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name="Kitap")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Öğrenci")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING', verbose_name="Durum")
    borrow_date = models.DateTimeField(null=True, blank=True, verbose_name="Ödünç Alma Tarihi")
    return_date = models.DateTimeField(null=True, blank=True, verbose_name="İade Tarihi")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.book.title} - {self.student.user.get_full_name()}"

    class Meta:
        verbose_name = "Ödünç Alma"
        verbose_name_plural = "Ödünç Alma İşlemleri"
from django.db import models
from faculty.models import Faculty
from Year.models import YearModel
from subject.models import subject
from semester.models import semester
# Create your models here.


class Students(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    Year = models.ForeignKey(YearModel, on_delete=models.CASCADE, default=None)
    semester = models.ForeignKey(
        semester, on_delete=models.CASCADE, default=None)
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, default=None)
    # subject_assign = models.ManyToManyField(subject)
    gender = models.CharField(max_length=255)
    # profile_pic = models.ImageField()
    Is_verified = models.BooleanField(default=True)


class UnverifiedStudent(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    Year = models.ForeignKey(YearModel, on_delete=models.CASCADE, default=None)
    semester = models.ForeignKey(
        semester, on_delete=models.CASCADE, default=None)
    faculty = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, default=None)
    # subject_assign = models.ManyToManyField(subject)
    gender = models.CharField(max_length=255)
    # profile_pic = models.ImageField()
    Is_verified = models.BooleanField(default=False)

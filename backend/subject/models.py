from django.db import models
from faculty.models import Faculty
from semester.models import semester
# Create your models here.


class subject(models.Model):
    sub_code = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    faculty = models.ForeignKey(Faculty, on_delete=models.DO_NOTHING)
    semester = models.ForeignKey(semester, on_delete=models.DO_NOTHING)
    implement_year = models.CharField(max_length=255)
    syllabus = models.FileField(upload_to="uploads/")
    sub_type = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

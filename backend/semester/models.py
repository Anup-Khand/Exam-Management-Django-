from django.db import models
from Year.models import YearModel
# Create your models here.


class semester(models.Model):
    sem = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.sem

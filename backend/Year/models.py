from django.db import models

# Create your models here.


class YearModel(models.Model):
    Year = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.Year

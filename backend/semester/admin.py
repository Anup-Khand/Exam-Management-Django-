from django.contrib import admin
from .models import semester
# Register your models here.


@admin.register(semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['id', 'sem']

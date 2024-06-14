from django.contrib import admin
from .models import subject
# Register your models here.
@admin.register(subject)
class subjectAdmin(admin.ModelAdmin):
    list_display = ['sub_code', 'name', 'faculty', 'semester', 'implement_year', 'syllabus', 'sub_type', 'date_created', 'date_updated']
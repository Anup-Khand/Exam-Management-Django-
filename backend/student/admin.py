from django.contrib import admin
from .models import Students, UnverifiedStudent
# Register your models here.


@admin.register(Students)
class studentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'password', 'phone',
                    'address', 'Year', 'semester', 'faculty', 'gender', 'Is_verified']
    # filter_horizontal = ['subject_assign']


@admin.register(UnverifiedStudent)
class unverifiedstudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'password', 'phone',
                    'address', 'Year', 'semester', 'faculty', 'gender', 'Is_verified']

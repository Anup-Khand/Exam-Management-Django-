from django.contrib import admin
from .models import attendance
# Register your models here.
# @admin.register(attendance)
# class attendanceAdmin(admin.ModelAdmin):
#     list_display = ['attid', 'stuid', 'subid', 'attendance_date', 'status']


@admin.register(attendance)

class AttendanceAdmin(admin.ModelAdmin):
    list_display =["attid","stuid","sub_code","attendance_date","status"]
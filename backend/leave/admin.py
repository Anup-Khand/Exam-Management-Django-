from django.contrib import admin
from .models import Leave
# Register your models here.
@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    list_display = ['leaveid', 'stuid', 'leave_date', 'leave_msg', 'leave_status']
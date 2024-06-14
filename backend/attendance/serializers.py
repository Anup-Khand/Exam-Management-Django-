from rest_framework import serializers
from .models import attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = attendance
        fields = ['attid', 'stuid', 'subid', 'attendance_date', 'status']
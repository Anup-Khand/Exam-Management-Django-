from rest_framework import serializers
from .models import Leave

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['leaveid', 'stuid', 'leave_date', 'leave_msg', 'leave_status']

from django.db import models
from student.models import Students
# Creating leave  models
class Leave(models.Model):
    leaveid = models.IntegerField(primary_key=True)
    stuid = models.ForeignKey(Students, on_delete=models.CASCADE)
    leave_date = models.DateField(null=True, blank=True)
    leave_msg = models.TextField()
    leave_status = models.BooleanField(default=False)
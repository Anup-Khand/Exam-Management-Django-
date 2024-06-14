from django.db import models
from student.models import Students
from subject.models import subject
# Create your models here.
  
class attendance(models.Model):
    attid = models.IntegerField(primary_key=True)
    stuid = models.ForeignKey(Students, on_delete=models.DO_NOTHING)
    sub_code = models.ForeignKey(subject, on_delete=models.DO_NOTHING)
    attendance_date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=False)
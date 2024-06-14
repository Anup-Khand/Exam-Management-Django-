from . import views
from django.urls import path
urlpatterns = [
    
     path('attendance1/', views.attendance_api),
]
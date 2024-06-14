from subject import views
from django.urls import path
urlpatterns = [
    
     path('subject/', views.subject_api),
]
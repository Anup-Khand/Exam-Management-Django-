from . import views
from django.urls import path
urlpatterns = [
    path('faculty/', views.Faculty_Api)
]
from . import views
from django.urls import path
urlpatterns = [
    path('semester/', views.semester_api)
]
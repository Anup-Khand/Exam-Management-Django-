from . import views
from django.urls import path
urlpatterns = [
    path('year/', views.Year_Api)
]
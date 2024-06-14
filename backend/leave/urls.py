from . import views
from django.urls import path
urlpatterns = [
    path('leave/', views.Leave_api)
]
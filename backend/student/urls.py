from student import views
from django.urls import path
urlpatterns = [

    path('student/', views.student_api),
    path('unverified/', views.unverifiedstudent_api),
    path('login/', views.login_api),
]

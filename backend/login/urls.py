from django.urls import path, include
from login import views
# from .views import LoginUserView, GenerateTokenView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("accounts/", include("django.contrib.auth.urls")),
    path('login/', views.User_api),
    path('api/token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]




from django.urls import path, include
from .api import LoginAPI, RegisterAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('auth/user/', UserAPI.as_view()),
    path('auth/register/', RegisterAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/logout/', knox_views.LoginView.as_view(), name='knox_logout'),
]

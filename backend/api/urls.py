from django.urls import path
from . import views

urlpatterns = [
    path('create_user/', views.CreateUser.as_view()),
    path('validate_email/', views.ValidateEmail.as_view()),
    path('login_user/', views.LoginUser.as_view()),
]
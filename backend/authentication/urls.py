from django.urls import path
from .views import CreateUserView, index, CheckEmailView

urlpatterns = [
    path(' ', index),
    path('create-user/', CreateUserView.as_view()),
    path('check-email/', CheckEmailView.as_view(), name='check-email'),
]
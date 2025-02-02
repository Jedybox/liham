from django.urls import path
from .views import CreateUserView, index, CheckEmailView, UserView, Me

urlpatterns = [
    path(' ', index),
    path('create-user/', CreateUserView.as_view()),
    path('check-email/', CheckEmailView.as_view(), name='check-email'),
    path('search/', UserView.as_view(), name='search-user'),
    path('me/', Me.as_view(), name='get-me'),
]
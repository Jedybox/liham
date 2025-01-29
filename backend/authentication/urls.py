from django.urls import path
from .views import CreateUserView, index, CheckEmailView, UserView

urlpatterns = [
    path(' ', index),
    path('create-user/', CreateUserView.as_view()),
    path('check-email/', CheckEmailView.as_view(), name='check-email'),
    path('search/', UserView.as_view(), name='search-user'),
]
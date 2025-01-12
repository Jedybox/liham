from django.urls import path
from .views import CreateUserView, index

urlpatterns = [
    path(' ', index),
    path('create-user/', CreateUserView.as_view()),
]
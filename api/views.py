from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import generics
from .serializers import UserSerializer, EmailValdationView
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ChechEmailView(generics.CreateAPIView):
    serializer_class = EmailValdationView
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return JsonResponse({'available': True, 'message': 'Email is valid'}, status=200)
        
        return JsonResponse({'available': False, 'message': 'Email already exists'}, status=400)
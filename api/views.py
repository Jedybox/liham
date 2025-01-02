from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import generics, status
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
            return JsonResponse({'available': True, 'message': 'Email is valid'}, status=status.HTTP_200_OK)
        
        return JsonResponse({'available': False, 'message': serializer.errors['email'][0]}, status=status.HTTP_400_BAD_REQUEST)
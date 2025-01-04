from django.shortcuts import render
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework import generics, status
from .serializers import UserSerializer, EmailValdationView
from rest_framework.permissions import IsAuthenticated, AllowAny

import random
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'User created'}, status=status.HTTP_201_CREATED)
        
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        
        if not serializer.is_valid() :
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED)
        
        if request.password != serializer.data['password']:
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED)
        
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        
        pass

class ChechEmailView(generics.CreateAPIView):
    serializer_class = EmailValdationView
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return JsonResponse({'available': True, 'message': 'Email is valid'}, status=status.HTTP_200_OK)
        
        return JsonResponse({'available': False, 'message': serializer.errors['email'][0]}, status=status.HTTP_400_BAD_REQUEST)

class SendEmailView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        
        verification_code = random.randint(1000, 9999)
        
        send_mail(
            'Email Verification',
            f'Your verification code is {verification_code}',
            'settings.EMAIL_HOST_USER',
            [email],
            fail_silently=False,
        )
        
        return JsonResponse({'code': verification_code, 'message': 'Email sent'}, status=status.HTTP_200_OK)
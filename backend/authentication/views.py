from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from rest_framework.response import Response
from .serializers import LihamUserSerializer, UserSerializer
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

import random

# Create your views here.
def index(request):
    return JsonResponse({'message':f'fuck off and your request:{request}'},status=status.HTTP_404_NOT_FOUND)

class CreateUserView(APIView):
    LihamUser_serializer_class = LihamUserSerializer
    User_serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        
        user_serializer = self.User_serializer_class(data=request.data)
        
        if user_serializer.is_valid():
            user = user_serializer.save()
            
            request.data['user'] = user.id
            
            user = User.objects.get(id=user.id)
            
            lihamdata = {
                'user': user.id,
                'bio': '',
                'image': None,
                'is_active': False,
            }
            
            
            liham_user_serializer = self.LihamUser_serializer_class(data=lihamdata)
            
            if liham_user_serializer.is_valid():
                liham_user_serializer.save()
                
                return Response(liham_user_serializer.data, status=status.HTTP_201_CREATED)
            
            print(liham_user_serializer.errors)
            return Response(liham_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
    
class UserView(APIView):
    LihamUser_serializer_class = LihamUserSerializer
    User_serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        user = request.user
        user_serializer = self.User_serializer_class(user, data=request.data, partial=True)
        
        if user_serializer.is_valid():
            user_serializer.save()
            
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        
        search = request.query_params.get('query')
        
        print(f"Search query: {search}")
            
        users = User.objects.filter(username__icontains=search)
        
        for user in users:
            username = user.username
            
            if search.lower() in username.lower():
                continue
                
            users = users.exclude(username=username)
            
        user_serializer = self.User_serializer_class(users, many=True)
        
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        user = request.user
        user.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)


"""
This checks if email is already in use
"""
class CheckEmailView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response(
                {"error": "Email query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate email format
        try:
            validate_email(email)
        except ValidationError:
            print("Invalid email format.")
            return Response(
                {"error": "Invalid email format."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if email is already in use
        email_in_use = User.objects.filter(email=email).exists()
        
        if email_in_use:
            return Response(
                {"email_in_use": True, "message": "Email is already in use."},
                status=status.HTTP_409_CONFLICT  # Conflict status code
            )
        
        verificationCode = random.randint(100000, 999999)
        
        print(f"Verification code: {verificationCode}")
        
        return Response(
            {
                "email_in_use": False, "message": "Email is available.",
                "verificationCode": verificationCode
            },
            status=status.HTTP_200_OK
        )
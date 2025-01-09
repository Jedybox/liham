from django.http import JsonResponse
from rest_framework.decorators import APIView
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from . import models
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.

class CreateUser(APIView):
    permission_classes = [AllowAny]
    queryset = models.users.find()
    
    def post(self, request):
        
        data = request.data
        user = models.users.find_one({"username": data["username"]})
        
        if user:
            return JsonResponse({"error": "Username already exists"})
        
        data["password"] = make_password(data["password"])
        
        
        user = models.users.insert_one(data)
        return JsonResponse({"message": "User created successfully"})

class ValidateEmail(APIView):
    
    def post(self, request):
        data = request.data
        user = models.users.find_one({"email": data["email"]})
        if user:
            return JsonResponse({"message": "User exists"})
        return JsonResponse({"error": "User does not exist"})


class LoginUser(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        user = models.users.find_one({"username": data["username"]})
        
        if not user:
            return JsonResponse({"error": "User does not exist"})
        
        if not check_password(data["password"], user["password"]):
            return JsonResponse({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return JsonResponse({"message": "Login successful"}, status=status.HTTP_200_OK)

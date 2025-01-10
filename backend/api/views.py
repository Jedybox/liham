from django.http import JsonResponse
from rest_framework.decorators import APIView
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from . import serializers
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.

class CreateUser(APIView):
    permission_classes = [AllowAny]
    serializer_class = serializers.UserSerializer
    
    def post(self, request):
        
        data = request.data
        serializer = self.serializer_class(data=data)
        user = serializer.exists(username=data["username"])
        
        if user:
            return JsonResponse({"error": "Username already exists"})
        
        data["password"] = make_password(data["password"])
        
        serializer.create(data)
        return JsonResponse({"message": "User created successfully"})
    
    def get(self, request):
        data = request.data
        serializer = self.serializer_class()
        users = serializer.get_user(data["username"])
        
        if isinstance(users, list):
            users = [{**u, "_id": str(u["_id"])} for u in users]
        elif isinstance(users, dict):
            users["_id"] = str(users["_id"])
        
        return JsonResponse(users, safe=False)

class ValidateEmail(APIView):
    serializer_class = serializers.UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        serializer = self.serializer_class()
        userexisting = serializer.exists(email=data["email"])
        
        if not userexisting:
            return JsonResponse({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        return JsonResponse({"message": "Email is available"}, status=status.HTTP_200_OK)

class LoginUser(APIView):
    serializer_class = serializers.UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        serializer = self.serializer_class()
        user = serializer.get_user(data["username"])
        
        if not user:
            return JsonResponse({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        if not check_password(data["password"], user["password"]):
            return JsonResponse({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return JsonResponse({"message": "Login successful"}, status=status.HTTP_200_OK)

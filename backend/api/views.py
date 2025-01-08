from django.http import JsonResponse
from rest_framework.decorators import APIView
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from . import models

# Create your views here.

class CreateUser(APIView):
    permission_classes = [AllowAny]
    queryset = models.users.find()
    
    def post(self, request):
        data = request.data
        user = models.users.find_one({"email": data["email"]})
        if user:
            return JsonResponse({"error": "User already exists"})
        user = models.users.insert_one(data)
        return JsonResponse({"message": "User created successfully"})

class ValidateEmail(APIView):
    
    def post(self, request):
        data = request.data
        user = models.users.find_one({"email": data["email"]})
        if user:
            return JsonResponse({"message": "User exists"})
        return JsonResponse({"error": "User does not exist"})



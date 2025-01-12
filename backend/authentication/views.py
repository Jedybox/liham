from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from rest_framework.response import Response
from .serializers import LihamUserSerializer, UserSerializer

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
        user = request.user
        user_serializer = self.User_serializer_class(user)
        
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        user = request.user
        user.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

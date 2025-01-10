from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from . import serializers

class Authenticator(JWTAuthentication):
    
    def authenticate_user(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        serializer = serializers.UserSerializer()
        
        if not serializer.authenticate_user(username, password):
            raise AuthenticationFailed('Invalid credentials')
        
        user = serializer.get_user(username)
        refresh = RefreshToken.for_user(user)
        
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }

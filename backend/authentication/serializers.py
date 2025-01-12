from django.contrib.auth.models import User
from rest_framework import serializers
from .models import LihamUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

    def get_id(self, instance):
        return instance['id']

    
class LihamUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LihamUser
        fields = ['id', 'user', 'bio', 'image', 'is_active']
        
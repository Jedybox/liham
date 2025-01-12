from django.contrib.auth.models import User
from rest_framework import serializers
from .models import FriendRequest, FriendList, BlockList

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'sender', 'receiver', 'is_active', 'created_at', 'updated_at']
    
class FriendListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendList
        fields = ['id', 'user', 'friends', 'count_of_friends']
    
class BlockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockList
        fields = ['id', 'user', 'blocked_users', 'count_of_blocked_users']
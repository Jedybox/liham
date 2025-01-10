from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from . import models

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    picture = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    is_active = serializers.BooleanField(default=True)
    
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        user_id = models.users.insert_one(validated_data).inserted_id
        return models.users.find_one({"_id": user_id})
    
    def update(self, instance, validated_data):
        pass

    def get_user(self, username: str):
        user = models.users.find_one({"username": username})
        
        if user:
            user["_id"] = str(user["_id"])
        
        return user
    
    def exist(self, username=None, email=None):
        
        user: dict = None
        
        if username:
            user = models.users.find_one({"username": username})
        
        if email:
            user = models.users.find_one({"email": email})
        
        return True if user else False


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField()
    receiver = serializers.CharField()
    message = serializers.CharField()
    timestamp = serializers.DateTimeField()
    
    def create(self, validated_data):
        message_id = models.messages.insert_one(validated_data).inserted_id
        return models.messages.find_one({"_id": message_id})
    
    def update(self, instance, validated_data):
        pass

class ConversationSerializer(serializers.ModelSerializer):
    participants = serializers.ListField(child=serializers.CharField())
    messages = MessageSerializer(many=True)
    
    def create(self, validated_data):
        conversation_id = models.conversations.insert_one(validated_data).inserted_id
        return models.conversations.find_one({"_id": conversation_id})
    
    def update(self, instance, validated_data):
        pass

class FriendListSerializer(serializers.ModelSerializer):
    user = serializers.CharField()
    friends = serializers.ListField(child=serializers.CharField())
    
    def create(self, validated_data):
        friend_list_id = models.friend_list.insert_one(validated_data).inserted_id
        return models.friend_list.find_one({"_id": friend_list_id})
    
    def update(self, instance, validated_data):
        pass
    
class FriendRequestSerializer(serializers.ModelSerializer):
    sender = serializers.CharField()
    receiver = serializers.CharField()
    
    def create(self, validated_data):
        friend_request_id = models.friend_request.insert_one(validated_data).inserted_id
        return models.friend_request.find_one({"_id": friend_request_id})
    
    def update(self, instance, validated_data):
        pass
    
class BlockListSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        block_list_id = models.block_list.insert_one(validated_data).inserted_id
        return models.block_list.find_one({"_id": block_list_id})
    
    def update(self, instance, validated_data):
        pass
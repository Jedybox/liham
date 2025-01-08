from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from models import users, messages, conversations, friend_list, friend_request, block_list

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    picture = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    is_active = serializers.BooleanField(default=True)
    
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        user_id = users.insert_one(validated_data).inserted_id
        return users.find_one({"_id": user_id})
    
    def update(self, instance, validated_data):
        pass

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField()
    receiver = serializers.CharField()
    message = serializers.CharField()
    timestamp = serializers.DateTimeField()
    
    def create(self, validated_data):
        message_id = messages.insert_one(validated_data).inserted_id
        return messages.find_one({"_id": message_id})
    
    def update(self, instance, validated_data):
        pass

class ConversationSerializer(serializers.ModelSerializer):
    participants = serializers.ListField(child=serializers.CharField())
    messages = MessageSerializer(many=True)
    
    def create(self, validated_data):
        conversation_id = conversations.insert_one(validated_data).inserted_id
        return conversations.find_one({"_id": conversation_id})
    
    def update(self, instance, validated_data):
        pass

class FriendListSerializer(serializers.ModelSerializer):
    user = serializers.CharField()
    friends = serializers.ListField(child=serializers.CharField())
    
    def create(self, validated_data):
        friend_list_id = friend_list.insert_one(validated_data).inserted_id
        return friend_list.find_one({"_id": friend_list_id})
    
    def update(self, instance, validated_data):
        pass
    
class FriendRequestSerializer(serializers.ModelSerializer):
    sender = serializers.CharField()
    receiver = serializers.CharField()
    
    def create(self, validated_data):
        friend_request_id = friend_request.insert_one(validated_data).inserted_id
        return friend_request.find_one({"_id": friend_request_id})
    
    def update(self, instance, validated_data):
        pass
    
class BlockListSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        block_list_id = block_list.insert_one(validated_data).inserted_id
        return block_list.find_one({"_id": block_list_id})
    
    def update(self, instance, validated_data):
        pass
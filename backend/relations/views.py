from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import FriendRequestSerializer, FriendListSerializer, BlockListSerializer

# Create your views here.

class FriendRequestView(APIView):
    class_serializer = FriendRequestSerializer
    authentication_classes = [IsAuthenticated]
    
    def get(self, request):
        request_type = request.data.get('request_type')
        serializer = self.class_serializer
        
        if request_type == 'sent':
            
            friend_requests = serializer.objects.filter(sender=request.user)
            return Response(friend_requests.data, status=status.HTTP_200_OK)
        
        if request_type == 'received':
            
            friend_requests = serializer.objects.filter(receiver=request.user)
            return Response(friend_requests.data, status=status.HTTP_200_OK)

        return JsonResponse({'message':'Invalid request type'}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')
        
        serializer = self.class_serializer(data={
            'sender':sender_id,
            'receiver':receiver_id
        })
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    def delete(self, request):
        request_id = request.data.get('request_id')
        
        try:
            friend_request = self.class_serializer.objects.get(id=request_id)
        except:
            return JsonResponse({'message':'Invalid request id'}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_request.delete()
        
        return JsonResponse({'message':'Friend request deleted'}, status=status.HTTP_200_OK)
        
class FriendListView(APIView):
    class_serializer = FriendListSerializer
    authentication_classes = [IsAuthenticated]
    
    def get(self, request):
        friend_list = self.class_serializer.objects.get(user=request.user)
        return Response(friend_list.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        friend_id = request.data.get('friend_id')
        
        friend_list = self.class_serializer.objects.get(user=request.user)
        friend_list.friends.add(friend_id)
        friend_list.count_of_friends += 1
        friend_list.save()
        
        return JsonResponse({'message':'Friend added'}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        friend_id = request.data.get('friend_id')
        
        friend_list = self.class_serializer.objects.get(user=request.user)
        friend_list.friends.remove(friend_id)
        friend_list.count_of_friends -= 1
        friend_list.save()
        
        return JsonResponse({'message':'Friend removed'}, status=status.HTTP_200_OK)

class BlockListView(APIView):
    
    class_serializer = BlockListSerializer
    authentication_classes = [IsAuthenticated]
    
    def get(self, request):
        block_list = self.class_serializer.objects.get(user=request.user)
        return Response(block_list.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        blocked_user_id = request.data.get('blocked_user_id')
        
        block_list = self.class_serializer.objects.get(user=request.user)
        block_list.blocked_users.add(blocked_user_id)
        block_list.count_of_blocked_users += 1
        block_list.save()
        
        return JsonResponse({'message':'User blocked'}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        blocked_user_id = request.data.get('blocked_user_id')
        
        block_list = self.class_serializer.objects.get(user=request.user)
        block_list.blocked_users.remove(blocked_user_id)
        block_list.count_of_blocked_users -= 1
        block_list.save()
        
        return JsonResponse({'message':'User unblocked'}, status=status.HTTP_200_OK)
    
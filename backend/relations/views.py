from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import FriendRequestSerializer, FriendListSerializer, BlockListSerializer

# Create your views here.

"""_summary_
This class is used to handle friend requests.
"""
class FriendRequestView(APIView):
    class_serializer = FriendRequestSerializer
    FriendList_serializer = FriendListSerializer
    permission_classes = [IsAuthenticated]
    
    """_summary_
    This method is used to get all the friend requests sent or received by the user.
    
    json objects
    {
        "request_type": "SENT",
        "user": user.id
    }
    {
        "request_type": "RECEIVED",
        "user": user.id
    }
    """
    def get(self, request):
        request_type = request.data.get('request_type')
        serializer = self.class_serializer
        
        if request_type == 'SENT':
            
            friend_requests = serializer.Meta.model.objects.filter(sender=request.data.get('user'))
            friend_requests_data = serializer(friend_requests, many=True).data
            return Response(friend_requests_data, status=status.HTTP_200_OK)
        
        if request_type == 'RECEIVED':
            
            friend_requests = serializer.Meta.model.objects.filter(receiver=request.data.get('user'))
            friend_requests_data = serializer(friend_requests, many=True).data
            return Response(friend_requests_data, status=status.HTTP_200_OK)

        return JsonResponse({'message':'Invalid request type'}, status=status.HTTP_400_BAD_REQUEST)
    
    
    """_summary_
    This method is used to send a friend request.
    
    json object:
    {
        "sender": sender.id,
        "receiver": receiver
    }
    """
    def post(self, request):
        data = request.data
        
        serializer = self.class_serializer(data=data)   
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    """ _summary_
    This method is used to accept or reject a friend request.
    
    json object:
    {
        "id": request.id,
        "type": "ACCEPT" or "REJECT"
    }
    """
    def put (self, request):
        rtype = request.data.get('type')

        if rtype == 'ACCEPT':
            
            try:
                friend_request = self.class_serializer.Meta.model.objects.get(id=request.data.get('id'))
                friend_request.status = 'ACCEPTED'
                friend_request.save()

                friend_list = self.FriendList_serializer.Meta.model.objects.get(user=friend_request.sender)
                friend_list.friends.add(friend_request.receiver)
                friend_list.count_of_friends += 1
                friend_list.save()

                friend_list = self.FriendList_serializer.Meta.model.objects.get(user=friend_request.receiver)
                friend_list.friends.add(friend_request.sender)
                friend_list.count_of_friends += 1
                friend_list.save()
            except Exception as e:
                print(e.__str__())
                return JsonResponse({'message':'Friend request not found'}, status=status.HTTP_404_NOT_FOUND)

            
            return Response(status=status.HTTP_200_OK)
        
        if rtype == 'REJECT':
            friend_request = self.class_serializer.Meta.model.objects.get(id=request.data.get('id'))
            friend_request.status = 'REJECTED'
            friend_request.save()
            
            return JsonResponse({'message':'Friend request rejected'}, status=status.HTTP_200_OK)

        return JsonResponse({'message':'Invalid request type'}, status=status.HTTP_400_BAD_REQUEST)
        
"""_summary_
This class is used to handle friend list.
"""
class FriendListView(APIView):
    class_serializer = FriendListSerializer
    authentication_classes = [IsAuthenticated]
    
    """ _summary_
    This method is used to get the list of friends of the user.
    
    json object:
    {
        "user": user.id
    }
    """
    def get(self, request):
        friend_list = self.class_serializer.Meta.model.objects.get(user=request.user)
        friend_list_data = self.class_serializer(friend_list).data
        return Response(friend_list_data, status=status.HTTP_200_OK)
    
    
    """ _summary_
    This method is used to remove a friend from the friend list.
    
    json object:
    {
        "user_id": user.id,
        "friend_user_id": friend.id
    }
    """
    def put(self, request):
        user_id = request.data.get('user_id')
        friend_user_id = request.data.get('friend_user_id')
        
        friend_list = self.class_serializer.Meta.model.objects.get(user=user_id)
        friend_list.friends.remove(friend_user_id)
        
        friend_list.count_of_friends -= 1
        friend_list.save()
        
        friend_list = self.class_serializer.Meta.model.objects.get(user=friend_user_id)
        friend_list.friends.remove(user_id)
        friend_list.count_of_friends -= 1
        
        return Response(status=status.HTTP_200_OK)

"""_summary_
This class is used to handle block list.
"""
class BlockListView(APIView):
    
    class_serializer = BlockListSerializer
    authentication_classes = [IsAuthenticated]
    
    """_summary_
    This method is used to get the list of blocked users.
    
    json object:
    {
        "user": user.id
    }
    """
    def get(self, request):
        block_list = self.class_serializer.Meta.model.objects.get(user=request.user)
        return Response(block_list.data, status=status.HTTP_200_OK)
    
    """_summary_
    This method is used to block a user.
    """
    def put(self, request):
        rtype = request.data.get('type')
        
        if rtype == 'BLOCK':
            user_id = request.data.get('user_id')
            block_user_id = request.data.get('block_user_id')
            
            block_list = self.class_serializer.Meta.model.objects.get(user=user_id)
            block_list.blocked_users.add(block_user_id)
            block_list.count_of_blocked_users += 1
            block_list.save()
        
        if rtype == 'UNBLOCK':
            user_id = request.data.get('user_id')
            block_user_id = request.data.get('block_user_id')
            
            block_list = self.class_serializer.Meta.model.objects.get(user=user_id)
            block_list.blocked_users.remove(block_user_id)
            block_list.count_of_blocked_users -= 1
            block_list.save()
        
        return Response(status=status.HTTP_200_OK)
    
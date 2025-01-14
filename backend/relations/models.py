from django.db import models
from authentication.models import User

# Create your models here.

class FriendRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender', null=False)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver', null=False)
    status = models.CharField(max_length=50, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.sender} sent a friend request to {self.receiver}'

class FriendList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name='friends')
    count_of_friends = models.IntegerField(default=0)
    
    def __str__(self):
        return f'{self.user} has friends'

class BlockList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    blocked_users = models.ManyToManyField(User, related_name='blocked_users')
    count_of_blocked_users = models.IntegerField(default=0)
    
    def __str__(self):
        return f'{self.user} has blocked users'
    
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Conversation(models.Model):
    id = models.AutoField(primary_key=True)
    participants = models.ManyToManyField(User, related_name='participants')
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.id}'

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='convoImg/', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.id}'
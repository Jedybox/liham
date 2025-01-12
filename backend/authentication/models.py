from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class LihamUser(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='liham_user', unique=True, null=False)
    image = models.ImageField(upload_to='profile_pics', null=True, blank=True,)
    bio = models.TextField(max_length=500, blank=True)
    is_active = models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.username
    
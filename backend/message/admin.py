from django.contrib import admin
from .models import Conversation, TextMessage, ImageMessage, VideoMessage, AudioMessage

# Register your models here.

admin.site.register(Conversation)
admin.site.register(TextMessage)
admin.site.register(ImageMessage)
admin.site.register(VideoMessage)
admin.site.register(AudioMessage)

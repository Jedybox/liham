from django.urls import path
from .views import FriendRequestView, FriendListView, BlockListView

urlpatterns = [
    path('friend-request/', FriendRequestView.as_view()),
    path('friend-list/', FriendListView.as_view()),
    path('block-list/', BlockListView.as_view()),
]

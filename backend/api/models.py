# from django.db import models
from db_connection import db

# Create your models here.

users = db.get_collection("users")

conversation = db.get_collection("conversation")

messages = db.get_collection("messages")

friend_list = db.get_collection("friend_list")

friend_request = db.get_collection("friend_request")

block_list = db.get_collection("block_list")
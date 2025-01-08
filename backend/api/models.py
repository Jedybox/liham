# from django.db import models
from db_connection import db

# Create your models here.

users = db.get_collection("users")

conversation = db.get_collection("conversation")

messages = db.get_collection("messages")

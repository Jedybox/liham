import pymongo
import dotenv

url = "mongodb://localhost:27017/"

db = pymongo.MongoClient(url).get_database(dotenv.dotenv_values().get("DB_NAME"))
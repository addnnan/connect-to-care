from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["connect_to_care"]

if db is None:
    print("Failed to connect to the database.")
else:
    print("Successfully connected to the database.")

assessment_collection = db["assessments"]
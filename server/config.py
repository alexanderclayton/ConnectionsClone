from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = MONGODB_URI

mongo = PyMongo(app)
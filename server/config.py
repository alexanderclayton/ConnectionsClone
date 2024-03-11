from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
SECRET_KEY = os.getenv("SECRET_KEY")

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.config["MONGO_URI"] = MONGODB_URI
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)

app.secret_key = SECRET_KEY

mongo = PyMongo(app)
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.config["MONGO_URI"] = MONGODB_URI
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
app.config["DEBUG"] = False

app.secret_key = SECRET_KEY

mongo = PyMongo(app)
jwt = JWTManager(app)
from flask import jsonify, request, session
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from config import app, mongo
from models import Game, User
from datetime import datetime

@app.route("/", methods=["GET"])
def get_app():
    return jsonify({"message": "Hello World"})

@app.route("/game/<date>", methods=["GET"])
@jwt_required()
def get_game(date):
    game = mongo.db.games.find_one({'date': date})
    if (game):
        game['_id'] = str(game['_id'])
        return jsonify(game), 200
    else:
        return jsonify({"message": "No game found"}), 404
    
@app.route("/add_game", methods=["POST"])
def add_game():
    try:
        data = request.json
        game_fields = ['date', 'groupEasy', 'groupMedium', 'groupHard', 'groupExpert']
        if not all(key in data for key in game_fields):
            raise ValueError("Game is missing valid date and/or group(s)")
        group_fields = ['groupName', 'itemA', 'itemB', 'itemC', 'itemD']
        for group_name in ['groupEasy', 'groupMedium', 'groupHard', 'groupExpert']:
            if not all(key in data[group_name] for key in group_fields):
                raise ValueError(f"Not all game data provided for {group_name}")
        new_game = Game.from_json(data)
        mongo.db.games.insert_one(new_game.to_json())
        return jsonify({"message": f"Added game for {data['date']}"}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/add_user", methods=["POST"])
def add_user():
    try:
        data = request.json
        user_fields = ['username', 'email', 'password', 'record']
        if not all(key in data for key in user_fields):
            raise ValueError({"error": "User doesn't include all required fields"})
        password = data.get('password')
        hashed_password = generate_password_hash(password).decode('utf-8')
        data['password'] = hashed_password
        new_user = User.from_json(data)
        mongo.db.users.insert_one(new_user.to_json())
        return jsonify({"message": f"Added user {data['username']}"})
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

last_activity = {}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = mongo.db.users.find_one({ 'username': username})
    if (user):
        hashed_password = user.get('password')
        if (check_password_hash(hashed_password, password)):
            additional_claims = {"username": user['username'], "email": user['email'], "record": user['record']}
            access_token = create_access_token(identity=username, additional_claims=additional_claims)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"message": "Incorrect password"}), 401
    else:
        return jsonify({"message": "No user with that username found"}), 404
    

# Logout handled on client-side

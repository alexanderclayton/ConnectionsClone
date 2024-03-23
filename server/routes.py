from flask import jsonify, request
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from config import app, mongo
from models import Game, User

@app.route("/", methods=["GET"])
def hello_world():
    return jsonify({"message": "Hello World"})

@app.route("/game/<date>", methods=["GET"])
@jwt_required()
def get_game(date):
    username = get_jwt_identity()
    user_date = mongo.db.users.find_one({'username': username, 'record': {'$elemMatch': {'date': date}}})
    if (user_date):
        return jsonify({"message": "User has already played today's game"}), 202
    else:
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
        group_fields = ['groupName', 'itemA', 'itemB', 'itemC', 'itemD', 'difficulty']
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
        email = data.get('email')
        existing_email = mongo.db.users.find_one({'email': email})
        if (existing_email):
            return jsonify({"message": "This email has already been used"}), 409
        else:
            password = data.get('password')
            hashed_password = generate_password_hash(password).decode('utf-8')
            data['password'] = hashed_password
            new_user = User.from_json(data)
            mongo.db.users.insert_one(new_user.to_json())
            return jsonify({"message": f"Added user {data['username']}"}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/get_users", methods=["GET"])
def get_users():
    users_collection = mongo.db.users
    users_list = []
    for user in users_collection.find():
        user["_id"] = str(user["_id"])
        users_list.append(user)
    return jsonify({"users": users_list})

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
    

@app.route("/add_record", methods=["PUT"])
@jwt_required()
def add_record():
    try:
        data = request.json
        record_fields = ['date', 'score']
        if not all(key in data for key in record_fields):
                raise ValueError({"error": "Request must include both date and score"})
        date = data.get('date')
        score = data.get('score')
        username = get_jwt_identity()
        my_query = { "username": username}
        user = mongo.db.users.find_one(my_query)
        if (user) is None:
            return jsonify({ "error": "User not found"}), 404
        existing_record = next((r for r in user.get('record', []) if r.get('date') == date), None)
        if (existing_record):
            return jsonify({ "error": "User has already recorded score for today's date"}), 409
        new_record = {"date": date, "score": score}
        result = mongo.db.users.update_one(my_query, {"$push": {"record": new_record}})
        if result.modified_count:
            return jsonify({"message": "User record updated"}), 201
        else:
            return jsonify({"message": "Failed to update user record"}), 404
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


from flask import jsonify, request
from config import app, mongo
from models import Game

@app.route("/", methods=["GET"])
def get_app():
    return jsonify({"message": "Hello World"})

@app.route("/game/<date>", methods=["GET"])
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
        group_fields = ['itemA', 'itemB', 'itemC', 'itemD']
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
from config import app, mongo
from routes import *

if __name__ == "__main__":
    with app.app_context():
        try :
            mongo.cx.admin.command("ping")
            print("Connected to MongoDB")
        except Exception as e:
            print("Failed to connect to MongoDB", e)

    app.run(host="0.0.0.0", port=5002)
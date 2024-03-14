class Game:
    def __init__(self, date, group_easy, group_medium, group_hard, group_expert):
        self.date = date
        self.group_easy = group_easy
        self.group_medium = group_medium
        self.group_hard = group_hard
        self.group_expert = group_expert

    @staticmethod
    def from_json(json_data):
        return Game(
            date=json_data['date'],
            group_easy=Group.from_json(json_data['groupEasy']),
            group_medium=Group.from_json(json_data['groupMedium']),
            group_hard=Group.from_json(json_data['groupHard']),
            group_expert=Group.from_json(json_data['groupExpert'])

        )
    
    def to_json(self):
        return {
            'date': self.date,
            'groupEasy': self.group_easy.to_json(),
            'groupMedium': self.group_medium.to_json(),
            'groupHard': self.group_hard.to_json(),
            'groupExpert': self.group_expert.to_json()
        }
    
class Group:
    def __init__(self, group_name, item_a, item_b, item_c, item_d, difficulty):
        self.group_name = group_name
        self.item_a = item_a
        self.item_b = item_b
        self.item_c = item_c
        self.item_d = item_d
        self.difficulty = difficulty

    @staticmethod
    def from_json(json_data):
        return Group(
            group_name=json_data['groupName'],
            item_a=json_data['itemA'],
            item_b=json_data['itemB'],
            item_c=json_data['itemC'],
            item_d=json_data['itemD'],
            difficulty=json_data['difficulty']

        )
    
    def to_json(self):
        return {
            'groupName': self.group_name,
            'itemA': self.item_a,
            'itemB': self.item_b,
            'itemC': self.item_c,
            'itemD': self.item_d,
            'difficulty': self.difficulty
        }
    
class User:
    def __init__(self, username, email, password, record):
        self.username = username
        self.email = email
        self.password = password
        self.record = record

    @staticmethod
    def from_json(json_data):
        return User(
            username=json_data['username'],
            email=json_data['email'],
            password=json_data['password'],
            record=[Score.from_json(score_data) for score_data in json_data['record']]
        )
    
    def to_json(self):
        return {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'record': [score.to_json() for score in self.record]
        }
    
class Score:
    def __init__(self, date, score):
        self.date = date
        self.score = score

    @staticmethod
    def from_json(json_data):
        return Score(
            date=json_data['date'],
            score=json_data['score']
        )
    
    def to_json(self):
        return {
            'date': self.date,
            'score': self.score
        }
    
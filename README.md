type TGame = {
date: string
groupEasy: TGameCollection
groupMedium: TGameCollection
groupHard: TGameCollection
groupExpert: TGameCollection
}

type TGameCollection = {
itemA: string
itemB: string
itemC: string
itemD: string
}

{
"date": "string",
"groupEasy": {
"itemA": "string"
"itemB": "string"
"itemC": "string"
"itemD": "string"
},
"groupMedium": {
"itemA": "string"
"itemB": "string"
"itemC": "string"
"itemD": "string"
},
"groupHard": {
"itemA": "string"
"itemB": "string"
"itemC": "string"
"itemD": "string"
},
"groupExpert": {
"itemA": "string"
"itemB": "string"
"itemC": "string"
"itemD": "string"
}
}

type TUser = {
username: string
email: string
record: TScore[]

}

type TScore = {
date: string
score: number
}

{
"username": "string"
"email": "string"
"record": [{score}, {score}, {score}]
}

{
"username": "test",
"password": "test"
}

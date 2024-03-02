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

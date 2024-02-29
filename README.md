type TGame = {
    id: string 
    collectionA: TGameCollection
    collectionB: TGameCollection
    collectionC: TGameCollection
    collectionD: TGameCollection
}

type TGameCollection = {
    itemA: string
    itemB: string
    itemC: string
    itemD: string
}

{
    "id": "string",
    "collectionA": {
        "itemA": "string"
        "itemB": "string"
        "itemC": "string"
        "itemD": "string"
    },
    "collectionB": {
        "itemA": "string"
        "itemB": "string"
        "itemC": "string"
        "itemD": "string"
    },
    "collectionC": {
        "itemA": "string"
        "itemB": "string"
        "itemC": "string"
        "itemD": "string"
    },
    "collectionD": {
        "itemA": "string"
        "itemB": "string"
        "itemC": "string"
        "itemD": "string"
    }
}
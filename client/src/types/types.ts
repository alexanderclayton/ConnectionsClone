export type TGame = {
    _id: string;
    date: string;
    groupEasy: TGroup;
    groupMedium: TGroup;
    groupHard: TGroup;
    groupExpert: TGroup;
};
  
export type TGroup = {
    groupName: string;
    itemA: string;
    itemB: string;
    itemC: string;
    itemD: string;
    difficulty: string;
};
  
export type TConnection = {
    groupName: string;
    connection: string;
    difficulty: string;
};
  
export type TUser = {
    username: string;
    email: string;
    password: string;
    record: TScore[];
};
  
export type TScore = {
    date: string;
    score: number;
};
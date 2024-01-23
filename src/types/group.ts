export type GroupType = {
    _id?: string;
    name: string;   
    tasks?: boolean;   
}

export type TaskType = {
    _id?: string;
    name: string;   
    new?: boolean;   
}
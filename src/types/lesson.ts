export type Lesson = {
    name: string
}

export type Video = {
    _id?: string;
    title: string;    
    url: string;  
    progress?: number;  
    duration?: number;  
    done?: boolean; 
}

export type TaskModel = {
    _id?: string;
    name: string;  
    description: string;    
    answerType: string; 
    file?: string;
    code?: string;  
    status?: boolean;   
}

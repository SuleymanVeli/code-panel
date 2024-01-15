import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { nanoid } from "nanoid";

export class Lesson {

  _id?: string;
 
  @prop()
  name: string;

  @prop()
  description: string;

  @prop({type: () => [Video] })
  videos: Video[];

  @prop({type: () => [File] })
  files : File[];

  @prop({type: () => [Info] })
  infos : Info[];

  @prop({type: () => [Task] })
  tasks : Task[];

  @prop({ default: () => new Date() })
  createdAt?: Date;

  @prop({ default: () => 0 })
  number?: number;
}

export class Video {

  _id?: string;

  @prop()
  title: string;
  
  @prop()
  url: string;

  @prop({type: () => [VideoProgress] })
  progresses : VideoProgress[];
}


export class VideoProgress {
  
  @prop()
  userId: string;

  @prop({ default: () => 0})
  progress?: number;

  @prop({ default: () => false})
  done?: boolean; 
}


export class File {
  @prop()
  title: string;

  @prop()
  type: string;
  
  @prop()
  url: string;
}

export class Info {
  @prop()
  title: string;

  @prop()
  description: string;    
}

export class Task {
  _id?: string;

  @prop()
  name: string;

  @prop()
  description: string;
  
  @prop()
  answerType: string; 

  @prop({type: () => [Answer] })
  answers: Answer[]
}

export class Answer {
  _id?: string;
  
  @prop()
  userId: string;

  @prop()
  file?: string;

  @prop()
  code?: string;

  @prop({ default: () => false})
  status?: boolean; 
}
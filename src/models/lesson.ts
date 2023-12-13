import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { nanoid } from "nanoid";

export class Lesson {

  _id?: string;
 
  @prop()
  name: string;

  @prop()
  text: string;

  @prop()
  text1: string;

  @prop({type: () => [Video] })
  list: Video[];

  @prop({ default: () => new Date() })
  createdAt?: Date;
}

export class Video {

  @prop()
  name: string;
  
  @prop()
  video: string;
}
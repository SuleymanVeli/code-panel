import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Lesson {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  name: string;

  @prop({ default: () => new Date() })
  createdAt: Date;
}
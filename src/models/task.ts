import { CodeType } from "@/types/task";
import { ModelOptions, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@ModelOptions({ schemaOptions: { collection: 'tasks' } })
export class Task {
  _id?: string;

  @prop()
  number: number;

  @prop()
  name: string;

  @prop({ type: () => [TaskItem] })
  items: TaskItem[];
}

export class TaskItem {
  _id?: string;

  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  answerType: string;

  @prop({ type: () => [Answer] })
  answers: Answer[];

  answer?: Answer;
}

export class Answer {
  _id?: string;

  @prop()
  userId?: string;

  @prop()
  code?: Schema.Types.Mixed | CodeType;

  @prop({ default: () => false })
  status?: string;

  @prop()
  comment?: string;
}

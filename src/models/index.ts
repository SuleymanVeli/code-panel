// models/index.ts
import { Lesson } from "@/models/lesson";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "@/models/user";
import { Task } from "@/models/task";

export const LessonModel = getModelForClass(Lesson);
export const UserModel = getModelForClass(User);
export const TaskModel = getModelForClass(Task);


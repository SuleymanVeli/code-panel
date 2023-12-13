// models/index.ts
import { Lesson } from "@/models/lesson";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "@/models/user";

export const LessonModel = getModelForClass(Lesson);
export const UserModel = getModelForClass(User);


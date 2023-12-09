// models/index.ts
import { Lesson } from "@/models/lesson";
import { getModelForClass } from "@typegoose/typegoose";

export const LessonModel = getModelForClass(Lesson);


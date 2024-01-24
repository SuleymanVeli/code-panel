import { ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: 'users' } })
export class User {

  _id?: string;
 
  @prop({ default: () => "" })
  name?: string;

  @prop({ default: () => "" })
  image?: string;

  @prop({ default: () => "active" })
  status?: string;

  @prop({required: true})
  email: string;

  @prop({default: () => false})
  signed?: boolean;

  @prop({default: () => "user" })
  roole: string;

  @prop({ default: () => new Date() })
  createdAt?: Date;
}
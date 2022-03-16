import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;
  @Prop({required: true})
  name: string;
  @Prop({required:true})
  email: string;
  @Prop({required:true})
  password: string;
  @Prop({default: Date.now() })
  createdDate: Date
  @Prop({default: Date.now() })
  updatedDate: Date
};
export const UserSchema = SchemaFactory.createForClass(User);

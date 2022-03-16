import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  _id: string;
  @Prop({required: true})
  userId: string;
  @Prop({required:true})
  productId: string;
  @Prop({required:true})
  quantity: number;
  @Prop({required:true})
  total: number;
  @Prop({default: Date.now() })
  createdDate: Date
  @Prop({default: Date.now() })
  updatedDate: Date
};
export const OrderSchema = SchemaFactory.createForClass(Order);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  _id: string;
  @Prop({required: true})
  name: string;
  @Prop({required:true, lowercase:true})
  price: number;
  @Prop({default: Date.now() })
  createdDate: Date
  @Prop({default: Date.now() })
  updatedDate: Date
};
export const ProductSchema = SchemaFactory.createForClass(Product);

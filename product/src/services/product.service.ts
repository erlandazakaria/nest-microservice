import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/models/product.model';
import { Model } from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async getProduct(_id: string) {
    const data = await this.productModel.findById(_id).select(["_id", "name", "price"]).exec();
    return data.toJSON()
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { product } from 'src/enums/product.enum';
import { user } from 'src/enums/user.enum';
import { Order, OrderDocument } from 'src/models/order.model';
import { CreateOrderReq } from "../enums/order.enum";
import { Model } from "mongoose";

@Injectable()
export class OrderService {
  constructor(
    @Inject('NEST_PRODUCT_SERVICE') private readonly productClient: ClientKafka,
    @Inject('NEST_USER_SERVICE') private readonly userClient: ClientKafka,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}
  
  async generateOrder(req: CreateOrderReq) {
    try {
      let product = await this.getProduct(req.productId);
      let user = await this.getUser(req.userId);
      if(!product._id || !user._id) return null;
      const order = new this.orderModel({
        productId: req.productId,
        userId: req.userId,
        quantity: req.quantity,
        total: product.price*req.quantity,
        createdDate: Date.now(),
        updatedDate: Date.now()
      });
      await order.save()
      return {
        _id: order._id,
        product,
        user,
        price: product.price,
        quantity: req.quantity,
        total: order.total,
        createdDate: order.createdDate,
        updatedDate: order.updatedDate
      }
    } catch(err) {
      return null;
    }
  }

  getProduct(_id: string): Promise<product | null> {
    return new Promise(res => {
      this.productClient.send('nest-get-product', _id)
      .subscribe((product: product) => {
        res(product)
      });
    })
  }
  

  getUser(_id: string): Promise<user | null> {
    return new Promise(res => {
      this.userClient.send('nest-get-user', _id)
      .subscribe((user: user) => {
        res(user)
      });
    })
  }
}

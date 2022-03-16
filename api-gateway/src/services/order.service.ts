import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderReq, order } from '../enums/order.enum';
import BaseService from './base.service';

@Injectable()
export class OrderService extends BaseService {
  constructor( 
    @Inject('NEST_BILLING_SERVICE') private readonly billingClient: ClientKafka
  ) { super() }

  async createOrder(req: CreateOrderReq) {
    try {
      let result = await this.createOrderReq(req);
      return result && result._id ? this.response.successWithData(result) : this.response.badRequest();
    } catch(err) {
      return this.response.badRequest()
    }
  }

  createOrderReq(req: CreateOrderReq): Promise<order | null> {
    return new Promise(res => {
      this.billingClient.send('nest-create-order', req)
      .subscribe((order: order) => {
        res(order)
      });
    })
  }
}

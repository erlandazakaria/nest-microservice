import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderReq } from 'src/enums/order.enum';
import { OrderService } from '../services/order.service';

@Controller()
export class OrderController implements OnModuleInit {
  constructor(
    private readonly orderService: OrderService,
    @Inject('NEST_PRODUCT_SERVICE') private readonly productClient: ClientKafka,
    @Inject('NEST_USER_SERVICE') private readonly userClient: ClientKafka
  ) {}

  @MessagePattern('nest-create-order')
  createOrder({value}: {value: CreateOrderReq}) {
    if(!value) return null
    return this.orderService.generateOrder(value);
  }

  onModuleInit() {
    this.productClient.subscribeToResponseOf('nest-get-product');
    this.userClient.subscribeToResponseOf('nest-get-user');    
  }
}

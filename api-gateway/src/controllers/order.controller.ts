import { Body, Controller, Inject, OnModuleInit, Post, Res } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderReq } from '../enums/order.enum';
import { OrderService } from '../services/order.service';

@Controller()
export class OrderController implements OnModuleInit {
  constructor(
    private readonly orderService: OrderService,
    @Inject('NEST_BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}

  @Post('create-order')
  async createOrder(@Res() res, @Body() req: CreateOrderReq) {
    const result = await this.orderService.createOrder(req);
    return res.status(result.code).json(result);
  }

  onModuleInit() {
    this.billingClient.subscribeToResponseOf('nest-create-order');
  }
}

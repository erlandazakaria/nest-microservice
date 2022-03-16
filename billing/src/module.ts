import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Order, OrderSchema } from './models/order.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema}]),
    ClientsModule.register([
      {
        name: "NEST_USER_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest-user',
            brokers: process.env.brokers.split(',')
          },
          consumer: {
            groupId: 'nest-user-consumer'
          }
        },
      },
      {
        name: "NEST_PRODUCT_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest-product',
            brokers: process.env.brokers.split(',')
          },
          consumer: {
            groupId: 'nest-product-consumer'
          }
        },
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}

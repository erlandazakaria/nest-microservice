import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "NEST_BILLING_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest-billing',
            brokers: process.env.brokers.split(',')
          },
          consumer: {
            groupId: 'nest-billing-consumer'
          }
        },
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}

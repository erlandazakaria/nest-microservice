import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: "nest-billing",
          brokers: process.env.brokers.split(',')
        },
        consumer: {
          groupId: 'nest-billing-consumer'
        }
      }
    }
  );
  app.listen();
}
bootstrap();

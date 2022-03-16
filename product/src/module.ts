import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './controllers/product.controller';
import { Product, ProductSchema } from './models/product.model';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}

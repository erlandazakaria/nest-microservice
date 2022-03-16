import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from '../services/product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('nest-get-product')
  getProduct({value}: {value: string}) {
    return this.productService.getProduct(value);
  }
}

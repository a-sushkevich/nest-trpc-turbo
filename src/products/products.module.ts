import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsRouter } from './products.router';

@Module({
  providers: [ProductService, ProductsRouter],
})
export class ProductsModule {}

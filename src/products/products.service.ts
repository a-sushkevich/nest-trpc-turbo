import { Injectable } from '@nestjs/common';
import { Product } from './products.schema';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  createProduct(productData: Product) {
    this.products.push(productData);
    return productData;
  }
}

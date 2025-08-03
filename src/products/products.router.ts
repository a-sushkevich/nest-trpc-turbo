import { Input, Mutation, Router } from 'nestjs-trpc';
import { ProductService } from './products.service';
import { Product, productsSchema } from './products.schema';

@Router({ alias: 'products' })
export class ProductsRouter {
  constructor(private readonly productsService: ProductService) {}

  @Mutation({
    input: productsSchema,
    output: productsSchema,
  })
  createProduct(@Input() productsData: Product) {
    return this.productsService.createProduct(productsData);
  }
}

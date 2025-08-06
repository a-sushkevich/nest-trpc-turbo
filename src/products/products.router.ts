import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { ProductService } from './products.service';
import { Product, productsSchema } from './products.schema';
import z from 'zod';

@Router({ alias: 'products' })
export class ProductsRouter {
  constructor(private readonly productsService: ProductService) {}

  @Query({ input: z.object({ id: z.string() }), output: productsSchema })
  getProductById(@Input('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Query({ output: z.array(productsSchema) })
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: productsSchema.partial(),
    }),
    output: productsSchema,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('data') data: Partial<Product>,
  ) {
    return this.productsService.updateProduct(id, data);
  }

  @Mutation({
    input: productsSchema,
    output: productsSchema,
  })
  createProduct(@Input() productsData: Product) {
    return this.productsService.createProduct(productsData);
  }

  @Mutation({
    input: z.object({ id: z.string() }),
    output: z.boolean(),
  })
  deleteProduct(@Input('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}

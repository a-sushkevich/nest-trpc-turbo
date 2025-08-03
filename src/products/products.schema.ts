import z from 'zod';

export const productsSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  details: z.object({
    description: z.string().optional(),
    rating: z.number().optional(),
  }),
});

export type Product = z.infer<typeof productsSchema>;

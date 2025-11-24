import { z } from "zod";

export const productFiltersSchema = z.object({
  name: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});

export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;

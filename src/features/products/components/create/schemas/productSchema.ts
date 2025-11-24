import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  price: z.number().min(0, "O preço deve ser positivo"),
  quantity: z.number().min(0, "A quantidade deve ser positiva"),
  description: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

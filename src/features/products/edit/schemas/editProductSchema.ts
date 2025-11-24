import { z } from "zod";

export const editProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  price: z.number().min(0, "Preço inválido."),
  quantity: z.number().int().min(0, "Quantidade inválida."),
  description: z.string().optional(),
});

export type EditProductData = z.infer<typeof editProductSchema>;

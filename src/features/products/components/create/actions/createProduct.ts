"use client";

import { createProductSchema } from "../schemas/productSchema";
import { productApi } from "@/app/api/api";

export async function createProductAction(input: unknown) {
  const data = createProductSchema.parse(input);

  try {
    const response = await productApi.create(data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar produto:", error?.response?.data);
    throw new Error(error?.response?.data?.message || "Erro ao criar produto");
  }
}

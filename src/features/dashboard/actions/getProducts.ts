import { api } from "@/app/api/api"; 
import { ProductFiltersInput } from "../schemas/productFiltersSchema";

interface GetProductsParams extends ProductFiltersInput {
  page: number;
  size: number;
}

export async function getProducts(params: GetProductsParams) {
  const { page, size, name, minPrice, maxPrice } = params;

  const response = await api.get("/products", {
    params: {
      page,
      size,
      name,
      min: minPrice ? Number(minPrice) : undefined,
      max: maxPrice ? Number(maxPrice) : undefined
    }
  });

  return response.data;
}

import { useMutation } from "@tanstack/react-query";
import { createProductAction } from "../actions/createProduct";
import { CreateProductInput } from "../schemas/productSchema";

export default function useCreateProduct() {
  return useMutation({
    mutationFn: (data: CreateProductInput) => createProductAction(data),
  });
}

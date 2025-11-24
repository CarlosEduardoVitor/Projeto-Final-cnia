
"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteProductAction } from "@/features/products/components/description/actions/deleteProduct";

export default function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: number | string) => deleteProductAction(id),
  });
}

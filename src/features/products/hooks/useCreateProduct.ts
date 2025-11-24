"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, ProductPayload } from "@/app/api/api";

export default function useCreateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductPayload) => {
      const res = await productApi.create(data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      console.log("Erro ao criar produto")
    },
  });
}

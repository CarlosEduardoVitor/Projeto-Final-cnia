"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, ProductPayload } from "@/app/api/api";
import { toast } from "sonner";

export default function useCreateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductPayload) => {
      const res = await productApi.create(data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Produto criado!");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Erro ao criar produto");
    },
  });
}

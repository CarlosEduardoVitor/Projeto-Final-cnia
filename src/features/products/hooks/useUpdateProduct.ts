"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, ProductPayload } from "@/app/api/api";
import { toast } from "sonner";

export function useUpdateProduct(id: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductPayload) => {
      const res = await productApi.update(id, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Produto atualizado!");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar");
    },
  });
}

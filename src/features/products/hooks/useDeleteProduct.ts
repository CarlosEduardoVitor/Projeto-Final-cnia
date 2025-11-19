"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/app/api/api";
import { toast } from "sonner";

export default function useDeleteProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await productApi.delete(id);
    },
    onSuccess: () => {
      toast.success("Produto deletado!");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Erro ao deletar produto");
    },
  });
}

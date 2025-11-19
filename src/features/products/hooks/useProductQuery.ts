"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/app/api/api";

export function useProductQuery(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await productApi.get(id);
      return data;
    },
    enabled: !!id,
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi, ProductListParams } from "@/app/api/api";

export function useProductsQuery(params: ProductListParams) {
  const hasFilters =
    params.name || params.min !== undefined || params.max !== undefined;

  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      let data;
      if (hasFilters) {
        data = (await productApi.search(params)).data;
      } else {
        data = (await productApi.list(params)).data;
      }
      return data;
    },
  });
}

import { useState, useCallback } from "react";
import { ProductFiltersInput } from "../schemas/productFiltersSchema";

export function useDashboardFilters() {
  const [inputs, setInputs] = useState<ProductFiltersInput>({
    name: "",
    minPrice: "",
    maxPrice: "",
  });

  const [filters, setFilters] = useState(inputs);

  const applyFilters = () => {
    setFilters(inputs);
  };

  const resetFilters = useCallback(() => {
    const empty = { name: "", minPrice: "", maxPrice: "" };
    setInputs(empty);
    setFilters(empty);
  }, []);

  return {
    inputs,
    setInputs,
    filters,
    applyFilters,
    resetFilters,
  };
}

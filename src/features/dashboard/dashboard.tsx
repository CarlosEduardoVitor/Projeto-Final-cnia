"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useProductsQuery } from "@/features/products/hooks/useProductsQuery";
import CarouselModel from "@/features/carousel/CarouselModel";
import ModalCreateProduct from "@/features/products/components/create/components/Modal/Modal";

interface DashboardClientProps {
  session: {
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const t = useTranslations("Dashboard");
  
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);

  const [inputs, setInputs] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
  });
  
  const [filters, setFilters] = useState(inputs);

  const queryParams = {
    page,
    size: itemsPerPage,
    name: filters.name || undefined,
    min: filters.minPrice !== "" ? Number(filters.minPrice) : undefined,
    max: filters.maxPrice !== "" ? Number(filters.maxPrice) : undefined,
  };

  const { data, isLoading, refetch } = useProductsQuery(queryParams);
  const products = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const resetFilters = useCallback(() => {
    const empty = { name: "", minPrice: "", maxPrice: "" };
    setFilters(empty);
    setInputs(empty);
    setPage(0);
  }, []);

  const handleApplyFilters = () => {
    setFilters(inputs); 
    setPage(0); 
  };

  console.log("Sessão recebida no DashboardClient:", session)

  return (
    <main className="bg-gray-100 dark:bg-gray-900 w-full min-h-[calc(100vh-56px)] py-8 px-10 text-gray-900 dark:text-gray-100">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-500">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('greeting', { name: session.user.name })}
          </p>
        </div>
        <ModalCreateProduct onCreate={() => refetch()} /> 
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder={t('filter_name_placeholder')}
            className="rounded-lg p-3 flex-1 min-w-[150px] border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
          <input
            type="number"
            placeholder={t('filter_min_price_placeholder')}
            className="rounded-lg p-3 w-32 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={inputs.minPrice}
            onChange={(e) => setInputs({ ...inputs, minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder={t('filter_max_price_placeholder')}
            className="rounded-lg p-3 w-32 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={inputs.maxPrice}
            onChange={(e) => setInputs({ ...inputs, maxPrice: e.target.value })}
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg transition-colors font-semibold"
            onClick={handleApplyFilters}
          >
            {t('search_button')}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-lg transition-colors font-semibold"
            onClick={resetFilters}
          >
            {t('clear_button')}
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-xl mt-5 text-center">{t('loading')}</p>
      ) : (
        <CarouselModel
          products={products}
          page={page}
          totalPages={totalPages}
          nextPage={() => page + 1 < totalPages && setPage(page + 1)}
          prevPage={() => page > 0 && setPage(page - 1)}
          onRemove={() => refetch()} 
        />
      )}
    </main>
  );
}

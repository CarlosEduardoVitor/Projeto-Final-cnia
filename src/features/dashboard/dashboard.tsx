"use client";

import { useTranslations } from "next-intl";
import { useProductsQuery } from "@/features/products/hooks/useProductsQuery";

import CarouselModel from "@/features/dashboard/components/carousel/CarouselModel";
import ModalCreateProduct from "@/features/products/components/create/components/ModalCreateProduct";

import { useState, useCallback } from "react";

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

  // PAGINAÇÃO

  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(0);

  const nextPage = () => page + 1 < totalPages && setPage(page + 1);
  const prevPage = () => page > 0 && setPage(page - 1);

  // FILTROS

  const [inputs, setInputs] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
  });

  const [filters, setFilters] = useState(inputs);

  const applyFilters = () => {
    setFilters(inputs);
    setPage(0);
  };

  const resetFilters = useCallback(() => {
    const empty = { name: "", minPrice: "", maxPrice: "" };
    setInputs(empty);
    setFilters(empty);
    setPage(0);
  }, []);

  // QUERY PARAMS

  const queryParams = {
    page,
    size: ITEMS_PER_PAGE,
    name: filters.name || undefined,
    min: filters.minPrice ? Number(filters.minPrice) : undefined,
    max: filters.maxPrice ? Number(filters.maxPrice) : undefined,
  };


  // API

  const { data, isLoading, refetch } = useProductsQuery(queryParams);

  const products = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main className="bg-gray-100 dark:bg-gray-900 w-full min-h-[calc(100vh-56px)] py-8 px-10 text-gray-900 dark:text-gray-100">

      {/* TÍTULO */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-500">
            {t("title")}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("greeting", { name: session.user.name })}
          </p>
        </div>

        <ModalCreateProduct onCreate={() => refetch()} />
      </header>

      {/* FILTROS */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">

          <input
            type="text"
            placeholder={t("filter_name_placeholder")}
            className="rounded-lg p-3 flex-1 min-w-[150px] border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />

          <input
            type="number"
            placeholder={t("filter_min_price_placeholder")}
            className="rounded-lg p-3 w-32 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={inputs.minPrice}
            onChange={(e) => setInputs({ ...inputs, minPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder={t("filter_max_price_placeholder")}
            className="rounded-lg p-3 w-32 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            value={inputs.maxPrice}
            onChange={(e) =>
              setInputs({ ...inputs, maxPrice: e.target.value })
            }
          />

          <button
            onClick={applyFilters}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg transition-colors font-semibold"
          >
            {t("search_button")}
          </button>

          <button
            onClick={resetFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-lg transition-colors font-semibold"
          >
            {t("clear_button")}
          </button>

        </div>
      </section>

      {/* CAROUSEL */}
      {isLoading ? (
        <p className="text-xl mt-5 text-center">{t("loading")}</p>
      ) : (
        <CarouselModel
          products={products}
          page={page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          onRemove={() => refetch()}
        />
      )}

    </main>
  );
}

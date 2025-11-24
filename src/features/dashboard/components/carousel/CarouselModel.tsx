"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import ModalProduct from "@/features/products/components/description/ModalProducts";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl"; 
import { Button } from "@/components/ui/button";

interface Props {
  products: Product[];
  onRemove: (id: number) => void;
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export default function CarouselModel({ products, onRemove, page, totalPages, nextPage, prevPage }: Props) {
  const t = useTranslations("Dashboard"); 
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (api) {
      api.reInit({ align: "start", containScroll: "trimSnaps", dragFree: false });
    }
  }, [api, products]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 relative">

      <Carousel setApi={setApi} opts={{ align: "start", containScroll: "trimSnaps", dragFree: false }}>
        <CarouselContent className="-ml-4">
          {products.map((p) => (
            <CarouselItem key={p.id} className="basis-1/4 md:basis-1/5 pl-4">
              <ModalProduct 
                product={p} 
                onRemove={onRemove}  
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-6 mt-6">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
          onClick={prevPage}
          disabled={page === 0}
        >
          {t('pagination_prev')}
        </Button>

        <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
          {t('pagination_page_of', { page: page + 1, total: totalPages })}
        </span>

        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
          onClick={nextPage}
          disabled={page + 1 >= totalPages}
        >
          {t('pagination_next')}
        </Button>
      </div>
    </div>
  );
}

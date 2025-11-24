"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productApi } from "@/app/api/api";
import EditProductPage from "./editProductPage";
import { Product } from "@/types/products";
import useEditProduct from "@/features/products/edit/hooks/useEditProduct";

export default function EditProductClient() {
  const params = useParams();

  const idParam = params?.id;
  const id = Number(Array.isArray(idParam) ? idParam[0] : idParam);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { saveProduct, saving } = useEditProduct(id);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await productApi.get(id);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div className="p-8 text-xl">Carregando...</div>;
  if (!product) return <div className="p-8 text-xl">Produto não encontrado.</div>;

  return (
    <EditProductPage
      product={product}
      onSave={(data) => saveProduct(data)}
      saving={saving}
    />
  );
}

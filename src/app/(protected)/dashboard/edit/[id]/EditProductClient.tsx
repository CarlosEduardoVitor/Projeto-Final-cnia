"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productApi } from "@/app/api/api";
import EditProductPage from "./editProductPage";
import { Product } from "@/types/products";
import { toast } from "sonner";

export default function EditProductClient() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const params = useParams();
  const router = useRouter();

  const idParam = params?.id;
  const numericId = Number(Array.isArray(idParam) ? idParam[0] : idParam);

  useEffect(() => {
    async function loadProduct() {
      if (!numericId || isNaN(numericId)) {
        setError("ID do produto inválido.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await productApi.get(numericId);
        setProduct(data);
      } catch (err) {
        setError("Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [numericId]);

  const handleSave = async (updatedProduct: Partial<Product>) => {
    try {
      setSaving(true);
      await productApi.update(numericId, updatedProduct);
      toast.success("Produto atualizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-xl">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-xl text-red-600">{error}</div>;
  if (!product) return <div className="p-8 text-center text-xl">Produto não encontrado</div>;

  return <EditProductPage product={product} onSave={handleSave} saving={saving} />;
}
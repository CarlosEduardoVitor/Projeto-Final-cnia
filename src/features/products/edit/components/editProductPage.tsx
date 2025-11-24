"use client";

import { useState } from "react";
import { Product } from "@/types/products";
import { EditProductData } from "@/features/products/edit/schemas/editProductSchema";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface Props {
  product: Product;
  onSave: (data: EditProductData) => Promise<void>;
  saving: boolean;
}

export default function EditProductPage({ product, onSave, saving }: Props) {
  const t = useTranslations("Dashboard");

  const [formData, setFormData] = useState<EditProductData>({
    name: product.name,
    price: product.price,
    quantity: product.quantity, 
    description: product.description,
  });

  const handleChange = (field: keyof EditProductData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(formData);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 dark:bg-gray-900 p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg text-gray-900 dark:text-gray-100"
      >
        <h2 className="text-3xl font-bold mb-4">{t("edit_page_title")}</h2>

        <label className="flex flex-col">
          Nome
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col">
          Preço
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            required
          />
        </label>

        <label className="flex flex-col">
          Quantidade
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            required
          />
        </label>

        <label className="flex flex-col">
          Descrição
          <textarea
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </label>

        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </div>
  );
}

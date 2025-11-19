"use client";

import { useState } from "react";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl"; 
import { toast } from "sonner"; 
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
  onSave: (updatedProduct: Partial<Product>) => Promise<void>; 
  saving: boolean;
}

export default function EditProductPage({ product, onSave, saving }: Props) {
  const t = useTranslations("Dashboard"); 
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product.name,
    price: product.price,
    description: product.description,
  });

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      toast.error(t('product_edit_error')); 
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-100 dark:bg-gray-900 p-8 flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg text-gray-900 dark:text-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-green-700 dark:text-green-500">{t('edit_page_title')}</h2>
        
        <label className="flex flex-col">
          <span className="mb-1 font-medium">{t('edit_name_label')}</span>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 w-full bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">{t('edit_price_label')}</span>
          <input
            type="number"
            value={formData.price || 0}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 w-full bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">{t('edit_description_label')}</span>
          <textarea
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 w-full h-32 resize-none bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <Button
          type="submit"
          disabled={saving}
          className={`py-3 px-6 rounded-lg text-white font-semibold transition-colors mt-4 
            ${saving ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {saving ? t('edit_save_pending') : t('edit_save_button')}
        </Button>
      </form>
    </div>
  );
}
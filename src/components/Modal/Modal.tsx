"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCreateProduct from "@/features/products/hooks/useCreateProduct";
import { useState } from "react";
import { useTranslations } from "next-intl"; 
import { toast } from "sonner"; 

export default function ModalCreateProduct({ onCreate }: { onCreate: () => void }) {
  const t = useTranslations("Dashboard");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const createPromise = createProduct({
      name,
      price: Number(price),
      quantity: Number(quantity),
      description,
    });
    
    await toast.promise(createPromise, {
      loading: t('product_create_pending'),
      success: () => {
        setName("");
        setPrice("");
        setQuantity("");
        setDescription("");
        onCreate();
        setOpen(false); 
        return t('product_create_success'); 
      },
      error: (err) => {
        return err.response?.data?.message || t('product_create_error');
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors">
          {t('create_product_button')}
        </Button>
      </DialogTrigger>

      <DialogContent forceMount onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('modal_title_create')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t('modal_name_placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="number"
            placeholder={t('modal_price_placeholder')}
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="number"
            placeholder={t('modal_quantity_placeholder')}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
            className="p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <textarea
            placeholder={t('modal_description_placeholder')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 h-24 resize-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
          >
            {isPending ? t('modal_create_pending') : t('modal_create_button')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/products";
import useDeleteProduct from "@/features/products/hooks/useDeleteProduct";
import { useState } from "react";
import { useTranslations } from "next-intl"; 
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  product: Product;
  onRemove: (id: number) => void;
}

export default function ModalProduct({ product, onRemove }: Props) {
  const t = useTranslations("Dashboard");
  const { mutateAsync: deleteProduct, isLoading: isDeleting } = useDeleteProduct();
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    const deletePromise = deleteProduct(product.id);

    await toast.promise(deletePromise, {
      loading: t('product_delete_pending') || "Deletando produto...",
      success: () => {
        onRemove(product.id);
        setOpen(false);
        return t('product_delete_success') || "Produto deletado com sucesso!";
      },
      error: (err) => {
        return err.response?.data?.message || t('product_delete_error') || "Erro ao deletar produto";
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-gray-900 dark:bg-gray-700 dark:text-white h-[200px] w-full truncate border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-lg">
          {product.name}
        </Button>
      </DialogTrigger>

      <DialogContent forceMount onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">{product.name}</DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-400">
            **{t('modal_quantity_label')}:** {product.quantity}
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                disabled={isDeleting}
                className="transition-colors"
              >
                {t('modal_product_delete_button')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('alert_delete_title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('alert_delete_description', { name: product.name })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('alert_delete_cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                  {isDeleting ? t('alert_delete_pending') : t('alert_delete_confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Link href={`/dashboard/edit/${product.id}`} passHref>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors">
              {t('modal_product_edit_button')}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
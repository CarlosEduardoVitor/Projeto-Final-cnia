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

  const safeT = (key: string, fallback = "") => {
    try {
      const str = t(key);
      return typeof str === "string" && str.length ? str : fallback;
    } catch {
      return fallback;
    }
  };

  const { mutateAsync: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    const promise = deleteProduct(product.id);

    await toast.promise(promise, {
      loading: safeT("product_delete_pending", "Deletando produto..."),
      success: () => {
        onRemove(product.id);
        setOpen(false);
        return safeT("product_delete_success", "Produto deletado com sucesso!");
      },
      error: (err: any) => {
        return err?.message || safeT("product_delete_error", "Erro ao deletar produto");
      },
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
            {safeT("modal_product_quantity_label", "Quantidade")}: {product.quantity}
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
                {safeT("modal_product_delete_button", "Excluir")}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{safeT("modal_product_delete_confirm_title", "Confirma excluir?")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {safeT("modal_product_delete_confirm_description", `Tem certeza que deseja excluir "${product.name}"?`)}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>{safeT("modal_product_cancel_button", "Cancelar")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                  {isDeleting ? safeT("alert_delete_pending", "Deletando...") : safeT("modal_product_delete_button", "Excluir")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Link href={`/dashboard/edit/${product.id}`} passHref>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors">
              {safeT("modal_product_edit_button", "Editar")}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

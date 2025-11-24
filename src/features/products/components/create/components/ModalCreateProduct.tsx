"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useCreateProductForm } from "../hooks/useCreateProductForm";

export default function ModalCreateProduct({ onCreate }: { onCreate: () => void }) {
  const t = useTranslations("Dashboard");
  const form = useCreateProductForm(onCreate, t);

  return (
    <Dialog open={form.open} onOpenChange={form.setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          {t("create_product_button")}
        </Button>
      </DialogTrigger>

      <DialogContent forceMount className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("modal_title_create")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t("modal_name_placeholder")}
            value={form.name}
            onChange={(e) => form.setName(e.target.value)}
            className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <input
            type="number"
            placeholder={t("modal_price_placeholder")}
            value={form.price}
            onChange={(e) =>
              form.setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <input
            type="number"
            placeholder={t("modal_quantity_placeholder")}
            value={form.quantity}
            onChange={(e) =>
              form.setQuantity(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <textarea
            placeholder={t("modal_description_placeholder")}
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 h-24 resize-none"
          />

          <Button
            type="submit"
            disabled={form.isPending}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {form.isPending ? t("modal_create_pending") : t("modal_create_button")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

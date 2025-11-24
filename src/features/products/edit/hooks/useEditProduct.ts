"use client";

import { useState } from "react";
import { toast } from "sonner";
import { editProductAction } from "../actions/editProductAction";
import { EditProductData } from "../schemas/editProductSchema";
import { useRouter } from "next/navigation";

export default function useEditProduct(id: number) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function saveProduct(data: EditProductData) {
    try {
      setSaving(true);

      await editProductAction(id, data);

      toast.success("Produto atualizado!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao salvar produto.");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  return { saveProduct, saving };
}

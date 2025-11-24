
"use client";

import { productApi } from "@/app/api/api";

export async function deleteProductAction(id: number | string) {
  if (id === undefined || id === null) {
    throw new Error("ID inválido para deletar produto");
  }

  try {
    const res = await productApi.delete(id);
    return res.data;
  } catch (err: any) {
    console.error("Erro ao deletar produto:", err?.response?.data ?? err);
    throw new Error(err?.response?.data?.message || "Erro ao deletar produto");
  }
}

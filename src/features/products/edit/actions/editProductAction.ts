"use server";

import { EditProductData } from "../schemas/editProductSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function editProductAction(id: number, data: EditProductData) {
  const session = await getServerSession(authOptions);

  const token = session?.accessToken || session?.user?.token;
  if (!token) throw new Error("Token não encontrado na sessão.");

  const payload = {
    name: data.name,
    price: data.price,
    quantity: data.quantity,
    description: data.description,
  };

  const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   
    },
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Erro ao atualizar produto");
  }

  return { success: true };
}

"use server";

export async function serverUpdateProduct(id: number, data: any) {
  const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Erro ao atualizar");

  return res.json();
}

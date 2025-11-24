import { useState } from "react";
import useCreateProduct from "./useCreateProduct";
import { toast } from "sonner";

export function useCreateProductForm(onCreate: () => void, t: any) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const { mutateAsync, isPending } = useCreateProduct();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const createPromise = mutateAsync({
      name,
      price: Number(price),
      quantity: Number(quantity),
      description,
    });

    await toast.promise(createPromise, {
      loading: t("product_create_pending"),
      success: () => {
        resetForm();
        onCreate();
        setOpen(false);
        return t("product_create_success");
      },
      error: (err) =>
        err.response?.data?.message || t("product_create_error"),
    });
  }

  function resetForm() {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
  }

  return {
    open,
    setOpen,
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    description,
    setDescription,
    handleSubmit,
    isPending,
  };
}

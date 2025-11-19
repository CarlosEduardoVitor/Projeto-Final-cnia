'use client'

import { useState } from "react";
import { api } from "@/app/api/api";
import { toast } from "sonner";
import { detailsSchemas } from "@/features/auth/schemas/detailsSchemas";
import { ZodError } from "zod"; 

export function useDetails() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      detailsSchemas.parse({ currentPassword, newPassword, confirmPassword });
    } catch (err) {
      if (err instanceof ZodError) { 
        const firstError = err.issues[0]?.message || "Erro de validação";
        toast.error(firstError);
        setLoading(false);
        return;
      }
      toast.error("Erro desconhecido na validação");
      setLoading(false);
      return;
    }

    try {
  await api.patch(`/v1/users/password`, {
    currentPassword,
    newPassword,
    confirmNewPassword: confirmPassword,
  });

  toast.success("Senha alterada com sucesso!");
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
} catch (err: any) {
  let message = "Erro desconhecido";

  if (err.response?.data) {
    if (typeof err.response.data === "string") {
      message = err.response.data;
    } else if (err.response.data.message) {
      message = err.response.data.message;
    } else {
      message = JSON.stringify(err.response.data);
    }
  }

  toast.error(message);
} finally {
  setLoading(false);
}
  }

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleChangePassword,
    loading
  };
}

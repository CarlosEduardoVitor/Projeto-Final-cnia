'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/api/api";
import { registerSchemas } from "@/features/auth/schemas/registerSchemas";
import { ZodError } from "zod";

export function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    setLoading(true);

    try {
      registerSchemas.parse({
        name,
        email,
        password,
        confirmPassword,
      });

      const res = await authApi.register({ name, email, password });

      router.push("/login");
      return "Registro efetuado com sucesso!";

    } catch (err: any) {

      if (err instanceof ZodError) {
        throw new Error(err.issues[0].message);
      }

      const backendMsg = err.response?.data?.message || "Falha ao registrar. Tente novamente.";
      throw new Error(backendMsg);

    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
    loading,
  };
}

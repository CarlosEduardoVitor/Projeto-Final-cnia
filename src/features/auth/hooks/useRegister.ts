'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/api/api";
import { registerSchemas } from "@/features/auth/schemas/registerSchemas";
import { toast } from "sonner";
import { ZodError } from "zod";

export function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      registerSchemas.parse({
        name,
        email,
        password,
        confirmPassword,
      });

      await authApi.register({ name, email, password });

      toast.success("Conta criada com sucesso!");
      router.push("/login");

    } catch (err: any) {

      if (err instanceof ZodError) {
        const firstError = err.issues[0].message;
        toast.error(firstError);
        setError(firstError);
        return;
      }

      const backendMsg = err.response?.data?.message || "Falha ao registrar. Tente novamente.";
      toast.error(backendMsg);
      setError(backendMsg);

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
    error,
  };
}

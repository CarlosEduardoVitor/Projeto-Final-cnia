'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema } from "../schemas/loginSchemas";
import { toast } from "sonner";
import { ZodError } from "zod";

export function useLogin() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      loginSchema.parse({ email: emailLogin, password: passwordLogin });

      const res = await signIn("credentials", {
        redirect: false,
        email: emailLogin,
        password: passwordLogin,
      });

      if (res?.error) {
        toast.error(res.error);
        setError(res.error);
      } else {
        toast.success("Login feito com sucesso!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err instanceof ZodError) {
        const firstError = err.issues[0].message;
        toast.error(firstError);
        setError(firstError);
        return;
      }

      toast.error("Falha ao logar. Tente novamente.");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  }

  return {
    emailLogin,
    passwordLogin,
    setEmailLogin,
    setPasswordLogin,
    handleLogin,
    loading,
    error,
  };
}

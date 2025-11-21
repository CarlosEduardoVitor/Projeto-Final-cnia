'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema } from "../schemas/loginSchemas";
import { ZodError } from "zod";

export function useLogin() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    try {
      loginSchema.parse({ email: emailLogin, password: passwordLogin });

      const res = await signIn("credentials", {
        redirect: false,
        email: emailLogin,
        password: passwordLogin,
      });

      if (res?.error) {
        throw new Error(res.error); 
      }

      router.push("/dashboard");
      return "Login realizado com sucesso!";

    } catch (err: any) {
      if (err instanceof ZodError) {
        throw new Error(err.issues[0].message);
      }

      throw new Error(err.message || "Falha ao logar.");
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
  };
}

import { z } from 'zod'; 

export const registerSchemas = z.object({
    name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres"),
    email: z.string().email("Digite um email válido"),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação precisa ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});
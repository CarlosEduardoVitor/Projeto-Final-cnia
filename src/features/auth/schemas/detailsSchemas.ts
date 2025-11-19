import { z } from "zod";

export const detailsSchemas = z.object({
  currentPassword: z.string().min(6, "A senha atual precisa ter pelo menos 6 caracteres"),
  newPassword: z.string().min(6, "A nova senha precisa ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação precisa ter pelo menos 6 caracteres"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});


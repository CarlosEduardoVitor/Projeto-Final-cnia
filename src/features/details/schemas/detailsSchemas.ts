import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "A senha atual precisa ter pelo menos 6 caracteres"),
  newPassword: z.string().min(6, "A nova senha precisa ter pelo menos 6 caracteres"),
  confirmNewPassword: z.string().min(6, "A confirmação precisa ter pelo menos 6 caracteres"),
  email: z.string().email("E-mail inválido"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "As senhas não coincidem",
  path: ["confirmNewPassword"],
});

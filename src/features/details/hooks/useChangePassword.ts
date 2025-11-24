"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/app/api/api";
import { signIn } from "next-auth/react";
import { changePasswordSchema } from "@/features/details/schemas/detailsSchemas";
import { z } from "zod";

export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;

export default function useChangePassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      changePasswordSchema.parse(payload);

      await userApi.patch("/password", payload);
    },

    onSuccess: async (_, payload) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      await signIn("credentials", {
        redirect: false,
        email: payload.email,
        password: payload.newPassword,
      });
    },
  });

  return mutation;
}

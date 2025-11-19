"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/api/api";

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function useChangePassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      await api.patch("/users/password", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
}

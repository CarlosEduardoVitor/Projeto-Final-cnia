"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/api/api";

export default function useUser() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return { ...query, refresh };
}

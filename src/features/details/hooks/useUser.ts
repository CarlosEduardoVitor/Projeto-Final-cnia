
"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/app/api/api";

export interface User {
  id: number;
  name: string;
  email: string;
}

export default function useUser() {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await userApi.get("/me"); 
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

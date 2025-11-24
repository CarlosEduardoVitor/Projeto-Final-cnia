"use client";

import axios from "axios";
import { getSession } from "next-auth/react";

export const clientApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

clientApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken || session?.user?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const clientProductApi = {
  update: (id: number, data: any) =>
    clientApi.patch(`/v1/products/${id}`, data),
};

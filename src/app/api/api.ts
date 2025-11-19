// api.ts
import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { getSession } from "next-auth/react";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.user?.token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// TIPOS
export interface ProductPayload {
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
}

export interface ProductListParams {
  page?: number;
  size?: number;
  name?: string;
  min?: number;
  max?: number;
}

// PRODUCT API
export const productApi = {
  get: (id: number | string) => api.get(`/products/${id}`),
  list: (params?: ProductListParams) => api.get(`/products`, { params }),
  search: (params?: ProductListParams) => api.get(`/products/search`, { params }),
  create: (data: ProductPayload) => api.post(`/products`, data),
  update: (id: number | string, data: ProductPayload) => api.patch(`/products/${id}`, data),
  delete: (id: number | string) => api.delete(`/products/${id}`),
};

// AUTH API
export const authApi = {
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  register: (data: { name: string; email: string; password: string }) => api.post("/auth/register", data),
};

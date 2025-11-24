"use client";

import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { getSession } from "next-auth/react";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.accessToken || session?.user?.token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const userApi = axios.create({
  baseURL: "http://localhost:8080/api/v1/users",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

userApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.accessToken || session?.user?.token;

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
  get: (id: number | string) => api.get(`/v1/products/${id}`),
  list: (params?: ProductListParams) => api.get(`/v1/products`, { params }),
  search: (params?: ProductListParams) =>
    api.get(`/v1/products/search`, { params }),
  create: (data: ProductPayload) => api.post(`/v1/products`, data),
  update: (id: number | string, data: ProductPayload) =>
    api.patch(`/v1/products/${id}`, data),
  delete: (id: number | string) => api.delete(`/v1/products/${id}`),
};

// AUTH API
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),
};

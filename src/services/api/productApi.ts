import api from "./axios";
import type { Product } from "../../types/products";

export interface GetProductsParams {
    search?: string;
    category?: string;
    sort?: string;
}

export const productApi = {
    getProducts: async (params?: GetProductsParams): Promise<Product[]> => {
        const response = await api.get<Product[]>("/products", { params });
        return response.data;
    },

    getProductById: async (id: number): Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    createProduct: async (formData: FormData): Promise<Product> => {
        const response = await api.post<Product>("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    updateProduct: async (id: number, formData: FormData): Promise<Product> => {
        const response = await api.put<Product>(`/products/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    deleteProduct: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/products/${id}`);
        return response.data;
    },

    getUserProducts: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>("/products/me");
        return response.data;
    },
};

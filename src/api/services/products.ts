import qs from "qs";

import axiosInstance from "../http/interceptors";
import type {
    AddProductRequest,
    PriceOptimizationData,
    PriceOptimizationResult,
    Product,
    ProductQuery,
    ProductSales,
    ProductUpdateData
} from "../../types/api/products.ts";

export const productService = {
    getAll: async (params: ProductQuery) => {
        const {data} = await axiosInstance.get<Product[]>("/products/", {params});
        return data;
    },

    getById: async (id: string) => {
        const {data} = await axiosInstance.get(`/products/${id}`);
        return data;
    },

    create: async (payload: AddProductRequest): Promise<Product> => {
        const {data} = await axiosInstance.post<Product>("/products/", payload);
        return data;
    },

    delete: async (id: number) => {
        return await axiosInstance.delete(`/products/${id}/`);
    },

    getAllSales: async (productIds: number[]) => {
        const {data} = await axiosInstance.get<ProductSales[]>("/products/sales/", {
            params: {productIds},
            paramsSerializer: params => qs.stringify(params, {arrayFormat: "repeat"})
        });
        return data;
    },

    priceOptimize: async (data: PriceOptimizationData[]) => {
        const {data: results} = await axiosInstance.post<PriceOptimizationResult[]>(`/products/price-optimize/`, data)
        return results

    },

    updateProduct: async (productId: number, data: ProductUpdateData) => {
        const {data: product} = await axiosInstance.patch<Product>(`/products/${productId}/`, data);
        return product;
    }
};

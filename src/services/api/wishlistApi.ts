import api from "./axios";

export const wishlistApi = {
    getWishlist: async (): Promise<number[]> => {
        const response = await api.get<number[]>("/wishlist");
        return response.data;
    },

    toggleWishlist: async (productId: number): Promise<number[]> => {
        const response = await api.post<number[]>("/wishlist/toggle", { productId });
        return response.data;
    },
};

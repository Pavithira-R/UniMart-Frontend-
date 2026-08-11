import api from "./axios";
import type { User } from "../../store/slices/authSlice";

export const userApi = {
    getUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>("/users");
        return response.data;
    },

    getUserById: async (id: string): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },
};

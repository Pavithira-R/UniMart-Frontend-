import api from "./axios";
import type { User } from "../../store/slices/authSlice";

export interface LoginResponse {
    user: User;
    token: string;
}

export interface RegisterResponse {
    user: User;
    token: string;
}

export const authApi = {
    login: async (credentials: any): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/auth/login", credentials);
        return response.data;
    },

    register: async (userData: any): Promise<RegisterResponse> => {
        const response = await api.post<RegisterResponse>("/auth/register", userData);
        return response.data;
    },

    getProfile: async (): Promise<{ user: User }> => {
        const response = await api.get<{ user: User }>("/auth/profile");
        return response.data;
    },

    updateProfile: async (profileData: Partial<User>): Promise<{ user: User }> => {
        const response = await api.put<{ user: User }>("/auth/profile", profileData);
        return response.data;
    },
};

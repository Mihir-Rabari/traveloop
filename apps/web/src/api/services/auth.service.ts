import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";
import { AuthResponse } from "../types/auth.types";

export const authService = {
  login: async (data: unknown) => {
    return request.post<ApiResponse<AuthResponse>>(ENDPOINTS.AUTH.LOGIN, data);
  },
  
  register: async (data: unknown) => {
    return request.post<ApiResponse<AuthResponse>>(ENDPOINTS.AUTH.REGISTER, data);
  },
  
  logout: async () => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.LOGOUT);
  },
  
  refresh: async () => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.REFRESH);
  },
  
  verifyEmail: async (data: unknown) => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.VERIFY_EMAIL, data);
  },
  
  getMe: async () => {
    return request.get<ApiResponse>(ENDPOINTS.USERS.ME);
  },

  forgotPassword: async (email: string) => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },
};


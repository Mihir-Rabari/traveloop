import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const authService = {
  login: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.LOGIN, data);
  },
  
  register: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },
  
  logout: async () => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.LOGOUT);
  },
  
  refresh: async () => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.REFRESH);
  },
  
  verifyEmail: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.AUTH.VERIFY_EMAIL, data);
  },
};

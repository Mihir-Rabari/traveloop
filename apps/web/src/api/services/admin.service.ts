import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const adminService = {
  getStats: async () => {
    return request.get<ApiResponse>(ENDPOINTS.ADMIN.STATS);
  },
  
  getUsers: async (params?: unknown) => {
    return request.get<ApiResponse>(ENDPOINTS.ADMIN.USERS, { params });
  },
  
  getTrips: async (params?: unknown) => {
    return request.get<ApiResponse>(ENDPOINTS.ADMIN.TRIPS, { params });
  },
};

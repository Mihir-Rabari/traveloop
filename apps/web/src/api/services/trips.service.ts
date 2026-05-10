import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse, PaginatedResponse } from "../types/api-response.types";

export const tripsService = {
  getTrips: async (params?: any) => {
    return request.get<PaginatedResponse>(ENDPOINTS.TRIPS.BASE, { params });
  },
  
  getTripById: async (id: string) => {
    return request.get<ApiResponse>(ENDPOINTS.TRIPS.DETAILS(id));
  },
  
  createTrip: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.TRIPS.BASE, data);
  },
  
  updateTrip: async (id: string, data: any) => {
    return request.patch<ApiResponse>(ENDPOINTS.TRIPS.DETAILS(id), data);
  },
  
  deleteTrip: async (id: string) => {
    return request.delete<ApiResponse>(ENDPOINTS.TRIPS.DETAILS(id));
  },
};

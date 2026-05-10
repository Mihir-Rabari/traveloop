import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse, PaginatedResponse } from "../types/api-response.types";

export const tripsService = {
  getTrips: async (params?: unknown) => {
    return request.get<PaginatedResponse>(ENDPOINTS.TRIPS.BASE, { params });
  },
  
  getTripById: async (id: string) => {
    return request.get<ApiResponse>(ENDPOINTS.TRIPS.DETAILS(id));
  },
  
  createTrip: async (data: unknown) => {
    return request.post<ApiResponse>(ENDPOINTS.TRIPS.BASE, data);
  },
  
  updateTrip: async (id: string, data: unknown) => {
    return request.patch<ApiResponse>(ENDPOINTS.TRIPS.DETAILS(id), data);
  },
  
  deleteTrip: async (id: string) => {
    return request.delete<ApiResponse>(ENDPOINTS.TRIPS.DETAILS(id));
  },
};

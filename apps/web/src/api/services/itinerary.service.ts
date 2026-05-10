import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const itineraryService = {
  getStops: async (tripId: string) => {
    return request.get<ApiResponse>(ENDPOINTS.ITINERARY.BY_TRIP(tripId));
  },
  
  createStop: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.ITINERARY.BASE, data);
  },
  
  updateStop: async (id: string, data: any) => {
    return request.put<ApiResponse>(ENDPOINTS.ITINERARY.STOP_DETAILS(id), data);
  },
  
  deleteStop: async (id: string) => {
    return request.delete<ApiResponse>(ENDPOINTS.ITINERARY.STOP_DETAILS(id));
  },

  createActivity: async (data: any) => {
    return request.post<ApiResponse>(ENDPOINTS.ITINERARY.ACTIVITIES, data);
  },

  updateActivity: async (id: string, data: any) => {
    return request.put<ApiResponse>(ENDPOINTS.ITINERARY.ACTIVITY_DETAILS(id), data);
  },

  deleteActivity: async (id: string) => {
    return request.delete<ApiResponse>(ENDPOINTS.ITINERARY.ACTIVITY_DETAILS(id));
  },
};

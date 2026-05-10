import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const citiesService = {
  searchCities: async (query: string) => {
    return request.get<ApiResponse>(ENDPOINTS.CITIES.SEARCH, { params: { q: query } });
  },
  
  getPopularCities: async () => {
    return request.get<ApiResponse>(ENDPOINTS.CITIES.POPULAR);
  },
  
  getAllCities: async () => {
    return request.get<ApiResponse>(ENDPOINTS.CITIES.BASE);
  },
};

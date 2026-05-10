import { useQuery } from "@tanstack/react-query";
import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const useActivities = (city: string) => {
  const useCityActivitiesQuery = () => {
    return useQuery({
      queryKey: ["activities", city],
      queryFn: () => request.get<ApiResponse>(ENDPOINTS.CITIES.ACTIVITIES, { params: { city } }),
      enabled: !!city,
    });
  };

  return {
    useCityActivitiesQuery,
  };
};

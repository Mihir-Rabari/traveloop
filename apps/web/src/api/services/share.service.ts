import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const shareService = {
  getSharedTrip: async (id: string) => {
    return request.get<ApiResponse>(ENDPOINTS.SHARE.DETAILS(id));
  },
};

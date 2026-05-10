import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const packingService = {
  getChecklist: (tripId: string) => request.get<ApiResponse>(ENDPOINTS.PACKING.BY_TRIP(tripId)),
  addItem: (data: { tripId: string; name: string; category?: string }) => request.post<ApiResponse>(`${ENDPOINTS.PACKING.BASE}/items`, data),
  updateItem: (id: string, data: any) => request.patch<ApiResponse>(ENDPOINTS.PACKING.ITEM_DETAILS(id), data),
  deleteItem: (id: string) => request.delete<ApiResponse>(ENDPOINTS.PACKING.ITEM_DETAILS(id)),
  toggleItem: (id: string) => request.post<ApiResponse>(ENDPOINTS.PACKING.TOGGLE(id), {}),
};

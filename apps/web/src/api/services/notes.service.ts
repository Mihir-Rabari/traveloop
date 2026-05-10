import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const notesService = {
  getNotesByTrip: async (tripId: string) => {
    return request.get<ApiResponse>(ENDPOINTS.NOTES.BY_TRIP(tripId));
  },
  
  createNote: async (data: unknown) => {
    return request.post<ApiResponse>(ENDPOINTS.NOTES.BASE, data);
  },
  
  updateNote: async (id: string, data: unknown) => {
    return request.patch<ApiResponse>(ENDPOINTS.NOTES.DETAILS(id), data);
  },
  
  deleteNote: async (id: string) => {
    return request.delete<ApiResponse>(ENDPOINTS.NOTES.DETAILS(id));
  },
};

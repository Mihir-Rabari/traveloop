import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const noteService = {
  getNotes: (tripId: string) => request.get<ApiResponse>(ENDPOINTS.NOTES.BY_TRIP(tripId)),
  createNote: (data: { tripId: string; title: string; content: string }) => request.post<ApiResponse>(ENDPOINTS.NOTES.BASE, data),
  updateNote: (id: string, data: any) => request.patch<ApiResponse>(ENDPOINTS.NOTES.DETAILS(id), data),
  deleteNote: (id: string) => request.delete<ApiResponse>(ENDPOINTS.NOTES.DETAILS(id)),
};

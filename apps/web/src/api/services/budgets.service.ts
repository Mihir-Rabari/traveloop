import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const budgetsService = {
  getBudgetByTrip: async (tripId: string) => {
    return request.get<ApiResponse>(ENDPOINTS.BUDGETS.BY_TRIP(tripId));
  },
  
  updateBudget: async (tripId: string, data: unknown) => {
    return request.put<ApiResponse>(ENDPOINTS.BUDGETS.BY_TRIP(tripId), data);
  },
  
  getCategories: async () => {
    return request.get<ApiResponse>(ENDPOINTS.BUDGETS.CATEGORIES);
  },
  
  addExpense: async (data: unknown) => {
    return request.post<ApiResponse>(ENDPOINTS.BUDGETS.EXPENSES, data);
  },
  
  deleteExpense: async (id: string) => {
    return request.delete<ApiResponse>(ENDPOINTS.BUDGETS.EXPENSE_DETAILS(id));
  },
};

import { request } from "../client/request";
import { ENDPOINTS } from "../constants/endpoints";
import { ApiResponse } from "../types/api-response.types";

export const budgetService = {
  getBudgets: () => request.get<ApiResponse>(ENDPOINTS.BUDGETS.BASE),
  getBudgetByTrip: (tripId: string) => request.get<ApiResponse>(ENDPOINTS.BUDGETS.BY_TRIP(tripId)),
  updateBudget: (tripId: string, data: any) => request.put<ApiResponse>(ENDPOINTS.BUDGETS.BY_TRIP(tripId), data),
  
  getExpenses: (tripId: string) => request.get<ApiResponse>(ENDPOINTS.BUDGETS.EXPENSES, { params: { tripId } }),
  addExpense: (data: any) => request.post<ApiResponse>(ENDPOINTS.BUDGETS.EXPENSES, data),
  deleteExpense: (id: string) => request.delete<ApiResponse>(ENDPOINTS.BUDGETS.EXPENSE_DETAILS(id)),
};

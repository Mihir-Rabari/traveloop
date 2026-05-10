import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetsService } from "../services/budgets.service";

export const useBudgets = (tripId?: string) => {
  const queryClient = useQueryClient();

  const useBudgetQuery = () => {
    return useQuery({
      queryKey: ["budget", tripId],
      queryFn: () => budgetsService.getBudgetByTrip(tripId!),
      enabled: !!tripId,
    });
  };

  const useCategoriesQuery = () => {
    return useQuery({
      queryKey: ["budget-categories"],
      queryFn: budgetsService.getCategories,
    });
  };

  const useUpdateBudgetMutation = () => {
    return useMutation({
      mutationFn: (data: unknown) => budgetsService.updateBudget(tripId!, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budget", tripId] });
      },
    });
  };

  const useAddExpenseMutation = () => {
    return useMutation({
      mutationFn: budgetsService.addExpense,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budget", tripId] });
      },
    });
  };

  const useDeleteExpenseMutation = () => {
    return useMutation({
      mutationFn: budgetsService.deleteExpense,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budget", tripId] });
      },
    });
  };

  return {
    useBudgetQuery,
    useCategoriesQuery,
    useUpdateBudgetMutation,
    useAddExpenseMutation,
    useDeleteExpenseMutation,
  };
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "../services/budget.service";

export const useBudget = () => {
  const queryClient = useQueryClient();

  const useBudgetsQuery = () =>
    useQuery({
      queryKey: ["budgets"],
      queryFn: budgetService.getBudgets,
    });

  const useTripBudgetQuery = (tripId: string) =>
    useQuery({
      queryKey: ["budgets", "trip", tripId],
      queryFn: () => budgetService.getBudgetByTrip(tripId),
      enabled: !!tripId,
    });

  const useExpensesQuery = (tripId: string) =>
    useQuery({
      queryKey: ["expenses", tripId],
      queryFn: () => budgetService.getExpenses(tripId),
      enabled: !!tripId,
    });

  const useCreateBudgetMutation = () =>
    useMutation({
      mutationFn: budgetService.createBudget,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
      },
    });

  const useAddExpenseMutation = () =>
    useMutation({
      mutationFn: budgetService.addExpense,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["expenses", variables.tripId] });
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
      },
    });

  return {
    useBudgetsQuery,
    useTripBudgetQuery,
    useExpensesQuery,
    useCreateBudgetMutation,
    useAddExpenseMutation,
  };
};

import { budgetsRepository } from "./budgets.repository";
import { prisma } from "../../lib/prisma";

export class BudgetsService {
  async getTripBudget(tripId: string) {
    const budget = await budgetsRepository.findByTripId(tripId);
    const expenses = await budgetsRepository.getExpenses(tripId);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {
      budget,
      expenses,
      totalExpenses,
      remaining: budget ? budget.amount - totalExpenses : 0,
    };
  }

  async updateBudget(tripId: string, data: any) {
    return budgetsRepository.upsertBudget(tripId, data);
  }

  async addExpense(data: any) {
    return budgetsRepository.createExpense({
      ...data,
      date: new Date(data.date),
    });
  }

  async deleteExpense(expenseId: string) {
    return budgetsRepository.deleteExpense(expenseId);
  }

  async getCategories() {
    return budgetsRepository.getExpenseCategories();
  }
}

export const budgetsService = new BudgetsService();

import { budgetsRepository } from "./budgets.repository";
import { prisma } from "../../lib/prisma";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export class BudgetsService {
  async getTripBudget(tripId: string, userId: string) {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.visibility === "PRIVATE" && trip.userId !== userId) throw new ForbiddenError();

    const budget = await budgetsRepository.findByTripId(tripId);
    const expenses = await budgetsRepository.getExpenses(tripId);
    const totalExpenses = expenses.reduce((sum: number, exp: { amount: number }) => sum + exp.amount, 0);

    return {
      budget,
      expenses,
      totalExpenses,
      remaining: budget ? budget.amount - totalExpenses : 0,
    };
  }

  async updateBudget(tripId: string, userId: string, data: any) {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.userId !== userId) throw new ForbiddenError();

    return budgetsRepository.upsertBudget(tripId, data);
  }

  async addExpense(userId: string, data: any) {
    const trip = await prisma.trip.findUnique({ where: { id: data.tripId } });
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.userId !== userId) throw new ForbiddenError();

    return budgetsRepository.createExpense({
      ...data,
      date: new Date(data.date),
    });
  }

  async deleteExpense(expenseId: string, userId: string) {
    const expense = await budgetsRepository.findExpenseById(expenseId);
    if (!expense) throw new NotFoundError("Expense not found");
    if (expense.trip.userId !== userId) throw new ForbiddenError();

    return budgetsRepository.deleteExpense(expenseId);
  }

  async getCategories() {
    return budgetsRepository.getExpenseCategories();
  }
}

export const budgetsService = new BudgetsService();

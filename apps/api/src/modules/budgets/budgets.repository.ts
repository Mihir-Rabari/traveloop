import { prisma } from "../../lib/prisma";

export class BudgetsRepository {
  async findByTripId(tripId: string) {
    return prisma.budget.findUnique({
      where: { tripId },
    });
  }

  async upsertBudget(tripId: string, data: any) {
    return prisma.budget.upsert({
      where: { tripId },
      update: data,
      create: { ...data, tripId },
    });
  }

  async getExpenses(tripId: string) {
    return prisma.expense.findMany({
      where: { tripId },
      include: { category: true },
      orderBy: { date: "desc" },
    });
  }

  async createExpense(data: any) {
    return prisma.expense.create({
      data,
      include: { category: true },
    });
  }

  async deleteExpense(id: string) {
    return prisma.expense.delete({ where: { id } });
  }

  async findExpenseById(id: string) {
    return prisma.expense.findUnique({
      where: { id },
      include: { trip: true },
    });
  }

  async getExpenseCategories() {
    return prisma.expenseCategory.findMany();
  }
}

export const budgetsRepository = new BudgetsRepository();

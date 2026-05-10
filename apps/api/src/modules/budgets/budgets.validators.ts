import { z } from "zod";

export const createBudgetSchema = z.object({
  body: z.object({
    tripId: z.string().cuid(),
    amount: z.number().positive(),
    currency: z.string().optional(),
  }),
});

export const updateBudgetSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    currency: z.string().optional(),
  }),
});

export const createExpenseSchema = z.object({
  body: z.object({
    tripId: z.string().cuid(),
    categoryId: z.string().cuid(),
    amount: z.number().positive(),
    currency: z.string().optional(),
    description: z.string().optional(),
    date: z.string().datetime(),
  }),
});

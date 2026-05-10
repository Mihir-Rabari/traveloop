import { z } from "zod";

export const createChecklistSchema = z.object({
  body: z.object({
    tripId: z.string().cuid(),
    title: z.string().min(1),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    checklistId: z.string().cuid(),
    name: z.string().min(1),
    category: z.string().optional(),
    quantity: z.number().int().positive().optional(),
  }),
});

export const updateItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    category: z.string().optional(),
    isCompleted: z.boolean().optional(),
    quantity: z.number().int().positive().optional(),
  }),
});

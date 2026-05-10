import { z } from "zod";

export const createStopSchema = z.object({
  body: z.object({
    tripId: z.string().cuid(),
    location: z.string().min(1),
    order: z.number().int(),
    date: z.string().datetime().optional(),
    notes: z.string().optional(),
  }),
});

export const updateStopSchema = z.object({
  body: z.object({
    location: z.string().min(1).optional(),
    order: z.number().int().optional(),
    date: z.string().datetime().optional(),
    notes: z.string().optional(),
  }),
});

export const createActivitySchema = z.object({
  body: z.object({
    stopId: z.string().cuid(),
    title: z.string().min(1),
    description: z.string().optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    cost: z.number().optional(),
    location: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const updateActivitySchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    cost: z.number().optional(),
    location: z.string().optional(),
    category: z.string().optional(),
  }),
});

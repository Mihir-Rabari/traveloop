import { z } from "zod";

const Visibility = ["PUBLIC", "PRIVATE"] as const;

export const createTripSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    visibility: z.enum(Visibility).optional(),
    coverImage: z.string().url().optional(),
  }),
});

export const updateTripSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    visibility: z.enum(Visibility).optional(),
    coverImage: z.string().url().optional(),
  }),
});

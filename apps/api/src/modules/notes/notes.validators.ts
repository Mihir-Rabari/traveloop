import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    tripId: z.string().cuid(),
    title: z.string().min(1),
    content: z.string().min(1),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  }),
});

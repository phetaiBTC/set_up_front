import { z } from "zod";

export const BaseEntity = z.object({
  id: z.int(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

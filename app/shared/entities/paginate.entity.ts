import { z } from "zod";

export const PaginationSchema = z.object({
  total: z.number(),
  count: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});
export type IPagination = z.infer<typeof PaginationSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  pagination: IPagination;
};

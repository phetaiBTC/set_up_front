import z from "zod";
import { Status, sortType, GetType } from "../enum/paginate.enum";
export const PaginateDto = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  is_active: z.enum(Status).optional(),
  sort: z.enum(sortType).optional(),
  type: z.enum(GetType).optional(),
});

export type IPaginateDto = z.infer<typeof PaginateDto>;

import { z } from "zod";

export const PermissionSchema = z.object({
  id: z.number(),
  code: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});
export const PermissionListSchema = z.object({
  data: z.array(PermissionSchema),
  pagination: z.object({
    total: z.number(),
    count: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
  }),
});
export const CreatePermissionSchema = PermissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdatePermissionSchema = CreatePermissionSchema.partial();

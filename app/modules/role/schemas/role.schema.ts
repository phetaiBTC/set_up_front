import { z } from "zod";
import { PermissionSchema } from "~/modules/permission/schemas/permission.schema";
export const RoleSchema = z.object({
  id: z.number(),
  code: z.string().nonempty({ message: "is_required" }),
  permissions: z.array(PermissionSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});
export const RoleListSchema = z.object({
  data: z.array(RoleSchema),
  pagination: z.object({
    total: z.number(),
    count: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
  }),
});
export const CreateRoleSchema = RoleSchema.omit({
  id: true,
  permissions: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  permissions: z.array(z.number()), // เพิ่ม field ใหม่
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

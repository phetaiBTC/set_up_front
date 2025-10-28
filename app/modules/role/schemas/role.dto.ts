import { z } from "zod";
import type {
  CreateRoleSchema,
  RoleSchema,
  UpdateRoleSchema,
} from "./role.schema";

export type Role = z.infer<typeof RoleSchema>;
export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;

import { z } from "zod";
import { BaseEntity } from "~/shared/entities/base.entity";
import { PermissionEntity } from "./permission.entity";
export const RoleEntity = BaseEntity.extend({
  code: z.string(),
  permissions: z.array(PermissionEntity),
});

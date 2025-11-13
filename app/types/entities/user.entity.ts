import { z } from "zod";
import { BaseEntity } from "~/shared/entities/base.entity";
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "./permission.entity";
export const UserEntity = BaseEntity.extend({
  username: z.string(),
  email: z.string(),
  is_verified: z.boolean(),
  roles: z.array(RoleEntity),
  permissions: z.array(PermissionEntity),
});
export type IUserEntity = z.infer<typeof UserEntity>;

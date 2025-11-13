import { z } from "zod";
import { BaseEntity } from "~/shared/entities/base.entity";
export const PermissionEntity = BaseEntity.extend({
    code: z.string(),
});
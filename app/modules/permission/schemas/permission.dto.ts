import type { z } from "zod";
import {
  PermissionSchema,
  CreatePermissionSchema,
  UpdatePermissionSchema,
} from "./permission.schema";

export type Permission = z.infer<typeof PermissionSchema>;
export type CreatePermissionDto = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionDto = z.infer<typeof UpdatePermissionSchema>;

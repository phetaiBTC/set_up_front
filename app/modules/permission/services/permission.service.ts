import type { PaginationDto } from "~/shared/dto/pagination.dto";
import type { Permission } from "../schemas/permission.dto";
import {
  PermissionListSchema,
  PermissionSchema,
} from "../schemas/permission.schema";
import { useApi } from "~/composables/useApi";
import type { PaginatedResponse } from "~/shared/interface/pagination.interface";

export class PermissionService {
  private readonly baseUrl = "/permission";

  async getAll(params?: PaginationDto): Promise<PaginatedResponse<Permission>> {
    const { data } = await useApi().get<PaginatedResponse<Permission>>(
      this.baseUrl,
      { params }
    );
    console.log(data);
    return PermissionListSchema.parse(data);
  }

  async getById(id: number): Promise<Permission> {
    const response = await useApi().get<Permission>(`${this.baseUrl}/${id}`);
    return PermissionSchema.parse(response);
  }
}

export const permissionService = new PermissionService();

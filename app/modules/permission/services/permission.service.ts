import type { PaginationDto } from "~/shared/dto/pagination.dto";
import type {
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
} from "../schemas/permission.dto";
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

  async create(data: CreatePermissionDto): Promise<Permission> {
    const response = await useApi().post<Permission>(this.baseUrl, data);
    return PermissionSchema.parse(response);
  }

  async update(id: number, data: UpdatePermissionDto): Promise<Permission> {
    const response = await useApi().patch<Permission>(
      `${this.baseUrl}/${id}`,
      data
    );
    return PermissionSchema.parse(response);
  }

  async delete(id: number): Promise<void> {
    await useApi().delete(`${this.baseUrl}/${id}`);
  }
}

export const permissionService = new PermissionService();

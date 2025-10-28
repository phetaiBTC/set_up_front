import type { PaginationDto } from "~/shared/dto/pagination.dto";
import { useApi } from "~/composables/useApi";
import type { PaginatedResponse } from "~/shared/interface/pagination.interface";
import type { CreateRoleDto, Role, UpdateRoleDto } from "../schemas/role.dto";
import { RoleListSchema, RoleSchema } from "../schemas/role.schema";

export class RoleService {
  private readonly baseUrl = "/role";

  async getAll(params?: PaginationDto): Promise<PaginatedResponse<Role>> {
    const { data } = await useApi().get<PaginatedResponse<Role>>(this.baseUrl, {
      params,
    });
    return RoleListSchema.parse(data);
  }

  async getById(id: number): Promise<Role> {
    const response = await useApi().get<Role>(`${this.baseUrl}/${id}`);
    return RoleSchema.parse(response);
  }

  async create(data: CreateRoleDto): Promise<Role> {
    const response = await useApi().post<Role>(this.baseUrl, data);
    return RoleSchema.parse(response);
  }

  async update(id: number, data: UpdateRoleDto): Promise<Role> {
    const response = await useApi().patch<Role>(`${this.baseUrl}/${id}`, data);
    return RoleSchema.parse(response);
  }

  async delete(id: number): Promise<void> {
    await useApi().delete(`${this.baseUrl}/${id}`);
  }
}

export const roleService = new RoleService();

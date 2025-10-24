import type { User, CreateUserDto, UpdateUserDto } from '../schemas/user.dto'
import { UserSchema } from '../schemas/user.schema'
import { apiClient } from '~/shared/utils/http'
import { z } from 'zod'

export class UserService {
  private readonly baseUrl = '/api/user'

  async getAll(): Promise<User[]> {
    const response = await apiClient.get<User[]>(this.baseUrl)
    return z.array(UserSchema).parse(response)
  }

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`${this.baseUrl}/${id}`)
    return UserSchema.parse(response)
  }

  async create(data: CreateUserDto): Promise<User> {
    const response = await apiClient.post<User>(this.baseUrl, data)
    return UserSchema.parse(response)
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const response = await apiClient.patch<User>(`${this.baseUrl}/${id}`, data)
    return UserSchema.parse(response)
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`)
  }
}

export const userService = new UserService()

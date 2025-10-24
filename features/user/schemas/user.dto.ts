import type { z } from 'zod'
import { UserSchema, CreateUserSchema, UpdateUserSchema } from './user.schema'

export type User = z.infer<typeof UserSchema>
export type CreateUserDto = z.infer<typeof CreateUserSchema>
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>

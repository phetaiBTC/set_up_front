import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateUserSchema = CreateUserSchema.partial()

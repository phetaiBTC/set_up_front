import { z } from "zod";

export const CreateUserDto = z
  .object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(6),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type CreateUserDto = z.infer<typeof CreateUserDto>;

export const UpdateUserDto = CreateUserDto.omit({
  password: true,
  confirm_password: true,
}).partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;

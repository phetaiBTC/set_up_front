import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export const RegisterSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
  confirm_password: z.string(),
});

import { z } from "zod";
import type { LoginResponseSchema, LoginSchema } from "~/schemas/auth.schema";
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;

import { z } from "zod";

export const LoginDto = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});
export type ILoginDto = z.infer<typeof LoginDto>;

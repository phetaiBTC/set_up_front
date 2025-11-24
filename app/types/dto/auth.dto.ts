import { z } from "zod";
export const LoginDto = z.object({
  email: z.email(),
  password: z.string().nonempty("password_is_required"),
});
export const RegisterDto = z
  .object({
    username: z.string().nonempty("Username is required"),
    email: z.email().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"],
  });
export type ILoginDto = z.infer<typeof LoginDto>;
export type IRegisterDto = z.infer<typeof RegisterDto>;

import type { ILoginDto, IRegisterDto } from "~/types/dto/auth.dto";

export const useAuth = () => {
  const store = useAuthStore();
  const { setLoading } = store;
  const { loading } = storeToRefs(store);
  const toast = useToast();
  const { run } = useFormHandler();

  const login = async (loginDto: ILoginDto) => {
    await run(async () => {
      const res = await useApi().post<{ access_token: string }>(
        "/auth/login",
        loginDto
      );
      if (res.access_token) {
        const token = useCookie("access_token", { path: "/" });
        token.value = res.access_token;
      }
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Login success",
        life: 3000,
      });

      navigateTo("/");
    }, setLoading);
  };

  const register = async (registerDto: IRegisterDto) => {
    await run(async () => {
      await useApi().post("/auth/register", registerDto);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Register success",
        life: 3000,
      });
    }, setLoading);
  };

  const verify = async (token: string) => {
    // console.log(token);
    await run(async () => {
      await useApi().patch(`/user/verify-email?token=${token}`);
      navigateTo("/auth/login");
    }, setLoading);
  };

  const sendVerify = async (email: string) => {
    await run(async () => {
      await useApi().post("/user/resend-mail-verify", {
        email,
      });
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "send success",
        life: 3000,
      });
    }, setLoading);
  };

  const resetPassword = async (
    token: string,
    password: string,
    confirm_password: string
  ) => {
    await run(async () => {
      await useApi().patch(`/user/reset-password?token=${token}`, {
        password,
        confirm_password,
      });
      navigateTo("/auth/login");
    }, setLoading);
  };

  const sendPassword = async (email: string) => {
    await run(async () => {
      await useApi().post("/user/send-password", {
        email,
      });
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "send success",
        life: 3000,
      });
    }, setLoading);
  };

  const logout = () => {
    const token = useCookie("access_token", { path: "/" });
    token.value = null;

    navigateTo("/login");
  };

  return {
    login,
    register,
    loading,
    logout,
    resetPassword,
    verify,
    sendVerify,
    sendPassword,
  };
};

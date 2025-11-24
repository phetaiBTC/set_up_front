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
      navigateTo("/auth/login");
    }, setLoading);
  };

  const logout = () => {
    const token = useCookie("access_token", { path: "/" });
    token.value = null;

    navigateTo("/login");
  };

  return { login, register, loading, logout };
};

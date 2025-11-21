import type { ILoginDto } from "~/types/dto/auth.dto";

export const useAuth = () => {
  const store = useAuthStore();
  const toast = useToast();
  const login = async (loginDto: ILoginDto) => {
    try {
      store.setLoading(true);
      const res = await useApi().post<{ access_token: string }>(
        "/auth/login",
        loginDto
      );
      if (res.access_token) {
        const accessToken = useCookie("access_token");
        accessToken.value = res.access_token;
      }
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Login success",
        life: 3000,
      });
      navigateTo("/");
    } catch (err: any) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: err.response.data.message,
        life: 3000,
      });
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const logout = () => {
    useCookie("access_token").value = null;
    navigateTo("/login");
  };

  return { login, logout };
};

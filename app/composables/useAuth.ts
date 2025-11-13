import type { LoginDto } from "~/dto/auth.dto";
export const useAuth = () => {
  const store = useAuthStore();
  const toast = useToast();
  const login = async (loginDto: LoginDto) => {
    try {
      store.setLoading(true);
      const res = await useApi().post("/auth/login", loginDto);
      if (res.data.access_token) {
        const accessToken = useCookie("access_token");
        accessToken.value = res.data.access_token;
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

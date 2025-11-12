import type { LoginDto } from "~/dto/auth.dto";
export const useAuth = () => {
  const login = async (loginDto: LoginDto) => {
    try {
      const res = await useApi().post("/auth/login", loginDto);
      if (res.data.token) useCookie("token").value = res.data.token;
      return res.data;
    } catch (err: any) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      throw err;
    }
  };

  const logout = () => {
    useCookie("token").value = null;
    navigateTo("/login");
  };

  return { login, logout };
};

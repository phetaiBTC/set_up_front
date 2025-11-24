export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("access_token");
  console.log(token);
  // หน้า public (ไม่ต้อง login)
  const publicPages = ["/auth/login", "/auth/register","/verify"];
  const isPublic = publicPages.includes(to.path);

  // ถ้าไม่มี token และไม่ใช่หน้า public → redirect ไป login
  if (!token.value && !isPublic) {
    return navigateTo("/auth/login");
  }

  // ถ้ามี token และอยู่หน้า login → redirect ไปหน้า home
    if (token.value && to.path === '/auth/login') {
      return navigateTo('/')
    }
});

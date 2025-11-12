export const useAuth = () => {
    const { user } = useAuthStore();
    return { user };
};
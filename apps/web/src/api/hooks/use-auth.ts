import { useAuthStore } from "@/store/auth.store";
import { authService } from "../services/auth.service";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  const login = async (credentials: any) => {
    try {
      const response = await authService.login(credentials);
      setAuth(response.data.user);
      router.push("/dashboard");
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      clearAuth();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

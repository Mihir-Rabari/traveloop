import { useAuthStore } from "@/store/auth.store";
import { authService } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const useMeQuery = () => {
    const query = useQuery({
      queryKey: ["auth", "me"],
      queryFn: () => authService.getMe(),
      enabled: isAuthenticated,
    });

    useEffect(() => {
      if (query.data) {
        // me query response doesn't usually return a new token
        // but we want to ensure the store is in sync
        const userData = (query.data as any).data;
        const currentToken = useAuthStore.getState().token;
        if (userData && currentToken) {
          setAuth(userData, currentToken);
        }
      }
    }, [query.data]);

    return query;
  };

  const loginMutation = useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (response: any) => {
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: any) => authService.register(data),
    onSuccess: (response: any) => {
      // Register might just return message or auto-login
      // Check if backend auto-logins or requires manual login
      if (response.data?.user && response.data?.accessToken) {
        setAuth(response.data.user, response.data.accessToken);
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    },
  });

  const logout = async () => {
    try {
      await authService.logout();
      clearAuth();
      queryClient.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
      queryClient.clear();
      router.push("/login");
    }
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: any) => authService.resetPassword(data),
    onSuccess: () => {
      router.push("/login");
    },
  });

  return {
    user,
    isAuthenticated,
    useMeQuery,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    logout,
  };
};



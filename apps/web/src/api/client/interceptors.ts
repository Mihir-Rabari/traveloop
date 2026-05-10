import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Use dynamic import or getState to avoid circular dependencies
      const { useAuthStore } = require("@/store/auth.store");
      const token = useAuthStore.getState().token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        const { useAuthStore } = require("@/store/auth.store");
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};

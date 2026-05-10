import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add any global headers or logic here (e.g., Auth headers if not using cookies)
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

      // Handle 401 Unauthorized (e.g., trigger token refresh)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Placeholder for refresh token logic
          // await authService.refresh();
          // return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Redirect to login or clear auth state
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

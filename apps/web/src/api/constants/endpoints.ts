export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USERS: {
    ME: "/users/me",
    PROFILE: "/users/profile",
  },
  TRIPS: {
    BASE: "/trips",
    DETAILS: (id: string) => `/trips/${id}`,
  },
} as const;

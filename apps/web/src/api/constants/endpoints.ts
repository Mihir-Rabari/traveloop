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
    ME: "/auth/me",
    PROFILE: "/auth/profile",
  },
  TRIPS: {
    BASE: "/trips",
    DETAILS: (id: string) => `/trips/${id}`,
  },
  ITINERARY: {
    BASE: "/itinerary/stops",
    BY_TRIP: (tripId: string) => `/itinerary/${tripId}`,
    STOP_DETAILS: (id: string) => `/itinerary/stops/${id}`,
    ACTIVITIES: "/itinerary/activities",
    ACTIVITY_DETAILS: (id: string) => `/itinerary/activities/${id}`,
  },
  BUDGETS: {
    BASE: "/budgets",
    CATEGORIES: "/budgets/categories",
    BY_TRIP: (tripId: string) => `/budgets/${tripId}`,
    EXPENSES: "/budgets/expenses",
    EXPENSE_DETAILS: (id: string) => `/budgets/expenses/${id}`,
  },
  PACKING: {
    BASE: "/packing",
    BY_TRIP: (tripId: string) => `/packing/${tripId}`,
    ITEM_DETAILS: (id: string) => `/packing/items/${id}`,
    TOGGLE: (id: string) => `/packing/items/${id}/toggle`,
  },
  NOTES: {
    BASE: "/notes",
    BY_TRIP: (tripId: string) => `/notes/${tripId}`,
    DETAILS: (id: string) => `/notes/${id}`,
  },
  CITIES: {
    BASE: "/cities",
    SEARCH: "/cities/search",
    POPULAR: "/cities/search",
    ACTIVITIES: "/cities/activities",
  },
  SHARE: {
    DETAILS: (id: string) => `/share/${id}`,
  },
  ADMIN: {
    STATS: "/admin/stats",
    USERS: "/admin/users",
    TRIPS: "/admin/trips",
  },
} as const;

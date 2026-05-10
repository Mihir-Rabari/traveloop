export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

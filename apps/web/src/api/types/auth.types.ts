export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    phoneNumber?: string;
    city?: string;
    country?: string;
    bio?: string;
    avatar?: string;
    role: string;
  };

  accessToken: string;
  refreshToken: string;
}

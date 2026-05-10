export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserRole = "USER" | "ADMIN";

export interface AuthUser extends Omit<User, "password"> {}

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

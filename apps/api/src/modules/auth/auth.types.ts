import { User, UserRole } from "@prisma/client";

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

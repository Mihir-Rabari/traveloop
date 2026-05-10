import crypto from "crypto";
import { hashToken } from "../utils/hash-token";

export class TokenService {
  generateVerificationToken() {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashToken(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    return { token, hashedToken, expiresAt };
  }

  generatePasswordResetToken() {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashToken(token);
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    
    return { token, hashedToken, expiresAt };
  }

  hash(token: string) {
    return hashToken(token);
  }
}

export const tokenService = new TokenService();

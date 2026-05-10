import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRepository } from "./auth.repository";
import { mailService } from "../mail/services/mail.service";
import { otpService } from "../mail/services/otp.service";
import { tokenService } from "../mail/services/token.service";
import { AppError, UnauthorizedError, BadRequestError, ConflictError } from "../../utils/errors";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";

export class AuthService {
  async register(data: any) {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { otp, hashedOtp, expiresAt } = otpService.generate();
    await authRepository.upsertVerificationToken(user.id, hashedOtp, expiresAt);

    await mailService.sendVerificationEmail(user.email, otp);

    return { userId: user.id, email: user.email };
  }

  async verifyEmail(email: string, otp: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new BadRequestError("User not found");

    const verificationToken = await authRepository.findVerificationToken(email, otpService.hash(otp)); // Wait, I should add hash to otpService
    if (!verificationToken) {
      throw new BadRequestError("Invalid or expired OTP");
    }

    await authRepository.markEmailAsVerified(user.id, verificationToken.id);
    await mailService.sendWelcomeEmail(user.email, user.name || "there");

    return { message: "Email verified successfully" };
  }

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    await mailService.sendLoginAlertEmail(user.email, new Date().toLocaleString());

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const storedToken = await authRepository.findRefreshToken(token);
    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) await authRepository.deleteRefreshToken(token);
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const user = storedToken.user;
    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await authRepository.deleteRefreshToken(token);
    await authRepository.createRefreshToken(user.id, newRefreshToken, expiresAt);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(token: string) {
    await authRepository.deleteRefreshToken(token);
  }

  async forgotPassword(email: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) return; // Silent return for security

    const { token, hashedToken, expiresAt } = tokenService.generatePasswordResetToken();
    await authRepository.createPasswordResetToken(user.id, hashedToken, expiresAt);

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await mailService.sendPasswordResetEmail(user.email, resetLink);
  }

  async resetPassword(token: string, password: string) {
    const hashedToken = tokenService.hash(token); // Wait, I should add hash to tokenService
    const storedToken = await authRepository.findPasswordResetToken(hashedToken);
    
    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new BadRequestError("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await authRepository.updatePassword(storedToken.userId, hashedPassword);
    await prisma.passwordResetToken.delete({ where: { id: storedToken.id } }); // Direct prisma use for simplicity or add to repo
  }

  private generateAccessToken(user: any) {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );
  }

  private generateRefreshToken(user: any) {
    return jwt.sign(
      { userId: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );
  }
}

export const authService = new AuthService();

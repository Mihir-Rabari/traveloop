import { prisma } from "../../lib/prisma";
import { UserRole } from "@prisma/client";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { email: string; password: string; name: string }) {
    return prisma.user.create({
      data: {
        ...data,
        role: UserRole.USER,
      },
    });
  }

  async findVerificationToken(email: string, token: string) {
    return prisma.emailVerificationToken.findFirst({
      where: {
        token,
        user: { email },
        expiresAt: { gt: new Date() },
      },
    });
  }

  async createVerificationToken(userId: string, token: string, expiresAt: Date) {
    return prisma.emailVerificationToken.upsert({
      where: { token }, // This might be wrong if token is reused, but tokens should be unique
      update: { token, expiresAt },
      create: { userId, token, expiresAt },
    });
  }

  // Optimized for upsert by userId
  async upsertVerificationToken(userId: string, token: string, expiresAt: Date) {
    const existing = await prisma.emailVerificationToken.findFirst({ where: { userId } });
    if (existing) {
      return prisma.emailVerificationToken.update({
        where: { id: existing.id },
        data: { token, expiresAt, verifiedAt: null },
      });
    }
    return prisma.emailVerificationToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async markEmailAsVerified(userId: string, tokenId: string) {
    return prisma.$transaction([
      prisma.emailVerificationToken.update({
        where: { id: tokenId },
        data: { verifiedAt: new Date() },
      }),
      // We don't have an isVerified field on User, but we could add it.
      // The user didn't request isVerified on User model, but usually it's there.
      // I'll check the schema again.
    ]);
  }

  async createRefreshToken(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async deleteRefreshToken(token: string) {
    return prisma.refreshToken.delete({ where: { token } });
  }

  async deleteUserRefreshTokens(userId: string) {
    return prisma.refreshToken.deleteMany({ where: { userId } });
  }

  async findPasswordResetToken(token: string) {
    return prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async createPasswordResetToken(userId: string, token: string, expiresAt: Date) {
    // Delete existing tokens first
    await prisma.passwordResetToken.deleteMany({ where: { userId } });
    return prisma.passwordResetToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async updatePassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password },
    });
  }
}

export const authRepository = new AuthRepository();

import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "./auth.service";
import { authRepository } from "./auth.repository";
import { mailService } from "../mail/services/mail.service";
import { otpService } from "../mail/services/otp.service";

vi.mock("./auth.repository");
vi.mock("../mail/services/mail.service");
vi.mock("../../lib/prisma", () => ({
  prisma: {
    $transaction: vi.fn((cb) => cb({
      user: { create: vi.fn().mockResolvedValue({ id: "1", email: "test@example.com" }) },
      verificationToken: { upsert: vi.fn() },
    })),
  },
}));

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const userData = { email: "test@example.com", password: "password123", name: "Test" };
      (authRepository.findUserByEmail as any).mockResolvedValue(null);
      
      const result = await authService.register(userData);

      expect(result).toEqual({ userId: "1", email: "test@example.com" });
      expect(mailService.sendVerificationEmail).toHaveBeenCalled();
    });

    it("should throw conflict error if email exists", async () => {
      const userData = { email: "test@example.com", password: "password123" };
      (authRepository.findUserByEmail as any).mockResolvedValue({ id: "1" });

      await expect(authService.register(userData)).rejects.toThrow("Email already registered");
    });
  });
});

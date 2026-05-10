import { generateOTP } from "../utils/generate-otp";
import { hashToken } from "../utils/hash-token";

export class OTPService {
  generate() {
    const otp = generateOTP(6);
    const hashedOtp = hashToken(otp);
    const expiresAt = new Date(Date.now() + (Number(process.env.OTP_EXPIRY_MINUTES) || 10) * 60 * 1000);
    
    return { otp, hashedOtp, expiresAt };
  }

  async verify(otp: string, hashedOtp: string, expiresAt: Date): Promise<boolean> {
    if (new Date() > expiresAt) return false;
    return hashToken(otp) === hashedOtp;
  }
}

export const otpService = new OTPService();

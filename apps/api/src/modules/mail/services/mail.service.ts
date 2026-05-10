import { MailProvider, MailOptions } from "../providers";
import { ResendMailProvider } from "../providers/resend.provider";
import { NodemailerMailProvider } from "../providers/nodemailer.provider";

export class MailService {
  private provider: MailProvider;

  constructor() {
    const providerType = process.env.MAIL_PROVIDER || "resend";
    
    if (providerType === "resend" && process.env.RESEND_API_KEY) {
      this.provider = new ResendMailProvider(process.env.RESEND_API_KEY);
    } else {
      // Default to Nodemailer (Ethereal) for development if Resend is not configured
      this.provider = new NodemailerMailProvider();
    }
  }

  async send(options: MailOptions): Promise<void> {
    try {
      await this.provider.sendMail(options);
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new Error("Email delivery failed");
    }
  }
}

export const mailService = new MailService();

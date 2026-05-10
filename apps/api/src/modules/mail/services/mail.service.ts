import { render } from "@react-email/render";
import { MailProvider, MailOptions } from "../providers";
import { ResendMailProvider } from "../providers/resend.provider";
import { NodemailerMailProvider } from "../providers/nodemailer.provider";
import VerifyEmailTemplate from "../templates/auth/verify-email";
import ResetPasswordTemplate from "../templates/auth/reset-password";
import WelcomeTemplate from "../templates/auth/welcome";
import LoginAlertTemplate from "../templates/auth/login-alert";
import ShareTripTemplate from "../templates/trips/share-trip";
import * as React from "react";

export class MailService {
  private provider: MailProvider;

  constructor() {
    const providerType = process.env.MAIL_PROVIDER || "resend";
    
    if (providerType === "resend" && process.env.RESEND_API_KEY) {
      this.provider = new ResendMailProvider(process.env.RESEND_API_KEY);
    } else {
      this.provider = new NodemailerMailProvider();
    }
  }

  async send(options: MailOptions): Promise<boolean> {
    try {
      await this.provider.sendMail(options);
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      // We don't throw here to prevent API crashes if mail provider is down
      return false;
    }
  }

  async sendVerificationEmail(to: string, otp: string) {
    const html = await render(React.createElement(VerifyEmailTemplate, { otp }));
    await this.send({
      to,
      subject: "Verify your email address",
      html,
    });
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const html = await render(React.createElement(ResetPasswordTemplate, { resetLink }));
    await this.send({
      to,
      subject: "Reset your password",
      html,
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const html = await render(React.createElement(WelcomeTemplate, { name }));
    await this.send({
      to,
      subject: "Welcome to Traveloop!",
      html,
    });
  }

  async sendLoginAlertEmail(to: string, time: string) {
    const html = await render(React.createElement(LoginAlertTemplate, { email: to, time }));
    await this.send({
      to,
      subject: "New login to your Traveloop account",
      html,
    });
  }

  async sendTripInvitationEmail(to: string, senderName: string, tripTitle: string, shareLink: string) {
    const html = await render(React.createElement(ShareTripTemplate, { senderName, tripTitle, shareLink }));
    await this.send({
      to,
      subject: `${senderName} shared a trip with you: ${tripTitle}`,
      html,
    });
  }
}

export const mailService = new MailService();

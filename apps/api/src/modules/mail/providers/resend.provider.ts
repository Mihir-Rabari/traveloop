import { Resend } from "resend";
import { MailOptions, MailProvider } from "./mail-provider.interface";

export class ResendMailProvider implements MailProvider {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendMail(options: MailOptions): Promise<void> {
    const { to, subject, html, from } = options;
    
    await this.resend.emails.send({
      from: from || process.env.MAIL_FROM || "onboarding@resend.dev",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });
  }
}

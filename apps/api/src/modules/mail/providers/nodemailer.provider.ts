import nodemailer from "nodemailer";
import { MailOptions, MailProvider } from "./mail-provider.interface";

export class NodemailerMailProvider implements MailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(options: MailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: options.from || process.env.MAIL_FROM,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  }
}

export interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface MailProvider {
  sendMail(options: MailOptions): Promise<void>;
}

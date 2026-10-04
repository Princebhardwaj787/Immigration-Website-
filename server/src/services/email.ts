import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

type MailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!env.smtp.host) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
    });
  }
  return transporter;
}

/**
 * Sends an email when SMTP is configured; otherwise logs the message so the
 * flow remains fully testable in development without credentials.
 */
export async function sendMail(input: MailInput): Promise<'sent' | 'logged'> {
  const tx = getTransporter();
  if (!tx) {
    logger.info(`[email:dev-fallback] To: ${input.to} | ${input.subject}`);
    logger.info(input.text);
    return 'logged';
  }
  try {
    await tx.sendMail({ from: env.smtp.from, ...input });
    return 'sent';
  } catch (err) {
    // Never fail a user-facing submission because of a mail outage.
    logger.error('email send failed', { error: (err as Error).message });
    return 'logged';
  }
}

export async function notifyAdmin(subject: string, body: string) {
  if (!env.smtp.notifyEmail) return;
  await sendMail({ to: env.smtp.notifyEmail, subject, text: body });
}

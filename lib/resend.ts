import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export function getFrom() {
  return process.env.EMAIL_FROM ?? "Klarlinje <hei@klarlinje.no>";
}

export function getAppUrl() {
  return process.env.APP_URL ?? "http://localhost:3000";
}

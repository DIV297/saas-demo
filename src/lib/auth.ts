import { DEMO_CREDENTIALS } from "./constants";

/**
 * Demo authentication. Credentials come from env vars (with demo defaults),
 * and a signed-in user is represented by a simple httpOnly cookie.
 *
 * Production: replace with Auth.js / Clerk / Cognito and a signed JWT or
 * database-backed session — the proxy + cookie shape stays the same.
 */
export const DEMO_USER = {
  email: process.env.DEMO_EMAIL ?? DEMO_CREDENTIALS.email,
  password: process.env.DEMO_PASSWORD ?? DEMO_CREDENTIALS.password,
  name: "Aarav Kapoor",
  company: "Kapoor Home Services",
};

export function verifyCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password;
}

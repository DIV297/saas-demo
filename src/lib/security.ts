/**
 * Security headers.
 *  - Static headers are sent on every response (next.config.ts).
 *  - The Content-Security-Policy needs a fresh nonce per request, so proxy.ts builds it.
 */

const isProd = process.env.NODE_ENV === "production";

export const securityHeaders = [
  // Force HTTPS for a year, including subdomains (only meaningful over HTTPS, so prod only).
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }] : []),
  // Stop browsers guessing content types (MIME-sniffing attacks).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking protection for old browsers; modern ones use CSP frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  // Don't leak full URLs (which may contain IDs) to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off browser features the app doesn't use.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  // Isolate our window from cross-origin popups (Spectre-style / tab-nabbing attacks).
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export function createNonce(): string {
  return btoa(crypto.randomUUID());
}

/**
 * Strict CSP: scripts only run if they carry this request's nonce (Next.js adds it to its own
 * scripts automatically), so injected <script> tags are blocked, which is the main XSS defence.
 */
export function buildCsp(nonce: string): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isProd ? "" : " 'unsafe-eval'"}`,
    // Dev only: CSS hot-reload injects <style> tags without a nonce, so allow inline styles.
    // (A nonce would make browsers ignore 'unsafe-inline', hence it's omitted in dev.) Scripts stay strict.
    isProd ? `style-src 'self' 'nonce-${nonce}'` : `style-src 'self' 'unsafe-inline'`,
    // Inline style *attributes* (used for computed positions, e.g. dispatch board blocks) are
    // allowed; they can't execute code. <style> elements still need the nonce.
    `style-src-attr 'unsafe-inline'`,
    `img-src 'self' blob: data:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    ...(isProd ? ["upgrade-insecure-requests"] : []),
  ];
  return directives.join("; ");
}

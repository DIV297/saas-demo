import { Barlow_Semi_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Brand typefaces, self-hosted by next/font (no request to Google at runtime).
 * CSS variables are named by role, not by font, so swapping a typeface only touches this file.
 *
 *  - Headings: Barlow Semi Condensed. Based on highway signage; utilitarian, fits field operations.
 *  - Body: IBM Plex Sans. Engineered, highly legible in dense tables.
 *  - Data: IBM Plex Mono. IDs, times and labels; pairs with Plex Sans.
 */
const heading = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading-face",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-face",
});

/** Apply to <html> so every font variable is available app-wide. */
export const fontVariables = [heading.variable, body.variable, mono.variable].join(" ");

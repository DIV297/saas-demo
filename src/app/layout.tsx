import type { Metadata } from "next";
import { connection } from "next/server";
import { BRAND } from "@/lib/constants";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { default: BRAND.name, template: `%s · ${BRAND.name}` },
  description: BRAND.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Render per request so every page gets a fresh CSP nonce (see proxy.ts).
  await connection();

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

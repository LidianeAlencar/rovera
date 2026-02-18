import "./globals.css";
import Providers from "./providers";
import { Geist, Goldman } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const goldman = Goldman({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geist.variable} ${goldman.variable} font-body bg-background text-foreground antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

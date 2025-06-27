import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "./providers";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hi - Vision",
  description: "HIV Treatment and Medical Services System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased pattern`}>
        <Providers>
          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

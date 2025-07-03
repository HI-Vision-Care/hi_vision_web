// app/layout.tsx
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/AuthContext"; // nếu có
import ChatWidget from "@/components/Chatbot/Gemini"; // nếu có
import { ConsultationModal } from "@/components/ConsultationModal";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hi - Vision",
  description: "HIV Treatment and Medical Services System",
};

// ✅ Đây là React component trả về JSX
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased pattern`}>
        <AuthProvider>
          <Providers>
            {children}
            <Toaster />
            <ConsultationModal/>
            <ChatWidget />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

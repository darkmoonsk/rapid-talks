import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthContext from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RapidTalks - Webchat",
  description: "RapidTalks is a webchat application for rapid communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}

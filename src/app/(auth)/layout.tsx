import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@/contexts/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RapidTalks - Autenticação",
  description: "Chatweb para conversas rápidas e seguras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-purple-1`}>
        <div className="bg-sticker fixed w-full h-full z-[-1]"/>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
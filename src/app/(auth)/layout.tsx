import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import ToasterContext from "@/contexts/ToasterContext";

const poppins = Poppins(
  {
    style: "normal",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
  }
);

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
      <body className={`${poppins.className} bg-purple-1`}>
        <div className="bg-sticker fixed w-full h-full z-[-1]"/>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
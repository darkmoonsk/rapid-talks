import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthContext from "@/contexts/AuthContext";
import Topbar from "@/components/Chats/Topbar";
import cn from "@/utils/cn";

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
      <body className={cn(inter.className, "bg-pink-100")}>
        <AuthContext>
          <Topbar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}

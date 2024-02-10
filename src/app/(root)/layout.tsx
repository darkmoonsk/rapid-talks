import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import AuthContext from "@/contexts/AuthContext";
import Topbar from "@/components/Chats/Topbar";
import cn from "@/utils/cn";
import MobileBar from "@/components/Chats/MobileBar";

const poppins = Poppins(
  {
    style: "normal",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
  }
);

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
      <body className={cn(poppins.className, "bg-pink-100")}>
        <AuthContext>
          <Topbar />
          {children}
          <MobileBar />
        </AuthContext>
      </body>
    </html>
  );
}

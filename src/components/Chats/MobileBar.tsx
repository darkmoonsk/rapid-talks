"use client";
import cn from "@/utils/cn";
import {
  Chat,
  ContactPageOutlined,
  Logout,
  LogoutOutlined,
} from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../UI/LogoutButton/LogoutButton";
import { useEffect, useState } from "react";

function MobileBar() {
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bottom-0 bg-white sticky px-5 py-3 flex items-center justify-between sm:hidden">
      <Link
        href="/chats"
        className={cn(
          pathname === "/chats" ? "text-red-1" : "",
          "flex gap-2 transition-all duration-200 ease-in-out hover:scale-105",
        )}>
        Chats
        <Chat sx={{ color: "#535353" }} />
      </Link>
      <Link
        href="/contatos"
        className={cn(
          pathname === "/contatos" ? "text-red-1" : "",
          "flex gap-1 transition-all duration-200 ease-in-out hover:scale-105",
        )}>
        Contatos
        <ContactPageOutlined sx={{ color: "#535353" }} />
      </Link>
      {windowWidth > 480 ? (
        <LogoutButton className="bg-green-1" onClick={handleLogout} />
      ) : (
        <button>
          <LogoutOutlined className="transition-all duration-200 ease-in-out hover:scale-110" sx={{ color: "#535353" }} />
        </button>
      )}

      <Link href="/perfil">
        <Image
          src={(user as any)?.profileImageUrl || "/images/person.png"}
          alt={user?.name || "Usuário"}
          width="48"
          height="48"
          className="
              w-11 h-11 rounded-full object-cover object-center shadow-lg
              hover:scale-110 transition-all duration-200 ease-in
            "
        />
      </Link>
    </nav>
  );
}

export default MobileBar;

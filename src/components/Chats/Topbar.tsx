"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";
import Logo from "../UI/Logo";
import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Topbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className=" 
      z-[1000] top-0 sticky px-10 pt-5 pb-12 flex items-center justify-around
      bg-gradient-to-b from-blue-1 to-transparent
    ">
      <Link href="/chats">
        <Logo />
      </Link>
      <nav className="flex items-center gap-8 px-2 max-sm:hidden font-semibold">
        <Link
          href="/chats"
          className={cn(
            pathname === "/chats" ? "text-red-1" : "",
            "transition-all duration-200 ease-in-out hover:scale-105",
          )}>
          Chats
        </Link>
        <Link
          href="/contatos"
          className={cn(
            pathname === "/contatos" ? "text-red-1" : "",
            "transition-all duration-200 ease-in-out hover:scale-105",
          )}>
          Contatos
        </Link>

        <button 
          onClick={handleLogout} 
          className="
            border border-transparent p-2 hover:border hover:border-gray-400 hover:shadow-md rounded-full
            transition-all duration-300 ease-in-out
          ">
          <Logout sx={{ color: "#535353" }} />
        </button>
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
    </header>
  );
}

export default Topbar;
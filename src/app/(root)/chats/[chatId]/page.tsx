"use client";
import ChatDetails from "@/components/Chats/ChatDetails";
import ChatList from "@/components/Chats/ChatList";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

function ChatPage() {
  const { chatId } = useParams();

  const {data: session } = useSession();
  const currentUser = session?.user;

  return (
    <main className="h-screen max-h-[700px] flex justify-around px-5 lg:px-20 gap-5 py-3 max-lg:gap-8">
      <div className="w-1/3 hidden lg:block">
        <ChatList currentChatId={chatId} />
      </div>
      <div className="w-2/3 max-lg:w-full">
        <ChatDetails chatId={chatId} />
      </div>
    </main>
  )
}

export default ChatPage;
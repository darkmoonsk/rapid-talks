"use client";
import ChatDetails from "@/components/Chats/ChatDetails";
import ChatList from "@/components/Chats/ChatList";
import IUser from "@/models/interfaces/IUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function ChatPage() {
  const { chatId } = useParams();



  const {data: session } = useSession();
  const currentUser = session?.user;

  const seenMessages = async () => {
    try {
      await axios.post(`/api/chats/${chatId}`, {
        currentUserId: (currentUser as IUser)?._id
          })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      seenMessages();
    }
    
  }, [currentUser, chatId]);

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
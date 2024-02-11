import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "../UI/Search/Search";
import ChatBox from "./ChatBox";
import IChat from "@/models/interfaces/IChat";
import IUser from "@/models/interfaces/IUser";
import Loader from "../UI/Loader/Loader";
import { pusherClient } from "@/lib/pusher";

interface ChatListProps {
  currentChatId?: string | string[];
}

function ChatList({ currentChatId }: ChatListProps) {
  const { data: session } = useSession();
  const currentUser = session?.user as IUser;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<IChat[]>([]);
  const [search, setSearch] = useState("");

  const getAllChats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        search !== ""
          ? `/api/users/${currentUser._id}/searchChat/${search}`
          : `/api/users/${currentUser._id}`,
      );
      const data = await res.data;
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const timerId = setTimeout(() => {
        getAllChats();
      }, 500);

      return () => {
        clearTimeout(timerId);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = async (updatedChat: IChat) => {
        setChats(allChats => allChats.map((chat) => {
            if(chat._id === updatedChat._id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
        }));
      };

      const handleNewChat = (newChat: IChat) => {
        setChats(allChats => [...allChats, newChat]);
      };

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser._id);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      }
    }
  },[currentUser]);

  return (
    <div className="h-full flex flex-col gap-5">
      <Search
        placeholder="Buscar chat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        
          <div className="flex-1 flex flex-col bg-white rounded-3xl py-4 px-3 
            gap-2 no-scrollbar overflow-y-scroll drop-shadow-lg
          ">
            {loading ? <Loader /> : (
              <>
                {chats?.map((chat: IChat, index) => (
                  <ChatBox chat={chat} key={index} currentUser={currentUser} currentChatId={currentChatId || ""} />
                ))}
              </>
            )}
          </div>
        
    </div>
  );
}

export default ChatList;

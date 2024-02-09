import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "../UI/Search/Search";
import ChatBox from "./ChatBox";
import IChat from "@/models/IChat";
import IUser from "@/models/IUser";
import Loader from "../UI/Loader";

function ChatList() {
  const { data: session } = useSession();
  const currentUser = session?.user as IUser;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
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

  return (
    <div className="h-screen flex flex-col gap-5 pb-20">
      <Search
        placeholder="Buscar chat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex flex-col bg-white rounded-3xl py-4 px-3 overflow-y-scroll">
          {chats?.map((chat: IChat, index) => (
            <ChatBox chat={chat} key={index} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatList;

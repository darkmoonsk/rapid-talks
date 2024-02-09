"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import IUser from "@/models/interfaces/IUser";
import { useSession } from "next-auth/react";
import IChat from "@/models/interfaces/IChat";
import Link from "next/link";
import Image from "next/image";
import { AddPhotoAlternate } from "@mui/icons-material";
import Loader from "../UI/Loader/Loader";

interface ChatDetailsProps {
  chatId: string | string[];
}

function ChatDetails({ chatId }: ChatDetailsProps) {
  const { data: session } = useSession();
  const currentUser = session?.user as IUser;

  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState<IChat>();
  const [otherMembers, setOtherMembers] = useState<IUser[]>();
  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      setLoading(true);
      console.log(chatId);
      const res = await axios.get(`/api/chats/${chatId}`);
      const data = res.data;
      setChat(data);
      setOtherMembers(
        data.members.filter((member: IUser) => member._id !== currentUser._id),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChatDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl">
      {loading ? <Loader /> : (
        <div className="flex items-center gap-4 px-8 py-3 text-body-bold">
          {chat?.isGroup ? (
            <>
              <Link href={`/chats/${chatId}/group-info`}>
                <Image
                  src={chat?.groupPhoto || "/images/group.png"}
                  alt="Foto do grupo"
                  width="72"
                  height="72"
                  className="w-[72px] h-[72px] rounded-full object-cover object-center"
                />
              </Link>
              <div className="">
                <p>
                  {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "} membros
                </p>
              </div>
            </>
          ) : (
            <>
              <Image
                src={otherMembers?.[0].profileImageUrl || "/images/person.png"}
                alt="Foto do contato"
                width="72"
                height="72"
                className="w-[72px] h-[72px] rounded-full object-cover object-center"
              />
              <div className="">
                <p>{otherMembers?.[0].username}</p>
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex-1 flex flex-col gap-5 bg-grey-2 p-5 no-scrollbar overflow-y-scroll"></div>
      <div className="w-full flex items-center justify-between px-7 py-3 rounded-3xl cursor-pointer bg-white">
        <div className="flex items-center w-full gap-4">
          <AddPhotoAlternate
            sx={{
              fontSize: "35px",
              color: "#535353",
              cursor: "pointer",
              "&:hover": { color: "pink" },
            }}
          />
          <input
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 bg-transparent outline-none border-none text-body-bold"
          />
        </div>
        <div>
          <Image 
            src="/images/send.jpg"
            alt="Enviar mensagem"
            width="40"
            height="40"
            className="w-[40px] h-[40px] rounded-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatDetails;

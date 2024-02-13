"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import IUser from "@/models/interfaces/IUser";
import { useSession } from "next-auth/react";
import IChat from "@/models/interfaces/IChat";
import Link from "next/link";
import Image from "next/image";
import { AddPhotoAlternate } from "@mui/icons-material";
import Loader from "../UI/Loader/Loader";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from "../Message/MessageBox";
import { pusherClient } from "@/lib/pusher";

function ChatDetails({ chatId }: any) {
  const { data: session } = useSession();
  const currentUser = session?.user as IUser;

  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({} as IChat);
  const [otherMembers, setOtherMembers] = useState<IUser[]>();
  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/chats/${chatId}`);
      const data = res.data;
      setChat(data);

      const members  =  data?.members?.filter((member: IUser) => member._id !== currentUser._id);
      setOtherMembers((prevMembers) => members);
      
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

  const sendText = async () => {
    if (text.trim() === "") {
      return;
    }

    try {
      const res = await axios.post("/api/messages", {
        chatId,
        currentUserId: currentUser._id,
        text,
      });

      if(res.status === 201) {
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendPhoto = async (result: any) => {
    try {
      const res = await axios.post("/api/messages", {
        chatId,
        currentUserId: currentUser._id,
        photo: result?.info?.secure_url,
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleMessage = async (newMessage: any) => {
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);
    
    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);

  // Movendo até a ultima/nova mensagem
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages])
  

  return loading ? <Loader /> : (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl drop-shadow-lg">
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
      
      
      {/*  Messagens do chat  */}
      <div className="flex-1 flex flex-col gap-5 bg-blue-1 bg-opacity-50 p-5 no-scrollbar overflow-y-scroll min-h-scree">
        {chat?.messages?.map((message, index) => (
          <MessageBox
            key={index}
            message={message}
            currentUser={currentUser}
          />
        ))}
        
        <div ref={bottomRef} />
      </div>

      <div className="w-full flex items-center justify-between px-7 py-3 rounded-3xl cursor-pointer bg-white">
        <div className="flex items-center w-full gap-4">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={sendPhoto}
            uploadPreset="lkrqrnff"
          >
            <AddPhotoAlternate
              sx={{
                fontSize: "35px",
                color: "#535353",
                cursor: "pointer",
                "&:hover": { color: "pink" },
              }}
            />
          </CldUploadButton>
          <input
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendText()}
            className="w-full placeholder:text-sm-bold p-2 bg-transparent outline-none border-none text-sm-bold"
          />
        </div>
        <div>
          <Image 
            onClick={sendText}
            src="/images/send.jpg"
            alt="Enviar mensagem"
            width="40"
            height="40"
            className="w-[40px] h-[40px] rounded-full object-cover object-center
              hover:scale-125 ease-in-out duration-300 cursor-pointer
            "
          />
        </div>
      </div>
    </div>
  )
}

export default ChatDetails;

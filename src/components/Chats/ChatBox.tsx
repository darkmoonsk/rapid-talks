import Image from "next/image";
import IChat from "@/models/IChat";
import IUser from "@/models/IUser"
import { format } from "date-fns";

interface ChatBoxProps {
  chat: IChat;
  currentUser: IUser;
}

function ChatBox({ chat, currentUser }: ChatBoxProps) {
  const ohterMembers = chat?.members?.filter((member) => member._id === currentUser._id)

  const lastMessage = chat?.messages?.length > 0 && chat?.messages[0]

  return (
    <div className="
      flex items-start justify-between p-4 
      transition-all duration-300 ease-in-out
      rounded-2xl cursor-pointer hover:bg-grey-2
    ">
      <div className="flex gap-3">
        {chat?.isGroup ? (
          <Image 
            src={chat?.groupPhoto || "/images/group.png"}
            width="72"
            height="72"
            alt="Imagem do grupo"
            className="w-[72px] h-[72px] rounded-full object-cover object-center"
          />
        ) : (
          <Image 
            src={ohterMembers[0].profileImageUrl || "/images/person.png"}
            width="72"
            height="72"
            alt="Imagem do contato"
            className="w-[72px] h-[72px] rounded-full object-cover object-center"
          />
        )}
        <div className="flex flex-col justify-center gap-2">
          {chat.isGroup ? (
            <p className="text-base-bold">{chat?.name}</p>
          ) : (
            <p className="text-base-bold">{ohterMembers[0]?.username}</p>
          )}
          {!lastMessage && <p className="text-body-bold">Comece a conversa</p>}
        </div>
      </div>

      <div>
        <p className="text-base-light text-grey-3">
         {!lastMessage && format(new Date(chat?.createdAt), "kk:mm")}
        </p>
      </div>
    </div>
  )
}

export default ChatBox;
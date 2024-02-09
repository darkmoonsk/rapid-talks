import Image from "next/image";
import { useRouter } from "next/navigation";
import IChat from "@/models/interfaces/IChat";
import IUser from "@/models/interfaces/IUser"
import { format } from "date-fns";
import cn from "@/utils/cn";

interface ChatBoxProps {
  chat: IChat;
  currentUser: IUser;
  currentChatId: string | string[];
}

function ChatBox({ chat, currentUser, currentChatId }: ChatBoxProps) {
  const router = useRouter();
  const otherMembers = chat?.members?.filter((member) => member._id !== currentUser._id).reverse();

  const lastMessage = chat?.messages?.length > 0 && chat?.messages[0]

  return (
      <div 
        className={cn(
          `flex items-start justify-between p-4 
          transition-all duration-300 ease-in-out
          rounded-2xl cursor-pointer hover:bg-grey-2`,
          chat._id === currentChatId ? "bg-grey-2" : ""
        )}
        onClick={() => router.push(`/chats/${chat._id}`)}
      >
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
              src={otherMembers[0].profileImageUrl || "/images/person.png"}
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
              <p className="text-base-bold">{otherMembers[0]?.username}</p>
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
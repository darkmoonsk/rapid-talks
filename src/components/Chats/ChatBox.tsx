import Image from "next/image";
import { useRouter } from "next/navigation";
import IChat from "@/models/interfaces/IChat";
import IUser from "@/models/interfaces/IUser";
import { format } from "date-fns";
import cn from "@/utils/cn";
import IMessage from "@/models/interfaces/IMessage";

interface ChatBoxProps {
  chat: IChat;
  currentUser: IUser;
  currentChatId: string | string[];
}

function ChatBox({ chat, currentUser, currentChatId }: ChatBoxProps) {
  const router = useRouter();
  const otherMembers = chat?.members
    ?.filter((member) => member._id !== currentUser._id)
    .reverse();

  // Busca as mensagens mais recentes
  let messages = chat?.messages;
  messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const lastMessage = chat?.messages?.length > 0 && messages[0];

  const seen = (lastMessage as IMessage)?.seenBy?.find(
    (member) => member._id !== currentUser._id,
  );

  return (
    <div
      className={cn(
        `flex items-start justify-between p-4 
          transition-all duration-300 ease-in-out
          rounded-2xl cursor-pointer hover:bg-grey-2`,
        chat._id === currentChatId ? "bg-grey-2" : "",
        
      )}
      onClick={() => router.push(`/chats/${chat._id}`)}
      >
      <div className="flex gap-3 z-30">
        {chat?.isGroup ? (
          <Image
            onClick={() => router.push(`/chats/${chat._id}/group-info`)}
            src={chat?.groupPhoto || "/images/group.png"}
            width="48"
            height="48"
            alt="Imagem do grupo"
            className="w-[48px] h-[48px] z-[] rounded-full object-cover object-center"
          />
        ) : (
          <Image
            src={otherMembers[0].profileImageUrl || "/images/person.png"}
            width="48"
            height="48"
            alt="Imagem do contato"
            className="w-[48px] h-[48px] rounded-full object-cover object-center"
          />
        )}

        <div className="flex flex-col justify-center gap-2">
          {chat.isGroup ? (
            <p className="text-base-bold">{chat?.name}</p>
          ) : (
            <p className="text-base-bold">{otherMembers[0]?.username}</p>
          )}
          {!lastMessage && <p className="text-body-bold">Comece a conversa</p>}

          {(lastMessage as IMessage)?.photo ? (
            (lastMessage as IMessage)?.sender?._id === currentUser._id ? (
              <p
                className={cn(
                  seen ? "text-small-mediun text-gray-3" : "text-small-bold",
                )}>
                Você enviou uma foto
              </p>
            ) : (
              <p
                className={cn(
                  seen ? "text-small-mediun text-gray-3" : "text-small-bold",
                )}>
                {(lastMessage as IMessage)?.sender?.username} enviou uma foto
              </p>
            )
          ) : (
            <p
              className={cn(
                "w-[120px] sm:w-[250px] truncate ",
                seen ? "text-small-mediun text-gray-3" : "text-small-bold",
              )}>
              {(lastMessage as IMessage)?.text}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-base-light text-grey-3">
          {!lastMessage
            ? format(new Date(chat?.createdAt), "HH:mm")
            : format(new Date(chat?.messages[0].createdAt), "HH:mm")}
        </p>
      </div>
    </div>
  );
}

export default ChatBox;

import IMessage from "@/models/interfaces/IMessage";
import IUser from "@/models/interfaces/IUser";
import { format, isValid } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  message: IMessage;
  currentUser: IUser;
}

function MessageBox({ message, currentUser }: MessageBoxProps) {
  const messageDate = new Date(message?.createdAt);

  return message?.sender?._id !== currentUser._id ? (
    <div className="flex gap-3 items-start">
      <Image
        src={message?.sender?.profileImageUrl || "/images/person.png"}
        alt="Imagem de perfil"
        width={40}
        height={40}
        className="w-auto h-auto rounded-full object-cover object-center"
      />
      <div className="flex flex-col gap-2">
        <p className="text-small-bold">
          {message?.sender?.username} &#160; &#183; &#160;{" "}
          {format(messageDate, "HH:mm")}
        </p>

        {message?.text ? (
          <p className="w-fit bg-white p-3 rounded-lg text-base-medium">
            {message?.text}
          </p>
        ) : (
          <Image
            src={message.photo}
            alt="Imagem"
            width={200}
            height={200}
            className="w-auto h-auto"
          />
        )}
      </div>
    </div>
  ) : (
    <div className="flex gap-3 items-start justify-end">
      <div className="flex flex-col gap-2 items-end">
        <p className="text-small-bold">{format(messageDate, "HH:mm")}</p>
        {message?.text ? (
          <p
            className="
              w-fit bg-purple-2 text-white p-3 rounded-lg text-base-medium
            ">
            {message?.text}
          </p>
        ) : (
          <Image
            src={message?.photo}
            alt="Imagem"
            width={200}
            height={200}
            className="rounded-md"
          />
        )}
      </div>
    </div>
  );
}

export default MessageBox;

import IMessage from "@/models/interfaces/IMessage";
import IUser from "@/models/interfaces/IUser";
import { format, isValid } from "date-fns";
import Image from "next/image";
import ModalImage from "../UI/ModalImage";

interface MessageBoxProps {
  message: IMessage;
  currentUser: IUser;
}

function MessageBox({ message, currentUser }: MessageBoxProps) {
  const messageDate = new Date(message?.createdAt);

  return message?.sender?._id !== currentUser._id ? (
    <div className="flex items-start justify-center">
      <div className="p-2">
        <Image
          src={message?.sender?.profileImageUrl || "/images/person.png"}
          alt="Imagem de perfil"
          width={48}
          height={48}
          className="w-[48px] h-[48px] rounded-full object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-small-bold">
          {message?.sender?.username} &#160; &#183; &#160;{" "}
          {format(messageDate, "HH:mm")}
        </p>

        {message?.text ? (
          <p className="w-fit bg-white p-3 rounded-lg text-base-medium">
            {message?.text}
          </p>
        ) : (
          <ModalImage imageSrc={message?.photo} />
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
          <ModalImage imageSrc={message?.photo} />
        )}
      </div>
    </div>
  );
}

export default MessageBox;

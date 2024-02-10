import IMessage from "./IMessage";
import IUser from "./IUser";

interface IChat {
  _id: string;
  members: IUser[];
  messages: IMessage[];
  isGroup: boolean;
  name: string;
  groupPhoto: string;
  createdAt: Date;
  lastMessageAt: Date;
}

export default IChat;

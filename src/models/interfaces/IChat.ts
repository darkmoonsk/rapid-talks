import IUser from "./IUser";

interface IChat {
  members: IUser[];
  messages: string[];
  isGroup: boolean;
  name: string;
  groupPhoto: string;
  createdAt: Date;
  lastMessageAt: Date;
}

export default IChat;

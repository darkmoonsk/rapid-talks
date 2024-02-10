import IUser from "./IUser";

export interface IMessage {
  _id: string;
  chat: string;
  sender: IUser;
  text: string;
  photo: string;
  createdAt: Date;
  seenBy: IUser[];
}

export default IMessage;
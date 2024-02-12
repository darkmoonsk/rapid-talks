import { connectToDB } from "@/database";
import Chat  from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";
import type { NextApiRequest } from "next";

export async function GET (req: NextApiRequest, { params }: any) {
  try {
    await connectToDB();

    const { userId, query } = params;
    
    const searchedChat = await Chat.find({
      members: userId,
      name: { $regex: query, $options: "i" }
    }).populate({
      path: "members",
      model: User
    }).populate({
      path: "messages",
      model: Message,
      populate: {
        path: "sender seenBy",
        model: User,
      }
    }).exec();

    return new Response(JSON.stringify(searchedChat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to search chat", { status: 500 });
  }
}
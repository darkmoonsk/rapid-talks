import { connectToDB } from "@/database";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";

interface Params {
  params: { chatId: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectToDB();

    const { chatId } = params;
    
    const chat = await Chat.findById(chatId).populate({
      path: "members",
      model: User
    }).populate({
      path: "messages",
      model: Message,
      populate: {
        path: "sender seenBy",
        model: User
      }
    }).exec();

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    return new Response("Failed to get chat details", { status: 500});
  }
}

export async function POST(req: Request, { params }: Params) {
  try {
    await connectToDB();

    const { chatId } = params;

    const { currentUserId } = await req.json();

    await Message.updateMany(
      { chat: chatId },
      { $addToSet: { seenBy: currentUserId } },
    ).populate({
      path: "sender seenBy",
      model: User
    }).exec();

    return new Response("Seen all messages by current user", { status: 200 });
  } catch (error) {
    return new Response("Failed to mark messages as seen", { status: 500});
  }
}
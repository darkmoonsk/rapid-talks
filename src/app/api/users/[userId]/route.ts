import { connectToDB } from "@/database";
import Chat from "@/models/Chat";
import User from "@/models/User";

export async function GET(req: Request, { params }: any) {
  try {
    await connectToDB();

    const { userId } = params;

    const allChats = await Chat.find({ members: userId })
      .sort({ lastMessageAt: -1 })
      .populate({ 
        path: "members", 
        model: User
      }).exec();

    return new Response(JSON.stringify(allChats), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all chats for current user", { status: 500 });
  }
}

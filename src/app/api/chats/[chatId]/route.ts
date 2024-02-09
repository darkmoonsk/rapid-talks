import { connectToDB } from "@/database";
import Chat from "@/models/Chat";
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
    }).exec();

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    return new Response("Failed to get chat details", { status: 500});
  }
}
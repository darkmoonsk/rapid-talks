import { connectToDB } from "@/database";
import Chat from "@/models/Chat";

export async function POST(req: Request, { params }: any) {
  try {
    await connectToDB();

    const { name, groupPhoto } = await req.json();

    const { chatId } = params;

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId, 
      { name, groupPhoto },
      { new: true }
    )

    return new Response(JSON.stringify(updatedGroupChat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update chat", { status: 500 });
  }
}
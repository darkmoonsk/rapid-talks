import { connectToDB } from "@/database";
import Chat  from "@/models/Chat";
import User from "@/models/User";

export async function GET (req: Request, { params }: any) {
  try {
    await connectToDB();

    const { userId, query } = params;

    const searchedChat = await Chat.find({
      members: userId,
      name: { $regex: query, $options: "i" }
    }).populate({
      path: "members",
      model: User
    }).exec();

    return new Response(JSON.stringify(searchedChat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to search chat", { status: 500 });
  }
}
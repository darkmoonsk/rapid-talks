import { connectToDB } from "@/database";
import User from "@/models/User";

export async function GET(req: Request, { params }: any ) {
  try {
    await connectToDB();
    const { query } = params;

    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    return new Response(JSON.stringify(searchedContacts), { status: 200 });
  } catch (error) {
    return new Response("Failed to search contact", { status: 500 });
  }
}
import { connectToDB } from "@/database";
import User from "@/models/User";

export async function GET (req: Request, res: Response) {
  try {
    await connectToDB();

    const allUsers = await User.find();

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
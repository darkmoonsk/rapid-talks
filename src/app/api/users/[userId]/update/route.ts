import { connectToDB } from "@/database";
import User from "@/models/User";

interface PostProps {
  params: {
    userId: string;
  };

}

export async function POST(req: Request, { params }: PostProps, res: Response) {
  const { userId } = params;
  

  try {
    await connectToDB();

    const { username, profileImageUrl } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        profileImageUrl,
      },
      { new: true }
      );

      return new Response(JSON.stringify(updatedUser), { status: 200 })
  } catch (error) {
    console.error(error);
    return new Response("Failed to update user", { status: 500 })
  }
}
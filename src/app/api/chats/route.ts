import { connectToDB } from "@/database";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chat";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();

    //Dados para criar um grupo de chat
    const { currentUserId, members, isGroup, name, groupPhoto } = await req.json();

    const query = isGroup ? {
      isGroup,
      name,
      members: [currentUserId, ...members],
      groupPhoto
    } : {
      members: {
        $all: [currentUserId, ...members],
        $size: 2
      },
    }

    let chat = await Chat.findOne(query);

    if (!chat) {
      chat = await new Chat(
        isGroup ? query : { members: [currentUserId, ...members]}
      );

      await chat.save();

      const updateAllMembers = chat.members.map(async (memberId: string) => {
          await User.findByIdAndUpdate(memberId, {
          $addToSet: { chats: chat._id }
          },     
          { new: true }
        );
      })

      Promise.all(updateAllMembers);
      
      // Aciona um evento Pusher para cada membro notificando sobre o novo chat
      chat.members.forEach((memberId: string) => {
        pusherServer.trigger(memberId.toString(), "new-chat", chat);
      });
    }


    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create chat", { status: 500 });
  }
}
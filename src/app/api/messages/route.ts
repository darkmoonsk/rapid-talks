import { connectToDB } from "@/database";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { chatId, currentUserId, text, photo } = await req.json();

    const currentUser = await User.findById(currentUserId);

    const newMessage = await Message.create({
      chat: chatId,
      sender: currentUser,
      text,
      photo,
      seenBy: currentUserId,
    })

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    ).populate({
      path: "messages",
      model: Message,
      populate: { path: "sender seenBy", model: "User" }
    }).populate({
      path: "members",
      model: "User",
    }).exec();

    // Aciona um evento Pusher de mensagem para um chat específico
    await pusherServer.trigger(chatId, "new-message", newMessage);

    // Aciona o evento Pusher para atualizar a lista de chats
    const lastMessage = await updatedChat.messages[updatedChat.messages.length - 1];
    updatedChat.members.forEach(async (member: any) => {
      try {
        await pusherServer.trigger(member._id.toString(), "update-chat", {
          _id: chatId,
          messages: [lastMessage],
        });
      } catch (error) {
        console.error("Failed to trigger update-chat event", error);
      }
    });

    return new Response(JSON.stringify(newMessage), { status: 201 })
  } catch (error) {
    console.error("Failed to create a new message", error);
    return new Response("Failed to create a new message", { status: 500 })
  }
}
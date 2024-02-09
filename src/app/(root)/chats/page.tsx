"use client";
import ChatList from "@/components/Chats/ChatList";
import Contacts from "@/components/Chats/Contacts";

function ChatsPage() {
  return (
    <main className="h-screen max-h-[700px] w-full flex justify-around gap-5 px-10 py-3 max-lg:gap-8">
      <div className="w-1/3 max-md:w-full max-lg:w-1/2">
        <ChatList />
      </div>
      <div className="w-[750px] h-full max-md:hidden max-lg:w-1/2 ">
        <Contacts />
      </div>
    </main>
  );
}

export default ChatsPage;

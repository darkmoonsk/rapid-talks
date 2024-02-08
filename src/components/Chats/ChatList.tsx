import Search from "../UI/Search/Search";

function ChatList() {
  return (
    <div className="h-screen flex flex-col gap-5 pb-20">
      <Search placeholder="Buscar chat..." />
    </div>
  );
}

export default ChatList;

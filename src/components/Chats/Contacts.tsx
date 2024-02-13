"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loader from "../UI/Loader/Loader";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import Image from "next/image";
import Button from "../UI/Button/Button";
import Search from "../UI/Search/Search";
import { useRouter } from "next/navigation";
import IUser from "@/models/interfaces/IUser";

function Contacts() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<IUser[]>();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data: session } = useSession();
  const currentUser = session?.user as IUser;

  const getContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        search !== "" ? `/api/users/search-contact/${search}` : "/api/users",
      );
      const data = await res.data;

      setContacts(
        data.filter(
          (contact: IUser) => contact._id !== (currentUser as IUser)._id,
        ),
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      const timerId = setTimeout(() => {
        getContacts();
      }, 500); // Aguarda  500ms após o último evento de digitação

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, search]);

  // Selecionando os contatos
  const [selectedContacts, setSelectedContacts] = useState<IUser[]>([]);
  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact: IUser) => {
    // Encontra o índice do contato na lista de selecionados
    const isContactSelected = selectedContacts.find((c) => c._id === contact._id);
  
    if (isContactSelected) {
      // Se o contato já está selecionado, remova-o
      setSelectedContacts((prev) => prev.filter((c, i) => c._id !== contact._id));
    } else {
      // Se o contato não está selecionado, adicione-o
      setSelectedContacts((prev) => [...prev, contact]);
    }
  };

  // Criando um novo chat
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    if (selectedContacts.length === 1) {
      setChatName(selectedContacts[0].username);
    } else {
      setChatName("");
    }
  }, [selectedContacts]);

  const createChat = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/chats/", {
        currentUserId: currentUser?._id,
        members: selectedContacts.map((contact: IUser) => contact._id),
        isGroup,
        name: chatName,
      });
  
      if(res.status === 200) {
        const chat =  res.data;
        router.push(`/chats/${chat._id}`);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full drop-shadow-lg flex-col gap-5">
      <Search
        placeholder="Buscar contato..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex gap-7 h-full items-start max-lg:flex-col">
          <div className="w-1/2 h-full no-scrollbar overflow-y-scroll max-lg:w-full flex flex-col gap-5 bg-white rounded-3xl py-5 px-8">
            <p className="text-body-bold">Marque ou desmarque</p>
            {contacts?.map((contact: IUser, index) => (
              <div
                key={index}
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => handleSelect(contact)}>
                {selectedContacts.find((c) => c._id === contact._id ) ? (
                  <RadioButtonChecked sx={{ color: "pink" }} />
                ) : (
                  <RadioButtonUnchecked />
                )}
                <Image
                  src={contact.profileImageUrl || "/images/person.png"}
                  alt={contact.username}
                  width={48}
                  height={48}
                  className="w-[48px] h-[48px] rounded-full object-cover object-center"
                />
                <p className="text-base-bold">{contact.username}</p>
              </div>
            ))}
          </div>
          <div className="max-w-[330px] w-full">
            {isGroup && (
              <>
                <div className="flex flex-col gap-3">
                  <p className="text-body-bold">Nome do grupo</p>
                  <input
                    placeholder="Digite o nome do grupo..."
                    className="bg-white rounded-2xl px-5 py-3 outline-none"
                    value={chatName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setChatName(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-3 mt-5">
                  <p className="text-body-bold">Membros</p>
                  <div className="flex flex-wrap gap-3 mb-5 ">
                    {selectedContacts.map((contact, index) => (
                      <p
                        key={index}
                        className="text-base-bold p-2 bg-pink-1 rounded-lg">
                        {contact.username}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}
            <Button 
              disabled={selectedContacts.length === 0}
              onClick={createChat}
            >
              COMEÇAR UM NOVO CHAT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;

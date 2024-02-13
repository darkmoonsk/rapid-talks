"use client";
import { GroupOutlined } from "@mui/icons-material";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader/Loader";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import IChat from "@/models/interfaces/IChat";

function GroupInfoPage() {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});

  const router = useRouter();

  const { chatId } = useParams();

  const getChatDetails = async () => {
    try {
      const res = await axios.get(`/api/chats/${chatId}`);
      const data = res.data
      setChat(data);
      setLoading(false);
      reset({
        name: data?.name,
        groupPhoto: data?.groupPhoto,     
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    if(chatId) {
      getChatDetails();
    }
  }, [chatId]);

  interface Inputs {
    name: string;
    groupPhoto: string;
  }

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleUploadPhoto = (result: any) => {
    setValue("groupPhoto", result?.info?.secure_url);
  };

  const updateGroupChat = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/chats/${chatId}/update`,
        data,
      );

      if(res.status === 200) {
        router.push(`/chats/${chatId}`)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-16 pb-8 flex flex-col gap-11 items-center justify-center">
      <h1 className="text-h3-bold">Edite as informações do Grupo</h1>

      <form className="flex flex-col gap-10 mx-2" onSubmit={handleSubmit(updateGroupChat)}>
        <div className="input">
          <input
            {...register("name", {
              required: "Nome do grupo é obrigatório",
              minLength: {
                value: 3,
                message: "Nome do grupo deve ter no mínimo 3 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Nome do grupo deve ter no máximo 30 caracteres",
              },
            })}
            type="text"
            placeholder="Nome do grupo"
            className="input-field"
          />
          <GroupOutlined sx={{ color: "#535353" }} />
        </div>

        {errors?.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}

        <div className="flex items-center gap-5">
          <Image
            src={
              watch("groupPhoto") ||
              "/images/group.png"
            }
            alt="Grupo"
            width="128"
            height="128"
            className="w-[128px] h-[128px] rounded-full object-cover object-center shadow-lg"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUploadPhoto}
            uploadPreset="lkrqrnff">
            <p className="text-body-bold">Faça o upload de uma nova foto</p>
          </CldUploadButton>
        </div>
        
        <div className="flex flex-wrap gap-3">
            {(chat as IChat)?.members?.map((member: any, index) => (
              <p 
                key={index}
                className="text-base-bold p-2 bg-pink-1 rounded-lg"
              >
                {member.username}    
              </p>
            ))}
        </div>

        <Button type="submit">Salvar mudanças</Button>
      </form>
    </div>
  );
}

export default GroupInfoPage;

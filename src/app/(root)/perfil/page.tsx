"use client";
import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import Loader from "@/components/UI/Loader";
import axios from "axios";

function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(true);

  interface Inputs {
    username: string;
    profileImageUrl: string;
  }

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (user) {
      reset({
        username: (user as IUser)?.username,
        profileImageUrl: (user as IUser)?.profileImageUrl,
      });
    }
    setLoading(false);
  }, [user, reset]);

  const handleUploadPhoto = (result: any) => {
    setValue("profileImageUrl", result?.info?.secure_url);
  };

  const updateUser = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/users/${(user as IUser)?._id}/update`,
        data,
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-16 flex flex-col gap-11 items-center justify-center">
      <h1 className="text-h3-bold">Edite o seu perfil</h1>

      <form className="flex flex-col gap-10 mx-2" onSubmit={handleSubmit(updateUser)}>
        <div className="input">
          <input
            {...register("username", {
              required: "Nome de usuário é obrigatório",
              minLength: {
                value: 3,
                message: "Nome de usuário deve ter no mínimo 3 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Nome de usuário deve ter no máximo 30 caracteres",
              },
            })}
            type="text"
            placeholder="Nome de Usuário"
            className="input-field"
          />
          <PersonOutline sx={{ color: "#535353" }} />
        </div>

        {errors?.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <div className="flex items-center gap-5">
          <Image
            src={
              watch("profileImageUrl") ||
              (user as any)?.profileImageUrl ||
              "/images/person.png"
            }
            alt="Usuário"
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
        <Button type="submit">Salvar mudanças</Button>
      </form>
    </div>
  );
}

export default ProfilePage;

"use client";
import Link from "next/link";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Logo from "./UI/Logo";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Form {
  type: "register" | "login";
}

interface Inputs {
  email: string;
  password: string;
  username: string;
}

function Form({ type }: Form) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    if(type === "register") {
      const response = await axios.post("/api/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      if(response.status === 201) {
        toast.success("Usuário cadastrado com sucesso!");
        router.push("/");
      }

      if(response.status === 409) {
        toast.error("Usuário já cadastrado!");
      }
      
      if(response.status === 500 || response.status === 400) {
        toast.error("Erro ao cadastrar usuário! tente outra vez mais tarde.");
      }
    }

    if(type === "login") {
      const response = await signIn("credentials", {
        username: data.email, 
        password: data.password,
        redirect: false,
      });
      if(response?.ok) {
        toast.success("Usuário logado com sucesso!");
        router.push("/chats");
      }

      if(response?.error) {
        toast.error("E-mail ou senha inválidos!");
      }
    }

  };

  return (
    <div className="auth">
      <div className="content">
        <Logo />
        <form className="form" onSubmit={handleSubmit(onSubmit)}> 
          {type === "register" && (
            <>
              <div className="input">
                <input
                  defaultValue=""
                  {...register("username", {
                    required: "O Nome de Usuário é obrigatório!",
                    minLength: {
                      value: 3,
                      message:
                        "O Nome de Usuário deve ter no mínimo 3 caracteres!",
                    },
                    maxLength: {
                      value: 30,
                      message:
                        "O Nome de Usuário deve ter no máximo 30 caracteres!",
                    },
                  })}
                  type="text"
                  placeholder="Nome de Usuário"
                  className="input-field"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </>
          )}
          <>
            <div className="input">
              <input
                defaultValue=""
                {...register("email", {
                  required: "O E-mail é obrigatório!",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "E-mail inválido!",
                  },
                })}
                type="email"
                placeholder="E-mail"
                className="input-field"
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </>

          <>
            <div className="input">
              <input
                defaultValue=""
                {...register("password", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter no mínimo 8 caracteres!",
                  },
                  maxLength: {
                    value: 20,
                    message: "A senha deve ter no máximo 128 caracteres!",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,128}$/,
                    message:
                      "A senha deve conter pelo menos uma letra maiúscula e minúscula, um número e um caractere especial!",
                  },
                })}
                type="password"
                placeholder="Senha"
                className="input-field"
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </>

          <button type="submit" className="button">
            {type === "register" ? "Cadastrar" : "Entrar"}
          </button>

          {type === "register" ? (
            <p>
              <Link className="link" href="/">Já tem uma conta? Entrar</Link>
            </p>
          ) : (
            <p>
              <Link className="link" href="/register">Não tem uma conta? Cadastrar</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;

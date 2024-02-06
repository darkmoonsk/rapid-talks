import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/database";
import { compare } from "bcrypt";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username && !credentials?.password) {
          throw new Error("Por favor digite o seu e-mail e senha");
        }

        await connectToDB();
        const user = await User.findOne({ email: credentials?.username });

        if (!user || !user?.password) {
          throw new Error("Usuário não encontrado");
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Email ou senha invalidos");
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      const databaseUser = await User.findOne({ email: session.user?.email });
      if (session.user) {
        session.user = {
          ...session.user,
          ...databaseUser._doc,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

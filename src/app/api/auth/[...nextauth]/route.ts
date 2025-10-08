// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google" // 👈 adiciona isso
import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    // 👇 Adiciona o provider do Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 👇 Mantém o login com e-mail e senha
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        if (!user) throw new Error("Usuário não encontrado")

        const senhaValida = await compare(
          credentials!.password,
          user.hashedPassword || ""
        )

        if (!senhaValida) throw new Error("Senha incorreta")

        return user
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

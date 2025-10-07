// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter" 

import { prisma } from "./prisma" // Importa seu cliente Prisma configurado
// import bcrypt from 'bcryptjs'; // Remova se usar apenas OAuth

// Definição das opções de autenticação
export const authOptions: NextAuthOptions = {
  // 1. O Adaptador para o Banco de Dados (Prisma)
  adapter: PrismaAdapter(prisma),

  // 2. Provedor de Credenciais (E-mail/Senha)
  // **Atenção:** Se você usa apenas OAuth (Google/Github), pode remover este bloco.
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        // Simulação de busca do usuário e checagem de senha
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (user) {
          // **ATENÇÃO:** Você deve comparar a senha usando bcrypt (como você tem instalado)
          // Para o MVP: Simplesmente retorna o usuário. Para produção, use bcrypt!
          // const isMatch = await bcrypt.compare(credentials.password, user.password as string);
          // if (isMatch) return user;

          // Apenas para o MVP de teste (Senha simples: 123456):
          if (credentials.password === "123456") {
            return user
          }
        }
        return null // Credenciais inválidas
      },
    }),
    // Adicione outros provedores OAuth (Google, Github) aqui, se for usar.
  ],

  // 3. Configurações da Sessão e Páginas
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Redireciona usuários não logados para esta rota
  },

  // 4. Callbacks (para adicionar o tipo de usuário ao token)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Encontra o usuário do banco para pegar o userType (PESCADOR/TRAVESSANTE)
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { userType: true },
        })

        token.userType = dbUser?.userType
      }
      return token
    },
    async session({ session, token }) {
      if (token.userType) {
        session.user.userType = token.userType as "PESCADOR" | "TRAVESSANTE"
      }
      return session
    },
  },
}

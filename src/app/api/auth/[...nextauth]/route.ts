import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// (Opcional) Google depois:
// import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Sessão via JWT (não precisa tabela Session p/ credenciais, mas mantemos para futuro)
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    Credentials({
      name: "Email e Senha",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user || !user.password) return null

        const ok = await compare(credentials.password, user.password)
        if (!ok) return null

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email,
          image: user.image ?? undefined,
        }
      },
    }),

    // Ative quando tiver as envs:
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],

  pages: {
    signIn: "/login", // vamos criar essa página
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id // id no token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        ;(session.user as any).id = token.sub // id na sessão
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }

// src/types/next-auth.d.ts

import "next-auth"
import { DefaultSession } from "next-auth"
import "@auth/prisma-adapter"

// 1. Estende o Objeto Session (usado no useSession e getServerSession)
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      userType: "PESCADOR" | "TRAVESSANTE" // <--- CORREÇÃO AQUI
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }
}

// 2. Estende o Token JWT (usado no auth.ts)
declare module "next-auth/jwt" {
  interface JWT {
    userType?: "PESCADOR" | "TRAVESSANTE" // <--- CORREÇÃO AQUI
  }
}

// 3. Estende o AdapterUser do Prisma (usado no auth.ts)
declare module "@auth/prisma-adapter" {
  interface AdapterUser {
    userType: "PESCADOR" | "TRAVESSANTE" // <--- CORREÇÃO AQUI
  }
}

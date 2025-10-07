// src/app/providers/SessionProvider.tsx
"use client" // Deve ser um Client Component!

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import React from "react"

// Renomeado para evitar conflito com o nome de importação
export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}

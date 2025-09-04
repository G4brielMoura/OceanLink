"use client"

import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p className="text-center mt-10">Carregando...</p>
  }

  if (!session) {
    return (
      <p className="text-center mt-10">
        Você precisa estar logado para acessar o Dashboard.
      </p>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bem-vindo, {session.user?.name}</h1>
      <p className="mt-4">Email: {session.user?.email}</p>
    </div>
  )
}

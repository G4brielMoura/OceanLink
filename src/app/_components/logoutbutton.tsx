// src/app/_components/logoutbutton.tsx

"use client"

import { signOut } from "next-auth/react"
import React from "react"

/**
 * Componente que lida com a saída (logout) do usuário,
 * limpando a sessão do Next-Auth e redirecionando para a página de login.
 */
export default function LogoutButton() {
  const handleLogout = async () => {
    // A função signOut remove o cookie da sessão e, por padrão, redireciona.
    // O 'callbackUrl' define para onde ele deve redirecionar após o sucesso.
    await signOut({
      callbackUrl: "/login",
    })
  }

  return (
    <button
      onClick={handleLogout}
      // Você pode substituir este estilo por um componente de UI (ex: Shadcn Button)
      style={{
        padding: "10px 15px",
        backgroundColor: "#dc3545", // Cor vermelha para "Sair"
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Sair
    </button>
  )
}

// src/app/login/page.tsx
"use client"

import { useState } from "react"
// Importa os subcomponentes da pasta _components/login/
import LoginForm from "./_components/login-form"
import RegisterForm from  "./_components/register-form"

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true) // Começa na tela de Login

  const activeTabClass = "border-b-4 border-blue-600 text-blue-600"
  const inactiveTabClass = "text-gray-500 hover:text-gray-700"

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* CABEÇALHO COM ABAS */}
        <div className="flex border-b">
          <button
            onClick={() => setIsLoginView(true)}
            className={`w-1/2 py-4 text-lg font-bold transition-colors ${
              isLoginView ? activeTabClass : inactiveTabClass
            }`}
          >
            Entrar (Login)
          </button>

          <button
            onClick={() => setIsLoginView(false)}
            className={`w-1/2 py-4 text-lg font-bold transition-colors ${
              !isLoginView ? activeTabClass : inactiveTabClass
            }`}
          >
            Cadastre-se (Registro)
          </button>
        </div>

        {/* CONTEÚDO DO FORMULÁRIO */}
        <div className="p-8">
          {isLoginView ? (
            // Exibe o formulário de Login
            <LoginForm />
          ) : (
            // Exibe o formulário de Cadastro, e, após sucesso, volta para Login
            <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

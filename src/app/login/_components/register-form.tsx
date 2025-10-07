// src/app/login/_components/register-form.tsx
"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"

interface RegisterFormProps {
  // Função para voltar para a tela de Login após o sucesso
  onSwitchToLogin: () => void
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // userType é o campo crítico de usabilidade
  const [userType, setUserType] = useState<"PESCADOR" | "TRAVESSANTE" | "">("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validação de Usabilidade: garantir que o tipo de usuário foi selecionado
    if (!userType) {
      setError(
        "Por favor, selecione seu tipo de usuário (Pescador ou Travessante)."
      )
      return
    }

    setIsLoading(true)

    // CHAMA SUA API ROUTE DE CADASTRO
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, userType }),
    })

    setIsLoading(false)
    const data = await res.json()

    if (res.ok) {
      setSuccess(
        "Cadastro realizado com sucesso! Você será redirecionado para a tela de Login."
      )
      // Volta para a aba de Login
      setTimeout(onSwitchToLogin, 1500)
    } else {
      // Exibe a mensagem de erro da API (ex: "e-mail já em uso")
      setError(data.message || "Falha no cadastro. Verifique os dados.")
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800">Novo Cadastro</h2>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
          {success}
        </div>
      )}

      {/* Tipo de Usuário - Ponto Crítico de Usabilidade! */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Você é um: <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="PESCADOR"
              checked={userType === "PESCADOR"}
              onChange={() => setUserType("PESCADOR")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Pescador</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="TRAVESSANTE"
              checked={userType === "TRAVESSANTE"}
              onChange={() => setUserType("TRAVESSANTE")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Travessante</span>
          </label>
        </div>
      </div>

      {/* Campos de Dados */}
      <div>
        <label
          htmlFor="register-name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome Completo
        </label>
        <input
          id="register-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          disabled={isLoading}
        />
      </div>
      <div>
        <label
          htmlFor="register-email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <input
          id="register-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          disabled={isLoading}
        />
      </div>
      <div>
        <label
          htmlFor="register-password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          id="register-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
        disabled={isLoading}
      >
        {isLoading ? (
          "Registrando..."
        ) : (
          <>
            <UserPlus className="w-5 h-5 mr-2" />
            Cadastrar
          </>
        )}
      </button>
    </form>
  )
}

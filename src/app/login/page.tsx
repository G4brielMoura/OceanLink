"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    if (res?.error) setError("Credenciais inválidas")
    else window.location.href = "/dashboard" // 👈 Redireciona pro dashboard após login
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e5e5e5]">
      <div className="bg-[#202124] w-full max-w-lg rounded-xl shadow-lg p-10 text-white">
        {/* Logo personalizada */}
        <div className="flex justify-center mb-6">
          <Image src="/svg/logo.svg" alt="Logo" width={60} height={60} />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-semibold text-center mb-2">Fazer login</h1>
        <p className="text-gray-300 text-center mb-8">
          com sua conta OceanLink. Essa conta ficará disponível para acessar o
          sistema.
        </p>

        {/* Formulário */}
        <form onSubmit={handleLogin}>
          {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

          <input
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 mb-4 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 mb-4 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botão login */}
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {/* Login com Google */}
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full mt-4 bg-red-600 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Entrar com Google
        </button>

        {/* Links extras */}
        <div className="flex justify-between text-sm text-blue-400 mt-6">
          <button
            type="button"
            onClick={() => {
              // 👇 aqui você pode direcionar para a rota de recuperação de senha
              console.log("Rota para recuperação de senha")
            }}
          >
            Esqueceu seu e-mail?
          </button>

          <button
            type="button"
            onClick={() => {
              // 👇 aqui você pode direcionar para a página de criação de conta
              console.log("Rota para criar conta")
            }}
          >
            Criar conta
          </button>
        </div>

        {/* Rodapé */}
        <div className="flex justify-center mt-10 gap-6 text-gray-400 text-xs">
          {/* 👇 cada um desses pode ser substituído por um Link com rota depois */}
          <button onClick={() => console.log("Alterar idioma")}>
            Português (Brasil)
          </button>
          <button onClick={() => console.log("Ajuda")}>Ajuda</button>
          <button onClick={() => console.log("Privacidade")}>
            Privacidade
          </button>
          <button onClick={() => console.log("Termos")}>Termos</button>
        </div>
      </div>
    </main>
  )
}

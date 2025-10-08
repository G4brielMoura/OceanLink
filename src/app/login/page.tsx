"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (session) router.push("/dashboard")
  }, [session, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (form.password !== form.confirm) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Erro ao registrar")
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/dashboard",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          Ocean Link
        </h1>

        <AnimatePresence mode="wait">
          {isRegister ? (
            <motion.form
              key="register"
              onSubmit={handleRegister}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirmar senha"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-medium transition-all"
              >
                {loading ? "Registrando..." : "Registrar"}
              </button>

              <p className="text-gray-500 text-sm mt-4">
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-sky-500 hover:underline"
                >
                  Entrar
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-gray-600 mb-8">
                Acesse sua conta para visualizar o dashboard
              </p>

              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg shadow-sm transition-all w-full"
              >
                <FcGoogle size={24} />
                <span className="text-gray-700 font-medium">
                  Entrar com o Google
                </span>
              </button>

              <p className="text-gray-500 text-sm mt-6">
                ou{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-sky-500 hover:underline"
                >
                  criar uma conta
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-gray-400 text-sm mt-8">
          © {new Date().getFullYear()} Ocean Link — Todos os direitos
          reservados.
        </p>
      </motion.div>
    </div>
  )
}

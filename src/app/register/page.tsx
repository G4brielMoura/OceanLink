"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FiEye, FiEyeOff } from "react-icons/fi"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [msg, setMsg] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)

    if (form.password !== form.confirmPassword) {
      setMsg("As senhas não coincidem!")
      return
    }

    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setMsg("✅ Cadastro realizado com sucesso!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } else {
      setMsg(data.error || "Erro no cadastro")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#202124]">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#202124] w-full max-w-xl rounded-2xl shadow-lg p-10 text-white relative"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-semibold mb-2">
                Criar uma conta OceanLink
              </h1>
              <p className="text-gray-400 mb-6">Insira seu nome</p>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="flex-1 p-3 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Sobrenome (opcional)"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="flex-1 p-3 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Avançar
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-semibold mb-2">Criar uma senha</h1>
              <p className="text-gray-400 mb-6">
                Use pelo menos 8 caracteres com letras, números e símbolos
              </p>

              {msg && <p className="mb-3 text-sm text-red-500">{msg}</p>}

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 mb-4 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Senha */}
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full p-3 pr-10 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Confirmar Senha */}
              <div className="relative flex-1 mt-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar senha"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="w-full p-3 pr-10 rounded border border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 rounded-lg text-blue-400 hover:bg-gray-800 transition"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Carregando..." : "Confirmar"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </main>
  )
}

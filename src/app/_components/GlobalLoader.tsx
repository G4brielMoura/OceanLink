"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Loader inicial (quando o site abre)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Loader em mudanças de rota
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a3d62] text-white z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Conteúdo principal do loader */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Desktop: exibe nome + spinner + texto */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <motion.span
                  className="absolute inset-0 rounded-full border-4 border-t-transparent border-white"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                />
              </div>
              <p className="mt-4 text-sm text-white/70">
                Carregando conteúdo...
              </p>
            </div>

            {/* Mobile: mostra apenas o spinner menor */}
            <div className="flex sm:hidden flex-col items-center">
              <div className="relative w-8 h-8">
                <motion.span
                  className="absolute inset-0 rounded-full border-4 border-t-transparent border-white"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

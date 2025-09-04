"use client"

import { motion } from "framer-motion"
import Image from "next/image"
export default function EmManutencao() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      {/* Robô animado */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 0, -10] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image
          src="/images/robot-broken.svg" // Arquivo dentro de /app/images/
          alt="Robô em manutenção"
          width={240}
          height={240}
          className="drop-shadow-md"
        />
      </motion.div>

      {/* Texto principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-10 mb-4">
      🚧Manutenção
      </h1>

      {/* Subtexto */}
      <p className="text-lg text-gray-600 max-w-md">
        Esta seção do site está passando por melhorias e logo estará disponível.
      </p>
    </main>
  )
}

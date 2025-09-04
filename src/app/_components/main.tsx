"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function Main() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: "-20% 0px -20% 0px",
  })

  const texts = ["Pescadores", "Travessantes",]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={ref}
      className="min-h-screen flex select-none flex-col items-center justify-center pb-20 px-3 text-center bg-[#e5e5e5] text-[#0a3d62] "
    >
      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 80, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="flex flex-col items-center user-select: none; justify-center w-full"
          >
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] leading-tight user-select: none; font-[IT Hoves Pro Trial] font-bold">
              O C E A N L I N K
            </h1>

            <h2 className="mb-3 user-select: none; leading-none text-[clamp(1.5rem,4vw,2.5rem)] font-medium">
              Suporte{" "}
              <span className="text-gray-400 user-select: none; inline-block min-w-[1px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={texts[index]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0 }}
                  >
                    {texts[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <p className="text-[clamp(1rem,2.5vw,2rem)]  max-w-[900px] text-gray-400 user-select: none; tracking-tight leading-tight font-light text-center mb-6">
              A Oceanlink é a plataforma que facilita a vida de quem vive do
              mar. Oferecemos suporte completo para pescadores e travessantes,
              com cadastro seguro, regulação transparente e soluções que
              garantem confiança em cada travessia e em cada pesca.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center user-select: none; justify-center">
              <AnimatedButton href="mailto:gabmoura.dev@gmail.com">
                Cadastre-se
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default function AnimatedButton({
  children,
  href,
  download = false,
}: {
  children: React.ReactNode
  href: string
  download?: boolean
}) {
  return (
    <motion.a
      whileHover="hover"
      initial="initial"
      href={href}
      download={download}
      target={download ? "_blank" : undefined}
      rel={download ? "noopener noreferrer" : undefined}
      className="relative group inline-block px-8 py-3 border border-[#0a3d62]/20 select-none backdrop-blur-lg text-[#0a3d62] uppercase tracking-wide text-sm sm:text-base rounded-full overflow-hidden transition-all duration-300"
    >
      {/* Fundo animado */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 select-none opacity-30 group-hover:opacity-80 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out"
        variants={{
          initial: { scale: 0, opacity: 0 },
          hover: { scale: 2.5, opacity: 0.6 },
        }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 0 }}
      />

      {/* Conteúdo */}
      <span className="select-none relative z-10 font-semibold">
        {children}
      </span>
    </motion.a>
  )
}

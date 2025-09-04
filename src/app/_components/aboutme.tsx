"use client"

import { motion, Variants } from "framer-motion"
import React from "react"

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
    },
  },
}

const About = () => {
  return (
    <motion.section
      variants={sectionVariant}
      initial="hidden"
      animate="show"
      className="relative z-10 w-full min-h-screen select-none px-8 py-24 bg-[#0a3d62] text-[#c4c4c4] flex items-center justify-center"
    >
      <div className="max-w-4xl w-full space-y-5">
        {/* Marca sutil */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="text-[20vw] leading-none select-none font-serif uppercase tracking-tighter pointer-events-none"
        >
          About
        </motion.div>

        {/* Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-left space-y-6"
        >
          <h2 className="text-5xl md:text-6xl pointer-events-none select-none text-[#c4c4c4] font- leading-16">
            Olá, Somos Na Ocealink
            <br />
          </h2>
          <p className="text-lg md:text-xl leading-relaxed font-light select-none pointer-events-none tracking-wide text-[#f2f1e8]/80">
            Acreditamos que o mar é mais do que um meio de trabalho: é um modo
            de vida. Por isso, criamos uma plataforma dedicada a apoiar
            pescadores e travessantes, oferecendo ferramentas de cadastro,
            regulação e suporte que garantem mais segurança, transparência e
            organização no dia a dia.
          </p>
        </motion.div>

        {/* Linha animada */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="origin-left h-[1px] pointer-events-none select-none bg-[#f2f1e8]/20 w-full"
        />

        {/* Frase final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center italic pointer-events-none select-none text-[#f2f1e8]/50 text-base tracking-widest"
        >
          "Oceanlink: conectando pessoas, fortalecendo o mar."
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About

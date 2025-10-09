"use client"

import { motion, useAnimation, useInView, Variants } from "framer-motion"
import { useEffect, useRef } from "react"

const hardSkills = [
  { title: "Cadastro oficial" },
  { title: "Catálogo de Espécie" },
  { title: "Gestão de horários" },
  { title: "Suporte técnico" },
  { title: "OceanLink Company" },
  { title: "Informações" },
]

const fadeInVariant = (direction: "left" | "right"): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
})

const Section = ({
  title,
  description,
  skills,
  isSoft = true,
}: {
  title: string
  description: string
  skills: { title: string }[]
  isSoft?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden")
  }, [isInView, controls])

  return (
    <section
      ref={ref}
      className="w-full mt-20 sm:mt-28 md:mt-40 select-none overflow-x-hidden py-8 md:py-2 px-4 sm:px-6 lg:px-20"
    >
      <div className="max-w-5xl mx-auto mb-6">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={fadeInVariant("left")}
          className="text-3xl md:text-5xl font-semibold text-[#0a3d62] mb-2 tracking-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={fadeInVariant("right")}
          className="text-sm md:text-base text-[#0a3d62] max-w-xl leading-relaxed"
        >
          {description}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {skills.map((skill, index) => {
          const direction = index % 2 === 0 ? "left" : "right"

          return (
            <motion.div
              key={skill.title}
              initial="hidden"
              animate={controls}
              variants={fadeInVariant(direction)}
              transition={{ delay: index * 0.08 }}
              className="bg-[#0a3d62] hover:bg-[#0a3d62de] text-white select-none px-5 py-4 rounded-xl border border-[#0a3d62] shadow-sm hover:shadow-md transition-all duration-400"
            >
              <p className="text-sm md:text-base font-light tracking-wide leading-tight">
                {skill.title}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

const SoftSkill = () => {
  return (
    <div className="bg-[#f2f3f5] w-full mb-30 select-none">
      <Section
        title="Pescadores"
        description="Os pescadores dedicam-se com maestria à arte de capturar o peixe fresco, fruto de trabalho e tradição.
Sua pesca sustenta comunidades inteiras e abastece mercados com sabor e vida do mar."
        skills={hardSkills}
        isSoft={false}
      />
    </div>
  )
}

export default SoftSkill

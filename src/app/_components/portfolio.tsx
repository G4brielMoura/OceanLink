"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  SiTailwindcss,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiFigma,
} from "react-icons/si"
import type { JSX } from "react"

type CaseData = {
  title: string
  description: string
  tag: string
  images: string[]
  link?: string
  techs?: string[]
  pronto?: boolean
}

type CaseProps = CaseData & {
  reverse: boolean
  pronto: boolean
}

const cases: CaseData[] = [
  {
    title: "HYBRID PORTFÓLIO",
    description:
      "O Hybrid Portfolio é uma experiência interativa única que combina dois mundos: design e desenvolvimento. Com um único clique, você alterna entre as versões do portfólio — cada modo apresenta conteúdos, projetos, timelines e experiências personalizadas de acordo com a perspectiva escolhida.",
    tag: "Portfólio Profissional",
    images: [
      "/project/hybrid1.jpg",
      "/project/hybrid2.jpg",
      "/project/hybrid3.jpg",
    ],
    link: "https://hybridgraphicdesignanddevelopmentportfolio.vercel.app/",
    pronto: true,
    techs: ["tailwind", "nextjs", "react", "typescript", "figma"],
  },

]

export default function Portfolio() {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="w-full py-10 px-6 bg-[#e5e5e5] text-[#0a3d62] md:pt-45"
      >
        <div className="max-w-screen-xl select-none mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex flex-col md:flex-row justify-between items-center "
          >
            <h1 className="text-4xl select-none text-[#0a3d62] text-left mb-4 tracking-tight mt-20 font-semibold w-full md:text-5xl block md:hidden">
              Portfólio
            </h1>
            <p className="text-base md:text-lg pb-7 text-gray-400 max-w-2xl select-none leading-relaxed w-full block md:hidden">
              Projetos desenvolvidos com foco em usabilidade, performance e
              design funcional.
            </p>
          </motion.div>

          <div className="flex flex-col gap-32 w-full">
            {cases.map((item, index) => (
              <CaseComponent
                key={index}
                {...item}
                reverse={index % 2 !== 0}
                pronto={item.pronto ?? true}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

function CaseComponent({
  title,
  description,
  images,
  reverse,
  link,
  techs = [],
  pronto,
}: CaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  const iconMap: Record<string, JSX.Element> = {
    tailwind: (
      <SiTailwindcss className="text-gray-300 hover:text-[#38BDF8] transition-all duration-300 ease-in-out" />
    ),
    nextjs: (
      <SiNextdotjs className="text-gray-300 hover:text-gray-600 transition-all duration-300 ease-in-out" />
    ),
    react: (
      <SiReact className="text-gray-300 hover:text-[#61DBFB] transition-all duration-300 ease-in-out" />
    ),
    typescript: (
      <SiTypescript className="text-gray-300 hover:text-[#3178C6] transition-all duration-300 ease-in-out" />
    ),
    figma: (
      <SiFigma className="text-gray-300 hover:text-[#272727] transition-all duration-300 ease-in-out" />
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col md:flex-row items-center gap-8 h-auto ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-full  md:w-1/2 h-auto aspect-square md:aspect-auto md:h-[60vh] overflow-hidden rounded-4xl">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 w-full h-full"
            animate={{ opacity: currentIndex === idx ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={src}
              alt={`Slide ${idx}`}
              fill
              className="object-cover rounded-4xl"
              priority={idx === 0}
            />
          </motion.div>
        ))}

        <button
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
        >
          ‹
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
        >
          ›
        </button>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center h-full">
        <h2 className="text-[4vw] tracking-wide leading-none">{title}</h2>
        <p className="text-gray-400 text-lg leading-relaxed tracking-wide py-2">
          {description}
        </p>

        <Link
          href={pronto ? link ?? "/" : "/maintenance"}
          target={pronto ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="mb-4 inline-block w-fit px-6 py-2 bg-white text-black font-semibold rounded-full text-sm transition hover:scale-105 hover:bg-gray-200"
        >
          {pronto ? "Ver Projeto" : "Em Manutenção"}
        </Link>

        {techs.length > 0 && (
          <div className="flex gap-4 mt-2 text-2xl">
            {techs.map((tech) => (
              <motion.div
                key={tech}
                title={tech.toUpperCase()}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer"
              >
                {iconMap[tech]}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

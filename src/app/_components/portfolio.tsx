"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"


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
    title: "Camarão",
    description:
      "Símbolo das marés maranhenses, o camarão é um dos principais produtos da pesca e exportação. Presente em pratos tradicionais, é fonte de sustento para inúmeras famílias de pescadores.",
    tag: "Portfólio Profissional",
    images: ["/project/cam1.svg", "/project/cam2.svg", "/project/cam3.svg"],

    pronto: true,
  },
  {
    title: "Pescada-Amarela",
    description:
      "Peixe nobre e muito apreciado na culinária maranhense, a pescada-amarela possui carne branca, macia e sabor suave. É uma das espécies mais pescadas na costa do estado e muito valorizada tanto no mercado local quanto na exportação.",
    tag: "Portfólio Profissional",
    images: ["/project/pes1.svg", "/project/pes2.svg", "/project/pes3.svg"],

    pronto: true,
  },
  {
    title: "Pargo",
    description:
      "Conhecido por sua cor avermelhada e carne firme, o pargo é bastante procurado em restaurantes e feiras. Sua pesca é tradicional entre os pescadores maranhenses, que dominam as melhores épocas e pontos para capturá-lo.",
    tag: "Portfólio Profissional",
    images: ["/project/rose1.svg", "/project/rose2.svg", "/project/rose3.svg"],

    pronto: true,
  },
  {
    title: "Cavala",
    description:
      "De corpo alongado e sabor marcante, a cavala é ideal para grelhados e defumados. É uma espécie comum nas águas costeiras do Maranhão e tem grande importância econômica para os pescadores.",
    tag: "Portfólio Profissional",
    images: ["/project/cav1.svg", "/project/cav2.svg", "/project/cav3.svg"],

    pronto: true,
  },
  {
    title: "Tainha",
    description:
      "Peixe de escamas prateadas e carne saborosa, a tainha é encontrada em abundância nas regiões litorâneas. Além do consumo fresco, suas ovas são consideradas uma iguaria em várias partes do Brasil.",
    tag: "Portfólio Profissional",
    images: ["/project/tai1.svg", "/project/tai2.svg", "/project/tai3.svg"],

    pronto: true,
  },
  {
    title: "Serra",
    description:
      "Ágil e forte, o peixe-serra é famoso pelo sabor intenso e por ser muito utilizado em pratos típicos e peixadas maranhenses. É um dos preferidos dos pescadores por seu valor comercial.",
    tag: "Portfólio Profissional",
    images: ["/project/serr1.svg", "/project/serr2.svg", "/project/serr3.svg"],

    pronto: true,
  },
  {
    title: "Cação",
    description:
      "Espécie de pequeno tubarão, o cação é amplamente consumido na culinária local. Sua carne firme é usada em moquecas, ensopados e grelhados, sendo um produto constante nas feiras de peixe da região.",
    tag: "Portfólio Profissional",
    images: ["/project/tub1.svg", "/project/tub2.svg", "/project/tub3.svg"],

    pronto: true,
  },
  {
    title: "Carapeba",
    description:
      "Peixe de pequeno porte, muito presente nas águas rasas e manguezais maranhenses. Apesar do tamanho, tem grande aceitação pelo sabor e pela textura delicada da carne.",
    tag: "Portfólio Profissional",
    images: ["/project/cara1.svg", "/project/cara2.svg", "/project/cara3.svg"],

    pronto: true,
  },
  {
    title: "Corvina",
    description:
      "Com corpo prateado e carne de sabor suave, a corvina é uma das preferidas dos consumidores. É bastante encontrada na costa maranhense e muito usada em pratos tradicionais como caldeiradas e moquecas.",
    tag: "Portfólio Profissional",
    images: ["/project/cov1.svg", "/project/cov2.svg", "/project/cov3.svg"],

    pronto: true,
  },
  {
    title: "Bagre",
    description:
      "Muito conhecido nas águas do Maranhão, o bagre-prata é um peixe de carne branca e textura delicada, apreciado em várias receitas típicas. Além do consumo local, é amplamente comercializado e representa importante fonte de renda para as comunidades pesqueiras da região.",
    tag: "Portfólio Profissional",
    images: ["/project/bagre1.svg", "/project/bagre2.svg", "/project/bagre3.svg"],

    pronto: true,
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
        className="w-full bg-[#e5e5e5] text-[#0a3d62] px-6 
             pt-24 sm:pt-20 md:pt-45 py-10"
      >
        <div className="max-w-screen-xl select-none mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex flex-col md:flex-row justify-between items-center "
          ></motion.div>

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
  pronto,
}: CaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  

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

        

      </div>
    </motion.div>
  )
}

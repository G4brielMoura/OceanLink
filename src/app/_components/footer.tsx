"use client"

import { motion } from "framer-motion"
import { FaInstagram,  FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa"
import Link from "next/link"

const socialLinks = [
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/gabrielmouradev",
    color: "#E1306C",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/gabrielmouradev",
    color: "#1DA1F2",
  },
  {
    icon: <FaGithub />,
    href: "https://github.com/G4brielMoura",
    color: "#565555",
  },
]

// Nav links agora com rota explícita
const navLinks = [
  { label: "HOME", href: "/" },
  { label: "QUEM SOMOS", href: "/about" },
  { label: "SERVIÇOS", href: "/skills" },
  { label: "SUPORTE", href: "/contato" },
  { label: "CONTA", href: "/projetos" },
  // Exemplo adicional: { label: "ROOM", href: "/room" },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#e5e5e5] text-[#0a3d62] px-6 sm:px-12 "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Esquerda: Logo, Redes e Copyright */}
        <div className="space-y-6 flex-1">
          <div className="flex items-center text-[#0a3d62] text-lg font-semibold">
            <span className="text-2xl">@</span>gabrielmoura.com
          </div>

          <div className="flex gap-4">
            {socialLinks.map(({ icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a3d62] hover:scale-110 transition duration-300"
                style={{ color: "black" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                aria-label={
                  href.startsWith("mailto:") ? "Email" : `Link para ${href}`
                }
              >
                <div className="text-xl">{icon}</div>
              </a>
            ))}
          </div>

          <p className="text-sm text-[#0a3d62] font-normal pt-4">© 2025.</p>
        </div>

        {/* Direita: Navegação */}
        <div className="hidden md:flex flex-col gap-2 text-sm items-end">
          {navLinks.map(({ label, href }, idx) => (
            <Link
              href={href}
              key={idx}
              className="relative group w-fit text-[#0a3d62] hover:text-[#0a3d6262] transition"
            >
              {label}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#0a3d62] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}

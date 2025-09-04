"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "QUEM SOMOS" },
  { href: "/skills", label: "SERVIÇOS" },
  { href: "/contato", label: "SUPORTE" },
  { href: "/projetos", label: "CONTA" },

  // 🔑 Novas rotas de autenticação
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "REGISTRO" },
  { href: "/dashboard", label: "DASHBOARD" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 100) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50 bg-[#e5e5e5] px-6 py-5  flex items-center justify-between text-white"
    >
      {/* Logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        <Image src="/svg/logo.svg" alt="Logo" width={50} height={50} />
      </motion.div>

      {/* Botão menu mobile */}
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden z-50"
          aria-label="Abrir menu"
        >
          <Menu size={32} />
        </button>
      )}
      {/* Navegação desktop */}
      <nav className="hidden md:flex gap-8 text-[18px] font-bold uppercase text-gray-400">
        {links.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="relative group transition text-[#0a3d62] hover:text-gray-400"
            >
              <span className={`${isActive ? "text-gray-400" : ""}`}>
                {label}
              </span>

              {/* Linha animada */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#0a3d62] transition-all duration-300 ease-in-out 
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </Link>
          )
        })}
      </nav>

      {/* Navegação mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-10 text-2xl font-semibold uppercase z-40"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
              aria-label="Fechar menu"
            >
              <X size={36} />
            </button>

            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`transition hover:scale-105 ${
                  pathname === href ? "text-white" : "text-gray-300"
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

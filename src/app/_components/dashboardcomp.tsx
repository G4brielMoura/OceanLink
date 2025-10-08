"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { signOut, useSession } from "next-auth/react"
import MapaPesca from "./MapaPesca"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts"

import {
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaAnchor,
  FaLink,
} from "react-icons/fa"
import { IoFishOutline, IoWaterSharp, IoCalendarSharp } from "react-icons/io5"
import { IconType } from "react-icons/lib"

// ------------------------------
// Tipagens
// ------------------------------
interface StatCardProps {
  icon: IconType
  title: string
  value: string
  description: string
  color: string
}

interface NavItem {
  href: string
  label: string
  icon: IconType
}

// ------------------------------
// Subcomponentes
// ------------------------------
const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  description,
  color,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
    className={`bg-white p-4 sm:p-5 rounded-2xl shadow-sm border-t-4 ${color} hover:shadow-lg transition`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <Icon className="w-6 h-6 text-gray-400" />
    </div>
    <p className="text-2xl sm:text-3xl font-extrabold text-[#0a3d62] mt-3">
      {value}
    </p>
    <p className="text-xs sm:text-sm text-gray-500 mt-1">{description}</p>
  </motion.div>
)

// ------------------------------
// Dados de exemplo (gerais)
// ------------------------------
const monthlyVolumeData = [
  { month: "Jan", ton: 105 },
  { month: "Fev", ton: 98 },
  { month: "Mar", ton: 115 },
  { month: "Abr", ton: 130 },
  { month: "Mai", ton: 142 },
  { month: "Jun", ton: 135 },
  { month: "Jul", ton: 150 },
  { month: "Ago", ton: 162 },
  { month: "Set", ton: 145 },
  { month: "Out", ton: 170 },
  { month: "Nov", ton: 160 },
  { month: "Dez", ton: 155 },
]

const speciesShare = [
  { name: "Pescada", value: 28 },
  { name: "Corvina", value: 22 },
  { name: "Bagre", value: 19 },
  { name: "Gurijuba", value: 17 },
  { name: "Outros", value: 14 },
]

const priceTrend = [
  { month: "Jan", price: 22 },
  { month: "Fev", price: 23 },
  { month: "Mar", price: 25 },
  { month: "Abr", price: 26 },
  { month: "Mai", price: 27 },
  { month: "Jun", price: 29 },
  { month: "Jul", price: 28 },
  { month: "Ago", price: 30 },
  { month: "Set", price: 31 },
  { month: "Out", price: 33 },
  { month: "Nov", price: 32 },
  { month: "Dez", price: 34 },
]

const COLORS = ["#0ea5e9", "#0284c7", "#7c3aed", "#f59e0b", "#6b7280"]

// ------------------------------
// Sidebar
// ------------------------------
const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [{ href: "/", label: "Início", icon: FaHome }]
  const isActive = (href: string) => pathname === href

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const userName = session?.user?.name || session?.user?.email || "Visitante"

  return (
    <>
      <div className="hidden md:flex flex-col justify-between bg-[#0a3d62] text-white w-64 min-h-screen p-6 sticky top-0 shadow-xl">
        <div>
          <h2 className="text-3xl font-bold mb-6 border-b border-white/20 pb-3">
            OceanLink LTDA
          </h2>
          <nav className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive(href)
                    ? "bg-blue-600 font-semibold shadow-lg"
                    : "hover:bg-blue-700/40"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-white/20 pt-4">
          <p className="text-sm text-gray-300 mb-3">
            Bem-vindo, <span className="font-semibold">{userName}</span>
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-300 hover:text-red-100 hover:bg-red-700/40 p-3 rounded-lg transition-all"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#0a3d62] text-white z-50 flex items-center justify-between px-5 py-3 shadow-md">
        <h2 className="text-lg font-bold">⚓ Painel da Pesca</h2>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] left-0 w-full bg-[#0a3d62] text-white shadow-lg z-40"
          >
            <div className="flex flex-col space-y-2 p-3">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive(href)
                      ? "bg-blue-600 font-semibold shadow-lg"
                      : "hover:bg-blue-700/40"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
              <div className="border-t border-white/20 pt-2">
                <p className="text-sm text-gray-300 mb-2">
                  Bem-vindo, <span className="font-semibold">{userName}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-300 hover:text-red-100 hover:bg-red-700/40 p-3 rounded-lg transition-all"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

// ------------------------------
// Conteúdo Principal
// ------------------------------
const MainContent: React.FC = () => {
  return (
    <main className="flex-1 mt-[56px] md:mt-0 p-4 md:p-8 space-y-8">
      <p className="text-gray-600 text-sm md:text-base">
        Este painel apresenta indicadores gerais sobre a pesca brasileira,
        reunindo dados aproximados e educativos sobre produção, espécies e
        sustentabilidade no setor pesqueiro nacional.
      </p>

      {/* Estatísticas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={IoFishOutline}
          title="Produção Nacional"
          value="1.5M t"
          description="Estimativa anual de pescado no Brasil"
          color="border-blue-500"
        />
        <StatCard
          icon={IoWaterSharp}
          title="Índice Ambiental"
          value="87%"
          description="Regiões com boa qualidade de água"
          color="border-emerald-500"
        />
        <StatCard
          icon={IoCalendarSharp}
          title="Espécies em Temporada"
          value="12"
          description="Atualmente liberadas para pesca"
          color="border-yellow-500"
        />
        <StatCard
          icon={FaChartLine}
          title="Crescimento Sustentável"
          value="+8,3%"
          description="Comparado ao último ano"
          color="border-indigo-500"
        />
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Volume Mensal de Pesca
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyVolumeData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="ton"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Distribuição por Espécie
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={speciesShare}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {speciesShare.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tendência de preços */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Tendência de Preços (R$/kg)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#0284c7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mapa */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Mapa de Pesca</h3>
        <MapaPesca />
      </div>

      {/* Dicas e informações */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FaAnchor /> Dicas e Boas Práticas
        </h3>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>
            🌤️ <b>Melhores períodos:</b> março a julho, com mares calmos e boa
            concentração de cardumes.
          </li>
          <li>
            🐟 <b>Espécies mais comuns:</b> Pescada, Corvina, Bagre e Gurijuba.
          </li>
          <li>
            ⚠️ <b>Evite o defeso:</b> confira as espécies e períodos protegidos
            no{" "}
            <Link
              href="https://www.gov.br/ibama"
              target="_blank"
              className="text-blue-600 underline"
            >
              site do IBAMA
            </Link>
            .
          </li>
          <li>
            🧭 <b>Segurança marítima:</b> use coletes, mantenha rádio ligado e
            comunique o plano de rota.
          </li>
        </ul>
      </div>

      {/* Links úteis */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FaLink /> Recursos e Catálogos
        </h3>
        <p className="text-gray-600">
          Consulte o{" "}
          <Link href="/catalogo" className="text-blue-600 underline">
            Catálogo de Espécies
          </Link>{" "}
          para conhecer os principais peixes da costa brasileira e suas
          temporadas.
        </p>
        <p className="text-gray-600">
          Fontes oficiais:{" "}
          <Link
            href="https://www.gov.br/ibama"
            target="_blank"
            className="text-blue-600 underline"
          >
            IBAMA
          </Link>{" "}
          e{" "}
          <Link
            href="https://www.marinha.mil.br/"
            target="_blank"
            className="text-blue-600 underline"
          >
            Marinha do Brasil
          </Link>
          .
        </p>
      </div>
    </main>
  )
}

// ------------------------------
// Componente Principal
// ------------------------------
const DashboardBody: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen overflow-x-hidden">
      <Sidebar />
      <MainContent />
    </div>
  )
}

export default DashboardBody

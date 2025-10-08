"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Carrega o mapa dinamicamente, somente no lado do cliente
const MapaPescaClient = dynamic(
  () => import("../_components/MapaPescaClient"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-80 text-gray-500">
        Carregando mapa...
      </div>
    ),
  }
)

export default function MapaPesca() {
  return (
    <Suspense fallback={<div>Carregando mapa...</div>}>
      <MapaPescaClient />
    </Suspense>
  )
}

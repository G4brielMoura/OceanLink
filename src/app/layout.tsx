import "leaflet/dist/leaflet.css"
import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"
import SessionProvider from "@/providers/SessionProvider"
import PageWrapper from "./_components/pagewrapper"
import GlobalLoader from "./_components/GlobalLoader" // ✅ Import do Loader global

export const metadata: Metadata = {
  title: "OceanLink",
  description: "Plataforma Para Pescadores e Travessantes.",
  metadataBase: new URL("https://softwareengineergm.vercel.app/"),
  keywords: [
    "Suporte Pescaria",
    "Pescaria Vida",
    "Regulação Documentos",
    "Peixes Pescaria",
    "Maranhão",
    "Região Ma",
  ],
  authors: [
    {
      name: "OceanLink | Company",
      url: "https://ocean-link-iema.vercel.app/",
    },
  ],
  openGraph: {
    title: "Ocean | Link | Plataforma",
    description:
      "Ajuda Na Pesca, Das Baixadas Ma.",
    url: "https://ocean-link-iema.vercel.app/",
    siteName: "OceanLInk Company",
    images: [
      {
        url: "/icon/logo.png",
        width: 1200,
        height: 630,
        alt: "Imagem de capa OceanLink",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        {/* ✅ Loader global em toda a aplicação */}
        <GlobalLoader />

        {/* ✅ Providers e wrapper de página */}
        <SessionProvider>
          <PageWrapper>{children}</PageWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}

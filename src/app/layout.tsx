// src/app/layout.tsx

import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"
// Importa o SessionProvider que você criou (chamado NextAuthProvider no seu código)
import NextAuthProvider from "@/providers/SessionProvider"

// --- Importa seus componentes de Layout ---
// Assumindo que eles estão em src/app/_components
import { Header } from "././_components/header"
import Footer  from "././_components/footer"
import PageWrapper from "./_components/pagewrapper" 

// Sua Metadata de Portfólio (mantida)
export const metadata: Metadata = {
  title: "GM | DEV",
  description: "Portfólio profissional de Software Engineer.",
  metadataBase: new URL("https://softwareengineergm.vercel.app/"),
  keywords: [
    "Portfólio",
    "Software Engineer",
    "Next.js",
    "GM|DEVELOPER",
    "Desenvolvimento",
    "Dev",
  ],
  authors: [
    {
      name: "Gabriel Moura|Dev",
      url: "https://softwareengineergm.vercel.app/",
    },
  ],
  openGraph: {
    title: "GM | DEVELOPER | Portfólio",
    description:
      "Portfólio com foco em Desenvolvimento Software, e performance.",
    url: "https://gabrielmouradesigner.vercel.app",
    siteName: "GM|DEVELOPER",
    images: [
      {
        url: "/images/icon_gm.svg",
        width: 1200,
        height: 630,
        alt: "Imagem de capa GMCreative",
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
      <body>
        {/* 1. Envolve a aplicação no Provider de Autenticação */}
        <NextAuthProvider>
          {/* 2. Inclui o Header */}
          <Header />

          {/* 3. Usa o PageWrapper para aplicar o layout principal */}
          <PageWrapper>
            {/* 4. Renderiza o conteúdo da página atual (Dashboard, Login, etc.) */}
            {children}
          </PageWrapper>

          {/* 5. Inclui o Footer */}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  )
}

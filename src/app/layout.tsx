import "leaflet/dist/leaflet.css"
import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"
import SessionProvider from "@/providers/SessionProvider"
import PageWrapper from "./_components/pagewrapper"
import GlobalLoader from "./_components/GlobalLoader" // ✅ Import do Loader global

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

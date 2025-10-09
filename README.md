# 🌊 OceanLink — Plataforma com Next.js, Prisma e NextAuth

## 📖 Sobre o Projeto
**OceanLink** é uma aplicação moderna construída com **Next.js (App Router)**, **Prisma ORM**, e **NextAuth.js**.  
O objetivo é oferecer uma base sólida para aplicações seguras e escaláveis, com autenticação completa (credenciais e OAuth), banco de dados MySQL e arquitetura organizada por módulos.

---

<p align="center">
  <img alt="Hybrid Graphic Design and Development Portfolio" src=".github/photo_projeto.svg" width="100%">
</p>

---

## ⚙️ Tecnologias Principais

| Tecnologia | Função |
|-------------|--------|
| **Next.js 15** | Framework React com renderização híbrida e App Router |
| **TypeScript** | Tipagem estática e segurança no código |
| **Prisma ORM** | Mapeamento objeto-relacional para MySQL |
| **NextAuth.js** | Autenticação com suporte a credenciais e provedores OAuth |
| **Tailwind CSS** | Estilização rápida e responsiva |
| **Framer Motion** | Animações fluidas e performáticas |
| **Lucide Icons** | Ícones modernos para UI |
| **Recharts** | Visualização de dados com gráficos reativos |

---

## 🧩 Estrutura de Pastas

```plaintext
📦 oceanlink/
┣ 📂 prisma/
┃ ┣ 📜 schema.prisma        # Modelos e configuração do Prisma ORM
┃ ┗ 📂 migrations/          # Histórico de migrações do banco
┣ 📂 src/
┃ ┣ 📂 app/
┃ ┃ ┣ 📂 api/
┃ ┃ ┃ ┣ 📂 auth/
┃ ┃ ┃ ┃ ┗ 📂 [...nextauth]/ # Rotas do NextAuth.js
┃ ┃ ┃ ┗ 📂 register/        # Rota de registro de usuário
┃ ┃ ┣ 📂 components/        # Componentes reutilizáveis (UI)
┃ ┃ ┣ 📂 about/             # Página "Sobre"
┃ ┃ ┣ 📂 catalogo/          # Página de catálogo
┃ ┃ ┣ 📂 dashboard/         # Painel administrativo
┃ ┃ ┣ 📂 login/             # Página de login
┃ ┃ ┣ 📂 maintenance/       # Página de manutenção
┃ ┃ ┗ 📂 skills/            # Página de habilidades
┃ ┣ 📂 lib/                 # Configurações utilitárias (ex: prisma.ts)
┃ ┣ 📂 providers/           # Contextos e provedores globais
┃ ┗ 📂 types/               # Tipagens auxiliares
┣ 📜 next.config.ts         # Configurações do Next.js
┣ 📜 tsconfig.json          # Configuração do TypeScript
┣ 📜 package.json           # Dependências e scripts
┗ 📜 README.md              # (este arquivo)

```
## 🔑 Autenticação com NextAuth + Prisma

O sistema de autenticação usa o adaptador oficial do Prisma:

* import { PrismaAdapter } from "@auth/prisma-adapter"
* import NextAuth from "next-auth"
* import CredentialsProvider from "next-auth/providers/credentials"
* import { prisma } from "@/lib/prisma"

---

## Suporta:

- Login com credenciais (email/senha)

- Login com provedores OAuth (Google, GitHub, etc.)

- Sessões persistentes armazenadas no banco de dados

---

```## schema.prisma

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id             String   @id @default(cuid())
  name           String?
  email          String?  @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  accounts       Account[]
  sessions       Session[]
}

model Account {
  id                String   @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  access_token      String?
  refresh_token     String?
  expires_at        Int?
  user User @relation(fields: [userId], references: [id])
  @@unique([provider, providerAccountId])
}

model Session {
  id            String   @id @default(cuid())
  sessionToken  String   @unique
  userId        String
  expires       DateTime
  user          User @relation(fields: [userId], references: [id])
}

model VerificationToken {
  identifier String
  token      String @unique
  expires    DateTime
  @@unique([identifier, token])
}
```
---

## 🚀 Scripts de Desenvolvimento

- Comando	Descrição

- npm run dev -	Inicia o servidor Next.js em modo desenvolvimento
- npm run build - Cria o build de produção
- npm run start - Inicia o servidor em produção
- npx prisma studio -	Abre o painel visual do Prisma
- npx prisma migrate dev - Executa e cria migrações no banco

---

## 🧠 Fluxo de Autenticação

* Usuário se registra via /api/register

* Os dados são salvos em User com senha hash (bcrypt)

* NextAuth valida as credenciais ou usa OAuth

* Sessão persistida em Session

* Usuário autenticado acessa o Dashboard

---

## 💡 Boas Práticas

- Sempre mantenha o .env fora do versionamento (.gitignore)

- Rode npx prisma generate após alterar o schema.prisma

- Prefira Server Components no App Router

- Utilize async/await em todas as operações Prisma

---

## ⚙️ Variáveis de Ambiente

- Crie um arquivo .env na raiz com:

* DATABASE_URL="mysql://usuario:senha@localhost:3306/oceanlink"
* NEXTAUTH_SECRET="seu-segredo-seguro"
* NEXTAUTH_URL="http://localhost:3000"

---

## 🧪 Dependências Principais

- Pacote	Função

* @auth/prisma-adapter	Integra NextAuth com Prisma
* @next-auth/prisma-adapter	Versão alternativa compatível
* @prisma/client	Cliente Prisma
* next-auth	Sistema de autenticação
* bcryptjs	Hash e verificação de senha
* tailwindcss	Estilização moderna e rápida
* framer-motion	Animações suaves
* react-leaflet	Mapas interativos
* recharts	Gráficos e visualizações de dados

---

### 📦 Instalação e Execução

# Instalar dependências
npm install

# Rodar migrações
npx prisma migrate dev

# Iniciar ambiente de desenvolvimento
npm run dev

---

📜 Licença

Esse projeto está sob a licença [MIT](./LICENSE).  
<a href="./LICENSE">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-brightgreen.svg" />
</a>

---

### 📌 Deploy

[![Ver no Navegador](https://img.shields.io/badge/👀%20Ver%20Projeto%20Online-000?style=for-the-badge&logo=vercel&logoColor=white)](https://ocean-link-iema.vercel.app/)

---
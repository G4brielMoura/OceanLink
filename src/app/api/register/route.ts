// src/app/api/register/route.ts

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs" // Certifique-se que o bcryptjs está instalado: npm install bcryptjs

export async function POST(request: Request) {
  try {
    const { name, email, password, userType } = await request.json()

    // 1. Validação Básica
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      )
    }

    // 2. Checar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Este e-mail já está em uso." },
        { status: 409 }
      )
    }

    // 3. Hash da Senha
    // Isso é crucial para segurança!
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Criação do Usuário no Banco (Prisma)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType, // PESCADOR ou TRAVESSANTE
        emailVerified: new Date(), // Simula verificação
      },
    })

    // Remove a senha do objeto de retorno por segurança
    const { password: _, ...userWithoutPass } = newUser

    return NextResponse.json(userWithoutPass, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

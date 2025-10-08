// src/app/api/register/route.ts
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validação simples
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já cadastrado" },
        { status: 400 }
      )
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 10)

    // Cria novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "Usuário criado com sucesso", user: newUser },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 }
    )
  }
}

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import PageWrapper from "../_components/pagewrapper"
import Dashboardcomp from "../_components/dashboardcomp"

// ⚠️ Aqui é um componente assíncrono porque precisa esperar o getServerSession
export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <PageWrapper>
      <Dashboardcomp />
    </PageWrapper>
  )
}

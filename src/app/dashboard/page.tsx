import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import PageWrapper from "../_components/pagewrapper"
import Dashboardcomp from "../_components/dashboardcomp"

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

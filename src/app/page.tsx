"use client"
import { Header } from "./_components/header"
import { Main } from "./_components/main"
import PageWrapper from "./_components/pagewrapper"


export default function Home() {
  return (
    <PageWrapper>
      <Header />
      <Main />
    </PageWrapper>
  )
}

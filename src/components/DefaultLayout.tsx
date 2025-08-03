// components/Layout/DefaultLayout.tsx
"use client"
import Header from "@/components/Header"

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
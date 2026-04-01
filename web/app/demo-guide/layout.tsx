import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SmartInvestor Lite - Demo Guide",
  description:
    "AI-powered pricing advisor that helps small businesses make smart, fair, and sustainable pricing decisions.",
  icons: {
    icon: "/demo-guide/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

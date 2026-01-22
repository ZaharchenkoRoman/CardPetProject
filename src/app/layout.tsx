import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"
import Header from "@/src/components/common/header/Header"
import { ProviderElement } from "@/src/components/provider/ProviderElement"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
})
export const metadata: Metadata = {
  title: {
    default: "Home",
    template: " %s | Cards",
  },
  description: "My cards pet project",
  icons: {
    icon: "/pics/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-poppins-sans)" }}
      >
        <ProviderElement>
          <Header />
          {children}
          <ReactQueryDevtools />
        </ProviderElement>
      </body>
    </html>
  )
}

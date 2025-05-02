import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import SessionProviderWrapper from "./components/SessionProvider"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dispute Resolution Platform",
  description: "Online platform for dispute resolution, mediation, and arbitration",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}

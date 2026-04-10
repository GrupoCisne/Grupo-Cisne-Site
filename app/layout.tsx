import type { Metadata } from 'next'
import { Inter, Urbanist } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Grupo Cisne — Seja o Cisne Negro do seu mercado',
  description:
    'Estratégia, Data e Tecnologia em harmonia absoluta. Marketing Digital premium para empresas que querem dominar seus mercados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${urbanist.variable}`}>
        {children}
      </body>
    </html>
  )
}

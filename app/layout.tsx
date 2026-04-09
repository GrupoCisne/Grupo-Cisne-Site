import type { Metadata } from 'next'
import { Inter_Tight, Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Grupo Cisne — O Cisne Negro do seu mercado',
  description:
    'Agência de Marketing 360° & Soluções Tech. Orquestramos metamorfoses. Unimos precisão técnica e estética premium para tornar sua empresa inevitável.',
  keywords: [
    'agência de marketing',
    'branding',
    'web design',
    'tráfego pago',
    'copywriting',
    'identidade visual',
    'Grupo Cisne',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${interTight.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { QualificationApp } from '@/components/qualificacao/QualificationApp'

export const metadata: Metadata = {
  title: 'Qualificação de Lead — Grupo Cisne',
  description: 'Converse com nosso Briefer AI e descubra como o Grupo Cisne pode transformar seu negócio.',
}

export default function QualificarPage() {
  return <QualificationApp />
}

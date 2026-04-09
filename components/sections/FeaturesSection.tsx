'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

const features = [
  {
    title: 'Metodologia Black Swan',
    description: 'Não buscamos o óbvio. Orquestramos o impacto que o seu mercado não consegue prever.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Tech-First Stack',
    description: 'Design é apenas o começo. Nossa engenharia em Next.js garante que você seja dono do seu SEO.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: 'Arquitetura de Conversão',
    description: 'Transformamos cada pixel em um atalho para a decisão de compra do seu cliente ideal.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Sinfonia IA + Humana',
    description: 'Eficiência de máquinas com o olhar clínico de estrategistas que dominam psicologia de consumo.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
]

export default function FeaturesSection() {
  return (
    <Section id="diferenciais" className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-interactive-default/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-interactive-default mb-4"
          >
            Diferenciais
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-urbanist text-4xl md:text-5xl font-bold text-content-strong mb-6"
          >
            O Cisne Negro é a exceção à regra.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-content-default text-lg font-light"
          >
            Em um oceano de agências iguais, nossa existência é a prova de que a precisão e a estética premium podem (e devem) andar juntas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="glass-card p-8 group hover:border-interactive-default/40 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-interactive-muted flex items-center justify-center text-interactive-default mb-6 group-hover:scale-110 group-hover:bg-interactive-default group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="font-urbanist text-xl font-bold text-content-strong mb-3">
                {feature.title}
              </h3>
              <p className="text-content-default text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

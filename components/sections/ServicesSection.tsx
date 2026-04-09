'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

const services = [
  {
    icon: '◈',
    name: 'Presença que paralisa',
    label: 'Web Design',
    description:
      'Sites que não são visitados — são experienciados. Arquitetados para converter e impossíveis de ignorar.',
  },
  {
    icon: '◇',
    name: 'A marca que o mercado não esquece',
    label: 'Identidade Visual',
    description:
      'Do arquétipo à paleta — construímos a identidade que posiciona você como referência inevitável.',
  },
  {
    icon: '◉',
    name: 'Autoridade que cresce todo dia',
    label: 'Redes Sociais',
    description:
      'Não gerenciamos redes. Transformamos presença em influência e seguidores em comunidade.',
  },
  {
    icon: '◎',
    name: 'Precisão que gera impacto',
    label: 'Tráfego Pago',
    description:
      'Tráfego direcionado com inteligência de dados. Cada centavo com destino certeiro.',
  },
  {
    icon: '◐',
    name: 'Palavras que despertam',
    label: 'Copywriting',
    description:
      'Copy que não informa — movimenta. Texto construído para acelerar a decisão do seu cliente.',
  },
]

export default function ServicesSection() {
  return (
    <Section id="servicos" className="section-gradient-top">
      <Container>
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="mb-3 text-xs font-normal tracking-widest uppercase"
            style={{ color: 'var(--interactive-pressed)' }}
          >
            Serviços
          </p>
          <h2
            className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ color: 'var(--content-strong)' }}
          >
            Cada entrega é uma metamorfose.
          </h2>
          <p
            className="mx-auto max-w-md text-base font-light"
            style={{ color: 'var(--content-default)' }}
          >
            Não gerenciamos processos. Orquestramos transformações.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 auto-rows-[280px]">
          {/* Main Card (Technology Focus) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 md:row-span-2 glass-strong p-10 flex flex-col justify-end group cursor-default"
          >
            <div className="absolute top-10 right-10 h-32 w-32 bg-interactive-default/10 blur-[60px] rounded-full group-hover:bg-interactive-default/20 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-interactive-muted border border-white/5 flex items-center justify-center text-interactive-default mb-8 group-hover:border-interactive-default/30 transition-all duration-500">
                <span className="text-2xl font-urbanist font-bold">01</span>
              </div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-interactive-default mb-4">Inhouse Tech Stack</p>
              <h3 className="font-urbanist text-4xl font-bold text-content-strong mb-6 leading-tight">Arquitetura que domina o Google.</h3>
              <p className="text-content-default leading-relaxed max-w-sm text-lg">Construído com Next.js 15 e motores de SEO otimizados para converter cada clique em faturamento real.</p>
            </div>
          </motion.div>

          {/* Identity Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 md:row-span-1 glass-card p-10 flex flex-col justify-center group"
          >
            <div className="flex items-center gap-8">
              <div className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center text-interactive-default shrink-0 group-hover:border-interactive-default/50 transition-all duration-500 shadow-inner">
                <span className="text-2xl">◈</span>
              </div>
              <div>
                <h3 className="font-urbanist text-2xl font-bold text-content-strong mb-2">Posicionamento de Elite</h3>
                <p className="text-content-default leading-relaxed">Não é sobre ser visto, é sobre ser desejado. Identidades visuais que exalam autoridade.</p>
              </div>
            </div>
          </motion.div>

          {/* Social Presence */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 glass-card p-8 flex flex-col items-center justify-center text-center group"
          >
            <div className="mb-4 relative">
              <span className="text-4xl text-interactive-default relative z-10">◉</span>
              <div className="absolute inset-0 bg-interactive-default/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-content-subtle mb-2">Comunidade</p>
            <h4 className="font-urbanist text-lg font-bold text-content-strong">Crescimento Orgânico</h4>
          </motion.div>

          {/* Growth Systems */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 glass-card p-6 flex flex-col justify-between group overflow-hidden"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-interactive-default">Growth</p>
            <div className="flex flex-col gap-1">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-interactive-default" 
                />
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="h-full bg-interactive-default/60" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

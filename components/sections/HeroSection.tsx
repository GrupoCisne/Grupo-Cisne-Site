'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/layout/Container'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  return (
    <section className="hero-mesh relative flex min-h-screen items-center overflow-hidden pt-20">
      <Container className="relative z-10 py-24 md:py-40 text-center">
        {/* Animated Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase text-content-subtle backdrop-blur-md"
        >
          <span
            className="h-2 w-2 rounded-full shadow-[0_0_12px_var(--interactive-default)] animate-pulse"
            style={{ background: 'var(--interactive-default)' }}
          />
          O Futuro do Marketing Digital
        </motion.div>

        {/* Headline (Urbanist + Motion) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 max-w-5xl font-urbanist text-7xl font-bold leading-[0.95] tracking-[-0.04em] md:text-8xl lg:text-9xl text-gradient"
        >
          Seja o Cisne Negro do{' '}
          <span className="text-interactive-default relative">
            seu mercado.
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-interactive-default to-transparent"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mb-14 max-w-2xl text-lg font-medium leading-relaxed text-content-default md:text-xl lg:text-2xl"
        >
          Você não precisa de mais uma agência. Você precisa do ponto de inflexão
          que ninguém viu chegar. Estratégia, Data e Tecnologia em harmonia absoluta.
        </motion.p>

        {/* CTAs with hover effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <Button variant="primary" size="lg" href="#cta" className="group relative px-12 py-6 rounded-full text-blue-1000 font-bold overflow-hidden">
            <span className="relative z-10">Despertar Agora</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
          <Button variant="secondary" size="lg" href="#processo" className="px-12 py-6 rounded-full border-white/10 hover:bg-white/5 font-semibold">
            Ver Metodologia
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-32 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-content-subtle"
          >
            Explore
          </span>
          <div className="relative h-16 w-[1px] bg-white/10 overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-interactive-default to-transparent"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

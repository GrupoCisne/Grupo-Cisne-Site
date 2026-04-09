'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

const faqs = [
  {
    question: 'Qual o tempo médio de entrega de um projeto?',
    answer: 'Para MVPs e Landing Pages premium, trabalhamos com ciclos de 10 a 21 dias. Projetos complexos de ecossistema Tech podem levar de 45 a 90 dias, dependendo da profundidade da integração.'
  },
  {
    question: 'A agência cuida apenas do design ou também do tráfego?',
    answer: 'Somos 360°. Criamos a estrutura (Design/Código) e orquestramos a amplificação (Tráfego Pago/Growth). Acreditamos que uma Ferrari sem combustível não sai do lugar.'
  },
  {
    question: 'O sistema de qualificação por IA já vem incluso?',
    answer: 'Sim, em nossos planos de arquitetura Tech. Ele é desenhado para filtrar curiosos e entregar apenas leads prontos para o fechamento no seu CRM.'
  },
  {
    question: 'Como o Grupo Cisne se diferencia de agências tradicionais?',
    answer: 'Fugimos do modelo de "fábrica de posts". Focamos em engenharia de conversão e ativos digitais que valorizam o seu negócio a longo prazo, não apenas curtidas.'
  }
]

function FaqItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-[var(--border-default)] last:border-none">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`text-lg transition-colors duration-300 ${isOpen ? 'text-interactive-default font-semibold' : 'text-content-strong'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-interactive-default border-interactive-default text-white rotate-180' : 'text-content-subtle group-hover:border-interactive-default group-hover:text-interactive-default'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-content-default font-light leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section id="faq" className="bg-surface-page/50">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-interactive-default mb-4"
          >
            Perguntas Frequentes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-urbanist text-4xl font-bold text-content-strong"
          >
            Dúvidas que antecipamos.
          </motion.h2>
        </div>

        <div className="glass-card px-8 md:px-12 py-4">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

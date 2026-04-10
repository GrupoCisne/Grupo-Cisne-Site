'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Para que tipo de empresa o Grupo Cisne é indicado?',
    a: 'Trabalhamos com empresas que querem sair do lugar-comum e se tornar referência no mercado. Do prestador de serviços local à empresa B2B em expansão — desde que você queira crescer de verdade, temos o método para isso.',
  },
  {
    q: 'Quanto tempo leva para ver resultados?',
    a: 'Depende do serviço. Em tráfego pago, os primeiros resultados aparecem em 7 a 14 dias. Em SEO e posicionamento orgânico, o crescimento consistente começa entre 60 e 90 dias. Em identidade e branding, o impacto é percebido imediatamente pelo mercado.',
  },
  {
    q: 'Como funciona o processo de onboarding?',
    a: 'Começamos com um Discovery aprofundado — uma sessão estratégica onde mapeamos seu negócio, diferencial competitivo e objetivos. A partir daí construímos o plano e apresentamos antes de qualquer execução. Zero surpresas.',
  },
  {
    q: 'Vocês têm contratos de fidelidade?',
    a: 'Não trabalhamos com contratos de lock-in. Nosso modelo é baseado em resultados e confiança. Se não estivermos entregando valor, você tem liberdade total. Mas na prática, quem entra raramente quer sair.',
  },
  {
    q: 'Qual é o investimento mínimo para trabalhar com vocês?',
    a: 'Cada projeto é personalizado e o investimento varia conforme o escopo. Agende uma conversa sem compromisso e apresentamos uma proposta sob medida para o seu momento e objetivo.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--interactive-pressed)' }}
          >
            FAQ
          </p>
          <h2
            className="text-3xl lg:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
          >
            Perguntas frequentes
          </h2>
          <p className="text-lg" style={{ color: 'var(--content-default)' }}>
            Tudo o que você precisa saber antes de dar o próximo passo.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                open === i ? 'glass-strong' : 'glass-card'
              }`}
              style={open === i ? { borderColor: 'rgba(106,174,222,0.25)' } : {}}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-semibold"
                  style={{ color: open === i ? 'var(--interactive-pressed)' : 'var(--content-strong)' }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: open === i ? 'var(--interactive-pressed)' : 'var(--border-strong)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 2v10M2 7h10"
                      stroke={open === i ? 'var(--blue-1000)' : 'var(--content-default)'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="leading-relaxed" style={{ color: 'var(--content-default)' }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

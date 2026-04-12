'use client'

import { useState } from 'react'

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511000000000'
    const text = encodeURIComponent(
      `Olá! Sou ${formData.name} (${formData.email}).\n\n${formData.message}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank')
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="cta" className="py-24 section-gradient-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden border"
          style={{ borderColor: 'var(--border-default)', background: 'var(--blue-800)' }}
        >
          {/* Glow decorations */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'var(--interactive-muted)' }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-50"
            style={{ background: 'rgba(106,174,222,0.06)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 lg:p-16 items-center">

            {/* Text */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--interactive-pressed)' }}
              >
                Vamos conversar
              </p>
              <h2
                className="text-3xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
              >
                Pronto para dominar o seu mercado?
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--content-default)' }}>
                Conta pra gente onde o seu negócio está e onde quer chegar.
                A gente monta a estratégia. Preencha o formulário e retornamos em até 24h.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'Discovery gratuito — sem enrolação, sem compromisso',
                  'Diagnóstico honesto de onde o seu marketing está perdendo dinheiro',
                  'Proposta personalizada com estratégia e ROI estimado',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--interactive-muted)', border: '1px solid var(--interactive-pressed)' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5 3.5-4" stroke="var(--interactive-pressed)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--content-default)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="glass-strong p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--interactive-muted)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l5.5 5.5 10.5-11" stroke="var(--interactive-pressed)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}>
                    Mensagem enviada!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--content-default)' }}>
                    O Cisne entra em contato em breve.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold hover:underline"
                    style={{ color: 'var(--interactive-pressed)' }}
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
                  >
                    Iniciar conversa
                  </h3>
                  {[
                    { key: 'name', placeholder: 'Seu nome', type: 'text' },
                    { key: 'email', placeholder: 'Seu e-mail', type: 'email' },
                  ].map((f) => (
                    <input
                      key={f.key}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={formData[f.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-strong)',
                        color: 'var(--content-strong)',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--interactive-pressed)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                    />
                  ))}
                  <textarea
                    required
                    rows={4}
                    placeholder="Sobre o que vamos conversar?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--content-strong)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--interactive-pressed)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                  />
                  <button
                    type="submit"
                    className="w-full font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-px"
                    style={{
                      background: 'var(--interactive-pressed)',
                      color: 'var(--blue-1000)',
                      boxShadow: '0 0 24px var(--interactive-glow)',
                    }}
                  >
                    Enviar mensagem
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

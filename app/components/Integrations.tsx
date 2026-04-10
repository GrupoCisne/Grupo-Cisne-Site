'use client'

const stack = [
  { name: 'Next.js', desc: 'Performance máxima e SEO técnico de ponta' },
  { name: 'n8n', desc: 'Automações e integrações sem limite de escala' },
  { name: 'Meta Ads', desc: 'Tráfego pago de alta conversão' },
  { name: 'Google Ads', desc: 'Presença no exato momento de intenção' },
]

export default function Integrations() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: 'var(--border-default)', background: 'var(--surface-raised)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Text */}
            <div className="p-12 lg:p-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--interactive-pressed)' }}
              >
                Tech Stack
              </p>
              <h2
                className="text-3xl lg:text-4xl font-black tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
              >
                Tecnologia proprietária que nenhuma outra agência tem.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--content-default)' }}>
                Construímos com as ferramentas certas — do código ao pixel — para que
                cada entrega gere resultados mensuráveis e replicáveis.
              </p>
              <div className="flex flex-col gap-3">
                {stack.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-4 rounded-2xl p-4 border transition-all duration-300 group"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderColor: 'var(--border-default)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--interactive-pressed)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--interactive-muted)' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--interactive-pressed)' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--content-strong)' }}>
                        {t.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--content-subtle)' }}>
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div
              className="relative h-full min-h-[420px] flex items-center justify-center p-12"
              style={{ background: 'linear-gradient(135deg, var(--blue-800), var(--blue-900))' }}
            >
              {/* Central orb */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center glow-mid"
                style={{ background: 'var(--interactive-default)' }}
              >
                <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
                  <path d="M20 8L32 14V26L20 32L8 26V14L20 8Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="20" cy="20" r="4" fill="white"/>
                </svg>
              </div>

              {/* Floating badges */}
              {stack.map((t, i) => {
                const positions = ['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8']
                return (
                  <div
                    key={t.name}
                    className={`absolute ${positions[i]} rounded-xl px-4 py-2 border text-xs font-bold`}
                    style={{
                      background: 'rgba(12,18,29,0.8)',
                      backdropFilter: 'blur(12px)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--content-strong)',
                    }}
                  >
                    {t.name}
                  </div>
                )
              })}

              {/* Connection lines (decorative) */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
                <line x1="80" y1="80" x2="200" y2="200" stroke="var(--interactive-default)" strokeWidth="1" strokeDasharray="4"/>
                <line x1="320" y1="80" x2="200" y2="200" stroke="var(--interactive-default)" strokeWidth="1" strokeDasharray="4"/>
                <line x1="80" y1="320" x2="200" y2="200" stroke="var(--interactive-default)" strokeWidth="1" strokeDasharray="4"/>
                <line x1="320" y1="320" x2="200" y2="200" stroke="var(--interactive-default)" strokeWidth="1" strokeDasharray="4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

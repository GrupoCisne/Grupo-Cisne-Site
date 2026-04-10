const clients = [
  'Segmento Saúde',
  'E-commerce',
  'Jurídico',
  'Imobiliário',
  'Educação',
  'B2B SaaS',
  'Varejo',
  'Finanças',
]

export default function SocialProof() {
  return (
    <section className="py-16 overflow-hidden section-gradient-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-10">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--content-subtle)' }}
        >
          Resultados comprovados
        </p>
        <h2
          className="text-2xl lg:text-3xl font-semibold"
          style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
        >
          Presença de elite em todos os segmentos
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium border"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderColor: 'var(--border-default)',
                color: 'var(--content-default)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--interactive-pressed)' }}
              />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

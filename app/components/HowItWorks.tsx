const steps = [
  {
    number: '01',
    title: 'A Imersão',
    subtitle: 'Discovery',
    description: 'Mergulho profundo no seu negócio. Não perguntamos apenas "o quê", mas o "porquê". Encontramos o seu verdadeiro diferencial competitivo.',
  },
  {
    number: '02',
    title: 'O Plano',
    subtitle: 'Strategy',
    description: 'Definimos exatamente onde investir e onde não investir. Canais, tom de voz e cronograma com intenção de retorno, sem achismo.',
  },
  {
    number: '03',
    title: 'A Construção',
    subtitle: 'Build',
    description: 'Nossos squads de IA e especialistas humanos entram em ação. Copy, Design e Código ganham vida através da estética Grupo Cisne.',
  },
  {
    number: '04',
    title: 'O Voo',
    subtitle: 'Launch & Scale',
    description: 'Lançamento com dados, não com sorte. O tráfego é ativado e cada semana retroalimenta a estratégia. Resultado não é evento, é processo.',
  },
]

export default function HowItWorks() {
  return (
    <section id="processo" className="py-24 section-gradient-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--interactive-pressed)' }}
          >
            Nosso Processo
          </p>
          <h2
            className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
          >
            Sua metamorfose,{' '}
            <span style={{ color: 'var(--interactive-pressed)' }}>
              engenharia passo a passo.
            </span>
          </h2>
          <p className="text-lg leading-relaxed mt-4" style={{ color: 'var(--content-default)' }}>
            Marketing sem estrutura é dinheiro indo embora todo mês. Antes de qualquer execução, a gente constrói a base que faz cada centavo trabalhar.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative overflow-hidden p-10 flex flex-col group ${
                i === 0 ? 'glass-strong' : 'glass-card'
              }`}
            >
              {/* Watermark number */}
              <span
                className="absolute -top-3 -right-2 text-9xl font-semibold select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                style={{
                  fontFamily: 'var(--font-urbanist)',
                  color: i === 0 ? 'rgba(106,174,222,0.08)' : 'rgba(255,255,255,0.03)',
                }}
              >
                {step.number}
              </span>

              {/* Glow on first card */}
              {i === 0 && (
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                  style={{ background: 'var(--interactive-muted)' }}
                />
              )}

              <div className="relative z-10">
                {/* Number badge */}
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold mb-6 border"
                  style={{
                    borderColor: i === 0 ? 'var(--interactive-pressed)' : 'var(--border-strong)',
                    color: i === 0 ? 'var(--interactive-pressed)' : 'var(--content-subtle)',
                  }}
                >
                  {step.number}
                </div>

                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
                  style={{ color: 'var(--interactive-pressed)' }}
                >
                  {step.subtitle}
                </p>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
                >
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--content-default)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

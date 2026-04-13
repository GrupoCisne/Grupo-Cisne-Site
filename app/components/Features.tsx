const services = [
  {
    number: '01',
    label: 'Web Design',
    title: 'Presença que paralisa',
    description: 'Sites que não são visitados. São experienciados. Arquitetados para converter e impossíveis de ignorar.',
    icon: '◈',
  },
  {
    number: '02',
    label: 'Identidade Visual',
    title: 'A marca que o mercado não esquece',
    description: 'Do arquétipo à paleta, construímos a identidade que posiciona você como referência inevitável.',
    icon: '◇',
  },
  {
    number: '03',
    label: 'Redes Sociais',
    title: 'Autoridade que cresce todo dia',
    description: 'Não gerenciamos redes. Transformamos presença em influência e seguidores em comunidade.',
    icon: '◉',
  },
  {
    number: '04',
    label: 'Tráfego Pago',
    title: 'Precisão que gera impacto',
    description: 'Tráfego direcionado com inteligência de dados. Cada centavo com destino certeiro.',
    icon: '◎',
  },
  {
    number: '05',
    label: 'Copywriting',
    title: 'Palavras que despertam',
    description: 'Copy que não informa. Movimenta. Texto construído para acelerar a decisão do seu cliente.',
    icon: '◐',
  },
]

export default function Features() {
  return (
    <section id="servicos" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--interactive-pressed)' }}
          >
            Serviços
          </p>
          <h2
            className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
          >
            Cinco frentes. Uma estratégia. Um resultado.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--content-default)' }}>
            Do branding ao tráfego pago, cada serviço é uma alavanca de crescimento dentro de uma estratégia integrada.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Main card — spans 2 cols */}
          <div className="lg:col-span-2 glass-strong p-10 flex flex-col justify-between group relative overflow-hidden">
            <div
              className="absolute top-8 right-8 w-32 h-32 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"
              style={{ background: 'var(--interactive-muted)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-3xl"
                  style={{ color: 'var(--interactive-pressed)' }}
                >
                  {services[0].icon}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                  style={{
                    background: 'var(--interactive-muted)',
                    color: 'var(--interactive-pressed)',
                  }}
                >
                  {services[0].label}
                </span>
              </div>
              <h3
                className="text-2xl lg:text-3xl font-semibold mb-4"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
              >
                {services[0].title}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--content-default)' }}>
                {services[0].description}
              </p>
            </div>
            {/* Progress bar decoration */}
            <div className="mt-8 flex flex-col gap-2">
              <div
                className="h-px w-full rounded-full overflow-hidden"
                style={{ background: 'var(--border-default)' }}
              >
                <div
                  className="h-full w-4/5 rounded-full"
                  style={{ background: 'var(--interactive-default)' }}
                />
              </div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--content-subtle)' }}>
                Conversão acima da média
              </p>
            </div>
          </div>

          {/* Small cards */}
          {services.slice(1).map((s) => (
            <div
              key={s.number}
              className="glass-card p-8 flex flex-col group relative overflow-hidden"
            >
              <div
                className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: 'var(--interactive-muted)' }}
              />
              <div className="flex items-start justify-between mb-6 relative z-10">
                <span className="text-2xl" style={{ color: 'var(--interactive-pressed)' }}>
                  {s.icon}
                </span>
                <span
                  className="text-3xl font-semibold"
                  style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--border-strong)' }}
                >
                  {s.number}
                </span>
              </div>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 relative z-10"
                style={{ color: 'var(--interactive-pressed)' }}
              >
                {s.label}
              </span>
              <h3
                className="text-lg font-semibold mb-3 relative z-10"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed relative z-10"
                style={{ color: 'var(--content-default)' }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

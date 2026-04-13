const testimonials = [
  {
    quote: 'Em 60 dias o nosso site passou a aparecer na primeira página do Google. O ROI foi imediato e o tráfego orgânico triplicou.',
    name: 'Ricardo M.',
    title: 'CEO,Clínica Odontológica',
  },
  {
    quote: 'Nunca achei que branding pudesse mudar tanto a percepção de preço. Hoje cobramos 40% mais e o cliente percebe o valor.',
    name: 'Fernanda L.',
    title: 'Fundadora,Consultoria Jurídica',
  },
  {
    quote: 'As campanhas de tráfego pago que eles estruturaram geraram o melhor ROAS que tivemos em 3 anos de operação.',
    name: 'Thiago P.',
    title: 'Diretor Comercial,E-commerce',
  },
  {
    quote: 'O copy do nosso lançamento converteu 4× mais do que a média do mercado. A equipe é absurdamente boa.',
    name: 'Mariana S.',
    title: 'Co-fundadora,EdTech',
  },
  {
    quote: 'Do zero ao posicionamento premium em 90 dias. A identidade visual ficou tão forte que virou referência no setor.',
    name: 'Carlos A.',
    title: 'Sócio,Escritório de Arquitetura',
  },
  {
    quote: 'Nossa comunidade no Instagram cresceu 10k seguidores em 45 dias sem anúncio, só com a estratégia de conteúdo deles.',
    name: 'Juliana R.',
    title: 'CEO,Studio de Fitness',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#F59E0B">
          <path d="M8 1l1.85 3.75L14 5.56l-3 2.92.71 4.12L8 10.5l-3.71 2.1.71-4.12L2 5.56l4.15-.81L8 1z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const col1 = testimonials.filter((_, i) => i % 3 === 0)
  const col2 = testimonials.filter((_, i) => i % 3 === 1)
  const col3 = testimonials.filter((_, i) => i % 3 === 2)

  return (
    <section id="testimonials" className="py-24 section-gradient-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--interactive-pressed)' }}
          >
            Resultados Reais
          </p>
          <h2
            className="text-3xl lg:text-5xl font-semibold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
          >
            O que nossos clientes dizem
          </h2>
          <p className="text-lg" style={{ color: 'var(--content-default)' }}>
            Transformações que falam por si mesmas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((t) => (
                <div key={t.name} className="glass-card p-6">
                  <Stars />
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--content-default)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      style={{
                        background: 'var(--interactive-muted)',
                        color: 'var(--interactive-pressed)',
                      }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--content-strong)' }}>
                        {t.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--content-subtle)' }}>
                        {t.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

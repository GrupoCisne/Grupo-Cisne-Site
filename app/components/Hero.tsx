export default function Hero() {
  return (
    <section className="hero-mesh relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Extra glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--interactive-default)' }}
        />
        <div
          className="absolute bottom-[5%] right-[5%] w-[350px] h-[350px] rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--blue-300)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-3 rounded-full border px-6 py-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
          style={{
            borderColor: 'var(--border-default)',
            background: 'rgba(255,255,255,0.03)',
            color: 'var(--content-subtle)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--interactive-default)', boxShadow: '0 0 12px var(--interactive-default)' }}
          />
          Agência de Marketing Digital Premium
        </div>

        {/* Headline */}
        <h1
          className="text-5xl lg:text-7xl font-semibold leading-[0.95] tracking-[-0.04em] mb-6 text-gradient"
          style={{ fontFamily: 'var(--font-urbanist)' }}
        >
          Do invisível{' '}
          <span style={{ color: 'var(--interactive-pressed)', WebkitTextFillColor: 'var(--interactive-pressed)' }}>
            ao inevitável.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--content-default)' }}
        >
          Marketing digital completo — branding, redes, tráfego e tecnologia —
          para transformar a sua empresa na referência que o seu mercado não estava esperando.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 font-semibold px-10 py-4 rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{
              background: 'var(--interactive-pressed)',
              color: 'var(--blue-1000)',
              boxShadow: '0 0 32px var(--interactive-glow)',
            }}
          >
            Começar Agora
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#processo"
            className="inline-flex items-center gap-2 font-semibold px-10 py-4 rounded-full border transition-all duration-200 hover:bg-white/5"
            style={{
              borderColor: 'var(--border-strong)',
              color: 'var(--content-strong)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7.5 6.75L11.25 9l-3.75 2.25V6.75z" fill="currentColor"/>
            </svg>
            Ver Metodologia
          </a>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-10 border-t"
          style={{ borderColor: 'var(--border-default)' }}
        >
          {[
            { value: '200+', label: 'Clientes atendidos' },
            { value: '3×', label: 'Crescimento médio' },
            { value: '98%', label: 'Retenção' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--interactive-pressed)' }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--content-subtle)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

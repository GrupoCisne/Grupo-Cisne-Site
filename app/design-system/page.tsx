'use client'

export default function DesignSystem() {
  const primitiveBlues = [
    { token: '--blue-1000', hex: '#06090E', label: 'blue-1000' },
    { token: '--blue-900',  hex: '#0C121D', label: 'blue-900' },
    { token: '--blue-800',  hex: '#131B2B', label: 'blue-800' },
    { token: '--blue-700',  hex: '#1E293B', label: 'blue-700' },
    { token: '--blue-600',  hex: '#334155', label: 'blue-600' },
    { token: '--blue-500',  hex: '#3A88C4', label: 'blue-500' },
    { token: '--blue-400',  hex: '#47A1E6', label: 'blue-400' },
    { token: '--blue-300',  hex: '#6AAEDE', label: 'blue-300' },
    { token: '--blue-200',  hex: '#A8CCEC', label: 'blue-200' },
    { token: '--blue-100',  hex: '#E2F0FD', label: 'blue-100' },
  ]

  const primitiveNeutrals = [
    { token: '--neutral-100', hex: '#F8FAFC', label: 'neutral-100' },
    { token: '--neutral-200', hex: '#E2E8F0', label: 'neutral-200' },
    { token: '--neutral-300', hex: '#CBD5E1', label: 'neutral-300' },
    { token: '--neutral-400', hex: '#94A3B8', label: 'neutral-400' },
    { token: '--neutral-500', hex: '#B1C0D0', label: 'neutral-500' },
    { token: '--neutral-600', hex: '#7D8FA9', label: 'neutral-600' },
  ]

  const semanticSurfaces = [
    { token: '--surface-page',    ref: '--blue-1000', hex: '#06090E', label: 'surface-page',    desc: 'Background da página' },
    { token: '--surface-raised',  ref: '--blue-900',  hex: '#0C121D', label: 'surface-raised',  desc: 'Superfície elevada' },
    { token: '--surface-overlay', ref: '--blue-800',  hex: '#131B2B', label: 'surface-overlay', desc: 'Cards overlay' },
    { token: '--surface-active',  ref: '--blue-700',  hex: '#1E293B', label: 'surface-active',  desc: 'Estado ativo / bordas fortes' },
  ]

  const semanticContent = [
    { token: '--content-strong',  hex: '#F8FAFC', label: 'content-strong',  desc: 'Texto principal' },
    { token: '--content-default', hex: '#B1C0D0', label: 'content-default', desc: 'Texto secundário' },
    { token: '--content-subtle',  hex: '#7D8FA9', label: 'content-subtle',  desc: 'Texto terciário / labels' },
  ]

  const semanticInteractive = [
    { token: '--interactive-default', hex: '#3A88C4', label: 'interactive-default', desc: 'Estado padrão' },
    { token: '--interactive-hover',   hex: '#47A1E6', label: 'interactive-hover',   desc: 'Hover' },
    { token: '--interactive-pressed', hex: '#6AAEDE', label: 'interactive-pressed', desc: 'Pressed / accent' },
    { token: '--interactive-muted',   hex: 'rgba(58,136,196,0.12)', label: 'interactive-muted', desc: 'Background sutil' },
    { token: '--interactive-glow',    hex: 'rgba(58,136,196,0.30)', label: 'interactive-glow',  desc: 'Glow effect' },
  ]

  const semanticBorders = [
    { token: '--border-default', hex: 'rgba(148,163,184,0.10)', label: 'border-default', desc: 'Borda padrão' },
    { token: '--border-strong',  hex: 'rgba(148,163,184,0.20)', label: 'border-strong',  desc: 'Borda hover' },
    { token: '--border-active',  hex: '#3A88C4',                label: 'border-active',  desc: 'Borda ativa' },
  ]

  const utilityClasses = [
    { name: '.glass-card',    desc: 'backdrop-filter blur(16px), borda sutil, hover elevado' },
    { name: '.glass-strong',  desc: 'backdrop-filter blur(24px), fundo mais opaco' },
    { name: '.hero-mesh',     desc: 'radial gradient azul difuso via ::before' },
    { name: '.text-gradient', desc: 'texto com fade strong → neutral' },
    { name: '.glow-soft',     desc: 'box-shadow azul suave (40px)' },
    { name: '.glow-mid',      desc: 'box-shadow azul médio (60px)' },
    { name: '.animate-marquee', desc: 'carrossel infinito, pausa no hover' },
    { name: '.section-gradient-top', desc: 'gradient blue-900 → blue-1000' },
    { name: '.section-gradient-alt', desc: 'background blue-900 sólido' },
  ]

  return (
    <main
      className="min-h-screen"
      style={{ background: 'var(--surface-page)', color: 'var(--content-strong)' }}
    >
      {/* Hero */}
      <section className="hero-mesh py-20 px-6 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--interactive-default)', fontFamily: 'var(--font-inter)' }}
          >
            Grupo Cisne
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-gradient mb-4"
            style={{ fontFamily: 'var(--font-urbanist)' }}
          >
            Design System
          </h1>
          <p
            className="text-lg"
            style={{ color: 'var(--content-default)', fontFamily: 'var(--font-inter)' }}
          >
            Tokens, tipografia e classes utilitárias da IDV dark mode.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-20">

        {/* ── CORES PRIMITIVAS ── */}
        <section>
          <SectionHeader label="Tokens" title="Cores Primitivas" />

          <div className="mb-10">
            <SubHeader>Escala Blue</SubHeader>
            <ColorGrid colors={primitiveBlues} />
          </div>

          <div>
            <SubHeader>Escala Neutral</SubHeader>
            <ColorGrid colors={primitiveNeutrals} />
          </div>
        </section>

        {/* ── TOKENS SEMÂNTICOS ── */}
        <section>
          <SectionHeader label="Semântica" title="Tokens Semânticos" />

          <div className="mb-10">
            <SubHeader>Surface</SubHeader>
            <SemanticGrid colors={semanticSurfaces} />
          </div>

          <div className="mb-10">
            <SubHeader>Content</SubHeader>
            <SemanticGrid colors={semanticContent} textDark />
          </div>

          <div className="mb-10">
            <SubHeader>Interactive</SubHeader>
            <SemanticGrid colors={semanticInteractive} />
          </div>

          <div>
            <SubHeader>Border</SubHeader>
            <SemanticGrid colors={semanticBorders} />
          </div>
        </section>

        {/* ── TIPOGRAFIA ── */}
        <section>
          <SectionHeader label="Type" title="Tipografia" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <p className="text-xs mb-4" style={{ color: 'var(--content-subtle)', fontFamily: 'var(--font-inter)' }}>
                --font-urbanist · Headlines
              </p>
              <div style={{ fontFamily: 'var(--font-urbanist)' }}>
                <p className="font-semibold mb-1" style={{ fontSize: 48, lineHeight: 1.1, color: 'var(--content-strong)' }}>Display 48</p>
                <p className="font-semibold mb-1" style={{ fontSize: 36, lineHeight: 1.2, color: 'var(--content-strong)' }}>Heading 36</p>
                <p className="font-semibold mb-1" style={{ fontSize: 28, lineHeight: 1.3, color: 'var(--content-strong)' }}>Heading 28</p>
                <p className="font-medium"         style={{ fontSize: 22, lineHeight: 1.4, color: 'var(--content-default)' }}>Subheading 22</p>
              </div>
            </div>

            <div className="glass-card p-8">
              <p className="text-xs mb-4" style={{ color: 'var(--content-subtle)', fontFamily: 'var(--font-inter)' }}>
                --font-inter · Body &amp; UI
              </p>
              <div style={{ fontFamily: 'var(--font-inter)' }}>
                <p className="font-semibold mb-2" style={{ fontSize: 18, color: 'var(--content-strong)' }}>Body Large — semibold</p>
                <p className="font-normal mb-2"   style={{ fontSize: 16, color: 'var(--content-default)' }}>Body regular — normal weight lorem ipsum dolor sit amet consectetur.</p>
                <p className="font-medium mb-2"   style={{ fontSize: 14, color: 'var(--content-default)' }}>Label 14 — medium</p>
                <p className="font-normal"         style={{ fontSize: 12, color: 'var(--content-subtle)' }}>Caption 12 — normal</p>
              </div>
            </div>
          </div>

          {/* Text gradient example */}
          <div className="glass-card p-8 mt-6 text-center">
            <p className="text-xs mb-4" style={{ color: 'var(--content-subtle)', fontFamily: 'var(--font-inter)' }}>
              .text-gradient
            </p>
            <p
              className="text-5xl font-semibold text-gradient"
              style={{ fontFamily: 'var(--font-urbanist)' }}
            >
              Grupo Cisne
            </p>
          </div>
        </section>

        {/* ── CLASSES UTILITÁRIAS ── */}
        <section>
          <SectionHeader label="Utils" title="Classes Utilitárias" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {utilityClasses.map((u) => (
              <div
                key={u.name}
                className="glass-card p-5"
              >
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: 'var(--interactive-pressed)', fontFamily: 'var(--font-inter)' }}
                >
                  {u.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--content-subtle)', fontFamily: 'var(--font-inter)' }}>
                  {u.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Visual demos */}
          <SubHeader>Demonstração Visual</SubHeader>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 flex items-center justify-center min-h-[140px]">
              <p className="text-sm font-medium" style={{ color: 'var(--content-default)', fontFamily: 'var(--font-inter)' }}>
                .glass-card
              </p>
            </div>

            <div className="glass-strong p-8 flex items-center justify-center min-h-[140px]">
              <p className="text-sm font-medium" style={{ color: 'var(--content-default)', fontFamily: 'var(--font-inter)' }}>
                .glass-strong
              </p>
            </div>

            <div
              className="p-8 flex items-center justify-center min-h-[140px] rounded-3xl border"
              style={{ border: '1px solid var(--border-default)' }}
            >
              <div className="text-center">
                <div className="glow-soft inline-block px-5 py-2 rounded-xl mb-2" style={{ background: 'var(--interactive-muted)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--interactive-pressed)', fontFamily: 'var(--font-inter)' }}>
                    .glow-soft
                  </p>
                </div>
                <br />
                <div className="glow-mid inline-block px-5 py-2 rounded-xl mt-2" style={{ background: 'var(--interactive-muted)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--interactive-pressed)', fontFamily: 'var(--font-inter)' }}>
                    .glow-mid
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTÕES ── */}
        <section>
          <SectionHeader label="Components" title="Botões" />
          <div className="glass-card p-8 flex flex-wrap gap-4 items-center">
            <button
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: 'var(--interactive-default)',
                color: '#fff',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--interactive-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--interactive-default)')}
            >
              Primary
            </button>

            <button
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: 'var(--interactive-muted)',
                color: 'var(--interactive-pressed)',
                border: '1px solid var(--border-strong)',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--interactive-default)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
            >
              Secondary
            </button>

            <button
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: 'transparent',
                color: 'var(--content-default)',
                border: '1px solid var(--border-default)',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
            >
              Ghost
            </button>

            <button
              className="px-6 py-3 rounded-xl font-semibold text-sm opacity-40 cursor-not-allowed"
              style={{
                background: 'var(--interactive-default)',
                color: '#fff',
                fontFamily: 'var(--font-inter)',
              }}
              disabled
            >
              Disabled
            </button>
          </div>
        </section>

      </div>
    </main>
  )
}

/* ── Sub-components ── */

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p
        className="text-xs font-semibold tracking-[0.15em] uppercase mb-2"
        style={{ color: 'var(--interactive-default)', fontFamily: 'var(--font-inter)' }}
      >
        {label}
      </p>
      <h2
        className="text-3xl font-semibold"
        style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
      >
        {title}
      </h2>
    </div>
  )
}

function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm font-semibold mb-4"
      style={{ color: 'var(--content-subtle)', fontFamily: 'var(--font-inter)' }}
    >
      {children}
    </p>
  )
}

function ColorGrid({ colors }: { colors: { token: string; hex: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {colors.map((c) => (
        <div key={c.token} className="glass-card overflow-hidden">
          <div
            className="h-16 w-full"
            style={{ background: c.hex }}
          />
          <div className="p-3">
            <p
              className="text-xs font-semibold mb-0.5"
              style={{ color: 'var(--content-strong)', fontFamily: 'var(--font-inter)' }}
            >
              {c.label}
            </p>
            <p
              className="text-[11px] font-mono"
              style={{ color: 'var(--content-subtle)' }}
            >
              {c.hex}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SemanticGrid({
  colors,
  textDark,
}: {
  colors: { token: string; hex: string; label: string; desc: string }[]
  textDark?: boolean
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {colors.map((c) => (
        <div key={c.token} className="glass-card overflow-hidden">
          <div
            className="h-12 w-full flex items-center justify-center"
            style={{ background: c.hex }}
          >
            {textDark && (
              <span className="text-xs font-mono" style={{ color: '#06090E', opacity: 0.5 }}>
                Aa
              </span>
            )}
          </div>
          <div className="p-3">
            <p
              className="text-xs font-semibold mb-0.5"
              style={{ color: 'var(--content-strong)', fontFamily: 'var(--font-inter)' }}
            >
              {c.label}
            </p>
            <p
              className="text-[11px]"
              style={{ color: 'var(--content-subtle)', fontFamily: 'var(--font-inter)' }}
            >
              {c.desc}
            </p>
            <p
              className="text-[10px] font-mono mt-1"
              style={{ color: 'var(--interactive-default)' }}
            >
              var({c.token})
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

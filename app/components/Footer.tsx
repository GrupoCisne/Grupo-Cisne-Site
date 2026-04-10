'use client'

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#cta' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.567 4.143 1.558 5.873L0 24l6.304-1.534A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.498-5.186-1.371l-.371-.22-3.745.911.951-3.636-.241-.384A9.965 9.965 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--blue-1000)', borderTop: '1px solid var(--border-default)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="inline-block mb-4">
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
              >
                Grupo <span style={{ color: 'var(--interactive-pressed)' }}>Cisne</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'var(--content-subtle)' }}>
              Marketing Digital, Estratégia e Tecnologia em harmonia absoluta para transformar o seu mercado.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--content-subtle)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'var(--interactive-muted)'
                    el.style.borderColor = 'var(--interactive-pressed)'
                    el.style.color = 'var(--interactive-pressed)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(255,255,255,0.05)'
                    el.style.borderColor = 'var(--border-default)'
                    el.style.color = 'var(--content-subtle)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'var(--content-subtle)' }}
            >
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--content-subtle)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--content-strong)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--content-subtle)')}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'var(--content-subtle)' }}
            >
              Contato
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:contato@grupocisne.com.br"
                  className="text-sm transition-colors"
                  style={{ color: 'var(--content-subtle)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--content-strong)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--content-subtle)')}
                >
                  contato@grupocisne.com.br
                </a>
              </li>
              <li>
                <a
                  href="#cta"
                  className="text-sm transition-colors"
                  style={{ color: 'var(--content-subtle)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--content-strong)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--content-subtle)')}
                >
                  Agendar uma conversa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <p className="text-xs" style={{ color: 'var(--content-subtle)' }}>
            © 2025 Grupo Cisne. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: 'var(--border-strong)' }}>
            Feito com <span style={{ color: 'var(--interactive-pressed)' }}>◈</span> pelo Grupo Cisne
          </p>
        </div>
      </div>
    </footer>
  )
}

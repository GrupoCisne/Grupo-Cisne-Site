'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Processo', href: '#processo' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#cta' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`max-w-5xl mx-auto px-6 flex items-center justify-between h-14 rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="/" className="font-urbanist text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-urbanist)' }}>
          <span style={{ color: 'var(--content-strong)' }}>Cisne </span>
          <span style={{ color: 'var(--interactive-pressed)' }}>Negro</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:-translate-y-px"
                style={{ color: 'var(--content-default)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--content-strong)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--content-default)')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{
              background: 'var(--interactive-pressed)',
              color: 'var(--blue-1000)',
              boxShadow: '0 0 20px var(--interactive-glow)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--interactive-hover)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--interactive-pressed)'
            }}
          >
            Falar com o time
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: 'var(--content-strong)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden mt-2 mx-4 glass-strong px-6 py-6 flex flex-col gap-5"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--content-default)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="inline-flex justify-center items-center font-bold py-3 rounded-full text-sm"
            style={{ background: 'var(--interactive-pressed)', color: 'var(--blue-1000)' }}
          >
            Falar com o time
          </a>
        </div>
      )}
    </header>
  )
}

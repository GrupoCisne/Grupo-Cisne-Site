'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Serviços',     href: '#servicos' },
  { label: 'Processo',     href: '#processo' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contato',      href: '#cta' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        paddingTop: scrolled ? '12px' : '24px',
        background: 'transparent',
      }}
    >
      <div className={cn(
        "mx-auto flex h-14 max-w-5xl items-center justify-between px-6 transition-all duration-500 rounded-full",
        scrolled ? "glass-strong border-white/[0.08] shadow-2xl shadow-black/40" : "bg-transparent border-transparent"
      )}>
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          className="font-urbanist text-xl font-bold tracking-tight text-content-strong group"
        >
          Cisne <span className="text-interactive-default transition-all duration-300 group-hover:text-interactive-hover">Negro</span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="font-inter text-[12px] font-semibold uppercase tracking-widest text-content-default transition-all duration-300 hover:text-content-strong hover:translate-y-[-1px]"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" href="#cta" className="relative px-6 py-2.5 rounded-full text-blue-1000 font-bold border-none shadow-lg shadow-blue-500/10 transition-transform hover:scale-105">
            Começar
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden p-2 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-content-strong"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-px w-6 bg-content-strong"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-content-strong"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[-1] bg-surface-page/98 backdrop-blur-3xl"
          >
            <nav className="flex h-screen flex-col items-center justify-center gap-10 px-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ x: 10 }}
                  className="font-urbanist text-4xl font-bold text-content-strong transition-all hover:text-interactive-default"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-10 w-full max-w-xs">
                <Button variant="primary" size="lg" href="#cta" className="w-full rounded-full text-blue-1000 py-6">
                  Falar com o time
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

'use client'

import { useState } from 'react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const messageText = `Olá, vim pelo site!%0A*Nome:* ${formData.name}%0A*Email:* ${formData.email}%0A*Mensagem:* ${formData.message}`
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511000000000'
    const wppUrl = `https://wa.me/${whatsappNumber}?text=${messageText}` 
    
    window.open(wppUrl, '_blank')
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <Section id="cta" className="relative border-t border-[var(--border-default)]">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, var(--blue-400) 0%, transparent 60%)'
        }}
      />
      <Container className="relative z-10 text-center">
        <h2 className="mb-6 font-outfit text-4xl font-semibold text-white">Preparado para revolucionar seu mercado?</h2>
        <p className="mx-auto mb-12 max-w-xl text-lg font-light text-slate-400">
          Deixe-nos ser a equipe que escala o impossível para o seu negócio. Preencha o formulário abaixo e nós entraremos em contato.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-md glass-card p-8">
          <div className="mb-4">
            <input 
              type="text" 
              required
              placeholder="Seu Nome" 
              className="w-full rounded-md border border-[var(--border-strong)] bg-transparent px-4 py-3 text-sm text-white focus:border-[var(--interactive-pressed)] focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              required
              placeholder="Seu e-mail corporativo" 
              className="w-full rounded-md border border-[var(--border-strong)] bg-transparent px-4 py-3 text-sm text-white focus:border-[var(--interactive-pressed)] focus:outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <textarea 
              required
              rows={4}
              placeholder="Sobre o que vamos conversar?" 
              className="w-full resize-none rounded-md border border-[var(--border-strong)] bg-transparent px-4 py-3 text-sm text-white focus:border-[var(--interactive-pressed)] focus:outline-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          <Button type="submit" className="w-full">
            {status === 'loading' ? 'Enviando...' : 'Iniciar Conversa'}
          </Button>

          {status === 'success' && <p className="mt-4 text-xs font-semibold text-green-400">Mensagem recebida com sucesso. O Cisne entra em contato em breve.</p>}
          {status === 'error' && <p className="mt-4 text-xs font-semibold text-red-500">Ocorreu um erro. Tente novamente mais tarde.</p>}
        </form>
      </Container>
    </Section>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL ?? ''

// ─── Service badge colors (fora do design system de propósito — identidade visual das categorias)
const SERVICE_COLORS: Record<string, string> = {
  'Social Media':    '#EC4899',
  'Tráfego Pago':    '#F97316',
  'Web Design':      '#3B82F6',
  'Branding':        '#A78BFA',
  'Designer':        '#22D3EE',
  'Copywriter':      '#F59E0B',
  'SEO':             '#22C55E',
  'E-mail Marketing':'#E879F9',
}
const svcColor = (name: string) => SERVICE_COLORS[name] ?? 'var(--content-subtle)'
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

interface ServiceItem { id: string; name: string; duration: number; description: string }
interface Proposal {
  id: string; code: string; clientName: string; services: ServiceItem[]
  generalDescription: string; installments: number
  totalValue: number; status: string; createdAt: string
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <span className="font-urbanist text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-urbanist)' }}>
      <span style={{ color: 'var(--content-strong)' }}>Grupo </span>
      <span style={{ color: 'var(--interactive-pressed)' }}>Cisne</span>
    </span>
  )
}

// ─── Input style (reutilizado no form) ────────────────────────────────────────
const inputCls: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface-overlay)',
  border: '1px solid var(--border-default)',
  color: 'var(--content-strong)',
  borderRadius: 12,
  padding: '10px 16px',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-inter, sans-serif)',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PropostaPage() {
  const { code } = useParams<{ code: string }>()
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [step, setStep]         = useState<'view' | 'form' | 'done' | 'rejected'>('view')
  const [form, setForm]         = useState({ name: '', company: '', email: '', whatsapp: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    if (!code) { setNotFound(true); setLoading(false); return }
    fetch(`${API}/api/proposals/view/${code}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: Proposal) => {
        setProposal(data)
        if (data.status === 'approved') setStep('done')
        if (data.status === 'rejected') setStep('rejected')
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [code])

  async function handleApprove() {
    if (!form.name.trim()) { setError('Informe seu nome.'); return }
    setError(''); setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/proposals/${code}/approve-direct`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStep('done')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao aprovar. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleReject() {
    setSubmitting(true)
    try {
      await fetch(`${API}/api/proposals/${code}/reject`, { method: 'PUT' })
      setStep('rejected')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-page">
      <div className="w-8 h-8 rounded-full border-2 border-interactive-default border-t-transparent animate-spin" />
    </div>
  )

  // ── Not found ────────────────────────────────────────────────────────────
  if (notFound || !proposal) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-page px-6 gap-4">
      <span className="text-5xl">🔍</span>
      <h1 className="font-urbanist text-xl font-semibold text-content-strong" style={{ fontFamily: 'var(--font-urbanist)' }}>
        Proposta não encontrada
      </h1>
      <p className="text-content-subtle text-sm text-center">
        Verifique o link ou entre em contato com a agência.
      </p>
    </div>
  )

  // ── Done ─────────────────────────────────────────────────────────────────
  if (step === 'done') return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-page px-6 gap-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: 'rgba(34,197,94,0.12)', border: '1.5px solid rgba(34,197,94,0.35)' }}>
        ✅
      </div>
      <div className="text-center">
        <h1 className="font-urbanist text-2xl font-semibold text-content-strong mb-2" style={{ fontFamily: 'var(--font-urbanist)' }}>
          Proposta aprovada!
        </h1>
        <p className="text-content-default text-sm max-w-xs leading-relaxed">
          Obrigado! Em breve nossa equipe entrará em contato para os próximos passos.
        </p>
      </div>
    </div>
  )

  // ── Rejected ─────────────────────────────────────────────────────────────
  if (step === 'rejected') return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-page px-6 gap-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.25)' }}>
        ❌
      </div>
      <div className="text-center">
        <h1 className="font-urbanist text-2xl font-semibold text-content-strong mb-2" style={{ fontFamily: 'var(--font-urbanist)' }}>
          Proposta recusada
        </h1>
        <p className="text-content-subtle text-sm text-center">
          Se mudar de ideia, entre em contato com a Grupo Cisne.
        </p>
      </div>
    </div>
  )

  // ── Main view ────────────────────────────────────────────────────────────
  const subtotal        = proposal.totalValue ?? 0
  const pixDiscount     = subtotal * 0.05
  const pixTotal        = subtotal - pixDiscount
  const installmentValue = subtotal / (proposal.installments || 1)
  const dateStr = new Date(proposal.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-surface-page">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 glass-strong" style={{ borderRadius: 0 }}>
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Logo />
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{
            background: 'rgba(245,158,11,0.10)',
            color: '#F59E0B',
            border: '1px solid rgba(245,158,11,0.22)',
          }}>
            Aguardando aprovação
          </span>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-2xl mx-auto px-5 pt-10 pb-40">

        {/* Greeting */}
        <section className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--interactive-default)' }}>
            Proposta Comercial · {proposal.code}
          </p>
          <h1 className="font-urbanist text-3xl font-semibold text-content-strong mb-2 tracking-tight" style={{ fontFamily: 'var(--font-urbanist)' }}>
            {proposal.clientName ? `Olá, ${proposal.clientName}!` : 'Sua Proposta'}
          </h1>
          <p className="text-content-default text-sm">Preparamos esta proposta especialmente para você.</p>
          <p className="text-content-subtle text-xs mt-1">Emitida em {dateStr}</p>
        </section>

        {/* Services */}
        <section className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-content-subtle mb-4">
            Serviços inclusos
          </p>
          <div className="flex flex-col gap-3">
            {proposal.services.map(svc => {
              const color = svcColor(svc.name)
              return (
                <div key={svc.id} className="glass-card px-5 py-4" style={{ borderColor: `${color}22`, borderRadius: 16 }}>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-lg" style={{ background: `${color}18`, color }}>
                      {svc.name}
                    </span>
                    {svc.duration > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md text-content-subtle" style={{ background: 'var(--surface-overlay)' }}>
                        {svc.duration} {svc.duration === 1 ? 'mês' : 'meses'}
                      </span>
                    )}
                  </div>
                  {svc.description && (
                    <p className="text-sm text-content-default leading-relaxed">{svc.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* General description */}
        {proposal.generalDescription && (
          <section className="mb-8">
            <div className="glass-card px-5 py-4" style={{ borderRadius: 16 }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-content-subtle mb-2">
                Observações
              </p>
              <p className="text-sm text-content-default leading-relaxed">{proposal.generalDescription}</p>
            </div>
          </section>
        )}

        {/* Payment */}
        <section className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-content-subtle mb-4">
            Condições de pagamento
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* PIX */}
            <div className="glass-card px-5 py-5" style={{ borderColor: 'rgba(34,197,94,0.30)', borderRadius: 16 }}>
              <p className="text-xs font-semibold mb-1" style={{ color: '#22C55E' }}>PIX · À vista</p>
              <p className="text-[11px] text-content-subtle mb-3">5% de desconto</p>
              <p className="font-urbanist text-2xl font-semibold mb-1" style={{ fontFamily: 'var(--font-urbanist)', color: '#22C55E' }}>
                {fmt(pixTotal)}
              </p>
              <p className="text-[11px] text-content-subtle">Economia de {fmt(pixDiscount)}</p>
            </div>
            {/* Cartão */}
            <div className="glass-card px-5 py-5" style={{ borderColor: 'rgba(58,136,196,0.30)', borderRadius: 16 }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--interactive-hover)' }}>
                Cartão · {proposal.installments}x
              </p>
              <p className="text-[11px] text-content-subtle mb-3">Sem juros</p>
              <p className="font-urbanist text-2xl font-semibold mb-1" style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--interactive-hover)' }}>
                {fmt(installmentValue)}<span className="text-xs font-normal">/mês</span>
              </p>
              <p className="text-[11px] text-content-subtle">Total: {fmt(subtotal)}</p>
            </div>
          </div>
        </section>

        {/* Approval form */}
        {step === 'form' && (
          <section className="glass-card px-6 py-6 mb-4" style={{ borderColor: 'var(--border-strong)', borderRadius: 20 }}>
            <h2 className="font-urbanist font-semibold text-content-strong mb-1" style={{ fontFamily: 'var(--font-urbanist)', fontSize: 16 }}>
              Confirmar aprovação
            </h2>
            <p className="text-content-subtle text-sm mb-5">Preencha seus dados para confirmar.</p>
            <div className="flex flex-col gap-3">
              <input style={inputCls} placeholder="Nome completo *"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input style={inputCls} placeholder="Empresa"
                value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
              <input style={inputCls} placeholder="E-mail" type="email"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input style={inputCls} placeholder="WhatsApp (ex: 71999998888)" type="tel"
                value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} />
            </div>
            {error && (
              <p className="text-xs mt-3" style={{ color: '#EF4444' }}>⚠ {error}</p>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => { setStep('view'); setError('') }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-content-default transition-colors"
                style={{ background: 'var(--surface-overlay)', border: '1px solid var(--border-default)' }}
              >
                Voltar
              </button>
              <button
                onClick={handleApprove}
                disabled={submitting}
                className="flex-[2] py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
                style={{ background: 'linear-gradient(135deg,#22C55E,#16a34a)', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {submitting ? 'Confirmando…' : '✓ Confirmar aprovação'}
              </button>
            </div>
          </section>
        )}
      </main>

      {/* ── Sticky bottom bar ── */}
      {step === 'view' && (
        <div className="fixed bottom-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to top, var(--surface-page) 65%, transparent)', padding: '20px 16px 24px' }}>
          <div className="max-w-2xl mx-auto flex gap-3">
            <button
              onClick={handleReject}
              disabled={submitting}
              className="px-5 py-3.5 rounded-2xl text-sm font-semibold transition-colors"
              style={{ background: 'rgba(239,68,68,0.07)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.20)', minWidth: 110, cursor: 'pointer' }}
            >
              ✕ Recusar
            </button>
            <button
              onClick={() => setStep('form')}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#22C55E,#16a34a)', boxShadow: '0 0 28px rgba(34,197,94,0.25)', cursor: 'pointer' }}
            >
              ✓ Aprovar proposta →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

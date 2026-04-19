'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL ?? ''

const SERVICE_COLORS: Record<string, string> = {
  'Social Media': '#EC4899', 'Tráfego Pago': '#F97316', 'Web Design': '#3B82F6',
  'Branding': '#A78BFA', 'Designer': '#22D3EE', 'Copywriter': '#F59E0B',
  'SEO': '#22C55E', 'E-mail Marketing': '#E879F9',
}
const svcColor = (name: string) => SERVICE_COLORS[name] ?? '#94A3B8'
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

interface ServiceItem { id: string; name: string; duration: number; description: string }
interface Proposal {
  id: string; code: string; clientName: string; services: ServiceItem[]
  generalDescription: string; installments: number
  totalValue: number; status: string; createdAt: string
}

export default function PropostaPage() {
  const { code } = useParams<{ code: string }>()
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [step, setStep] = useState<'view' | 'form' | 'done' | 'rejected'>('view')
  const [form, setForm] = useState({ name: '', company: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code) { setNotFound(true); setLoading(false); return }
    fetch(`${API}/api/proposals/view/${code}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
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

  const bg = '#080B10'
  const input: React.CSSProperties = {
    width: '100%', background: '#111620', border: '1px solid rgba(255,255,255,0.08)',
    color: '#F1F5F9', borderRadius: 12, padding: '10px 16px', fontSize: 14, outline: 'none',
    boxSizing: 'border-box',
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg }}>
      <div style={{ width: 32, height: 32, border: '3px solid #3B82F6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (notFound || !proposal) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: bg, padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <h1 style={{ color: '#F1F5F9', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Proposta não encontrada</h1>
      <p style={{ color: '#475569', fontSize: 14, textAlign: 'center' }}>Verifique o link ou entre em contato com a agência.</p>
    </div>
  )

  if (step === 'done') return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: bg, padding: 24 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 36 }}>✅</div>
      <h1 style={{ color: '#F1F5F9', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Proposta aprovada!</h1>
      <p style={{ color: '#94A3B8', fontSize: 14, textAlign: 'center', maxWidth: 320, lineHeight: 1.6 }}>Obrigado! Em breve nossa equipe entrará em contato para os próximos passos.</p>
    </div>
  )

  if (step === 'rejected') return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: bg, padding: 24 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 36 }}>❌</div>
      <h1 style={{ color: '#F1F5F9', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Proposta recusada</h1>
      <p style={{ color: '#94A3B8', fontSize: 14, textAlign: 'center' }}>Se mudar de ideia, entre em contato com a Grupo Cisne.</p>
    </div>
  )

  const subtotal = proposal.totalValue ?? 0
  const pixDiscount = subtotal * 0.05
  const pixTotal = subtotal - pixDiscount
  const installmentValue = subtotal / (proposal.installments || 1)
  const today = new Date(proposal.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: 'system-ui, sans-serif' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🦢</div>
          <div>
            <p style={{ color: '#F1F5F9', fontSize: 12, fontWeight: 700, margin: 0 }}>Grupo Cisne</p>
            <p style={{ color: '#475569', fontSize: 10, margin: 0 }}>Agência Digital</p>
          </div>
        </div>
        <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)', fontWeight: 600 }}>
          Aguardando aprovação
        </span>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 160px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3B82F6', marginBottom: 8 }}>
            Proposta Comercial · {proposal.code}
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>
            {proposal.clientName ? `Olá, ${proposal.clientName}!` : 'Sua Proposta'}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>Preparamos esta proposta especialmente para você.</p>
          <p style={{ color: '#475569', fontSize: 12, marginTop: 6 }}>Emitida em {today}</p>
        </div>

        {/* Services */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 16 }}>Serviços inclusos</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {proposal.services.map(svc => {
              const color = svcColor(svc.name)
              return (
                <div key={svc.id} style={{ borderRadius: 16, padding: 20, background: '#0D1117', border: `1px solid ${color}28` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: svc.description ? 10 : 0, flexWrap: 'wrap' as const }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 8, background: `${color}18`, color }}>{svc.name}</span>
                    {svc.duration > 0 && (
                      <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', color: '#475569' }}>
                        {svc.duration} {svc.duration === 1 ? 'mês' : 'meses'}
                      </span>
                    )}
                  </div>
                  {svc.description && <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>{svc.description}</p>}
                </div>
              )
            })}
          </div>
        </div>

        {/* General description */}
        {proposal.generalDescription && (
          <div style={{ marginBottom: 24, borderRadius: 16, padding: 20, background: '#0D1117', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 8 }}>Observações</p>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>{proposal.generalDescription}</p>
          </div>
        )}

        {/* Payment */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 16 }}>Condições de pagamento</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ borderRadius: 16, padding: 20, background: '#0D1117', border: '1.5px solid rgba(34,197,94,0.3)' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', margin: '0 0 4px' }}>PIX · À vista</p>
              <p style={{ fontSize: 11, color: '#475569', margin: '0 0 12px' }}>5% de desconto</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#22C55E', margin: '0 0 4px' }}>{fmt(pixTotal)}</p>
              <p style={{ fontSize: 11, color: '#475569', margin: 0 }}>Economia de {fmt(pixDiscount)}</p>
            </div>
            <div style={{ borderRadius: 16, padding: 20, background: '#0D1117', border: '1.5px solid rgba(59,130,246,0.3)' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', margin: '0 0 4px' }}>Cartão · {proposal.installments}x</p>
              <p style={{ fontSize: 11, color: '#475569', margin: '0 0 12px' }}>Sem juros</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: '#3B82F6', margin: '0 0 4px' }}>{fmt(installmentValue)}<span style={{ fontSize: 12, fontWeight: 500 }}>/mês</span></p>
              <p style={{ fontSize: 11, color: '#475569', margin: 0 }}>Total: {fmt(subtotal)}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        {step === 'form' && (
          <div style={{ borderRadius: 16, padding: 24, background: '#0D1117', border: '1px solid rgba(59,130,246,0.25)', marginBottom: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9', margin: '0 0 4px' }}>Confirmar aprovação</p>
            <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 20px' }}>Preencha seus dados para confirmar.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input style={input} placeholder="Nome completo *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input style={input} placeholder="Empresa" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
              <input style={input} placeholder="E-mail" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            {error && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 12 }}>⚠ {error}</p>}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button onClick={() => { setStep('view'); setError('') }} style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Voltar</button>
              <button onClick={handleApprove} disabled={submitting} style={{ flex: 2, padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg,#22C55E,#16a34a)', color: '#fff', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 700 }}>
                {submitting ? 'Confirmando…' : '✓ Confirmar aprovação'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      {step === 'view' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, #080B10 60%, transparent)', zIndex: 20 }}>
          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', gap: 12 }}>
            <button onClick={handleReject} disabled={submitting} style={{ padding: '14px 20px', borderRadius: 16, background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: 14, fontWeight: 600, minWidth: 110 }}>
              ✕ Recusar
            </button>
            <button onClick={() => setStep('form')} style={{ flex: 1, padding: '14px', borderRadius: 16, background: 'linear-gradient(135deg,#22C55E,#16a34a)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, boxShadow: '0 0 32px rgba(34,197,94,0.3)' }}>
              ✓ Aprovar proposta →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// ─── Types ───────────────────────────────────────────────────────────────────

type Service = {
  id: string
  name: string
  duration: number
  description: string
}

type Proposal = {
  id: string
  code: string
  clientName: string
  services: Service[]
  generalDescription: string
  paymentMethod: 'pix' | 'credit_card'
  installments: number
  totalValue: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

type Screen =
  | 'loading'
  | 'not_found'
  | 'view'
  | 'approval_form'
  | 'otp'
  | 'success'
  | 'rejected'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SERVICE_COLORS: Record<string, string> = {
  'social media':      '#EC4899',
  'tráfego pago':      '#F97316',
  'trafego pago':      '#F97316',
  'web design':        '#3B82F6',
  'branding':          '#A78BFA',
  'designer':          '#22D3EE',
  'copywriter':        '#F59E0B',
  'seo':               '#22C55E',
  'e-mail marketing':  '#E879F9',
  'email marketing':   '#E879F9',
}

function getServiceColor(name: string): string {
  const key = name.toLowerCase()
  for (const [k, v] of Object.entries(SERVICE_COLORS)) {
    if (key.includes(k)) return v
  }
  return '#3B82F6'
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const API = process.env.NEXT_PUBLIC_API_URL ?? ''

// ─── Sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 3C10.5 3 5 7 4 13c4-2 8-1 10 3-3 1-6 4-5 8 3-2 7-2 9 1 2-4 1-9-1-13 3 1 6 4 6 8 2-5 1-12-7-17z"
          fill="#47A1E6"
        />
        <path
          d="M9 24c1 2 4 4 7 4s6-2 7-4c-2-1-5-2-7-1-2-1-5 0-7 1z"
          fill="#6AAEDE"
          opacity="0.7"
        />
      </svg>
      <span style={{ fontFamily: 'var(--font-urbanist, sans-serif)', fontWeight: 600, fontSize: 18, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
        Grupo Cisne
      </span>
    </div>
  )
}

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{
        width: 40, height: 40,
        border: '3px solid rgba(58,136,196,0.2)',
        borderTopColor: '#47A1E6',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProposalPage() {
  const params = useParams()
  const code = params.code as string

  const [screen, setScreen]     = useState<Screen>('loading')
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [error, setError]       = useState('')

  // approval form
  const [name, setName]       = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [sending, setSending] = useState(false)

  // otp
  const [otp, setOtp]           = useState('')
  const [verifying, setVerify]  = useState(false)
  const [otpError, setOtpError] = useState('')

  // rejection
  const [rejecting, setRejecting] = useState(false)

  // ── fetch proposal ──
  useEffect(() => {
    if (!code) return
    fetch(`${API}/api/proposals/view/${code}`)
      .then(r => {
        if (r.status === 404) { setScreen('not_found'); return null }
        if (!r.ok) throw new Error('Erro ao carregar proposta')
        return r.json()
      })
      .then((data: Proposal | null) => {
        if (!data) return
        setProposal(data)
        if (data.status === 'approved') setScreen('success')
        else if (data.status === 'rejected') setScreen('rejected')
        else setScreen('view')
      })
      .catch(() => { setScreen('not_found') })
  }, [code])

  // ── send code (step 3) ──
  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) { setError('Nome e WhatsApp são obrigatórios.'); return }
    setSending(true); setError('')
    try {
      const r = await fetch(`${API}/api/proposals/${code}/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone }),
      })
      if (!r.ok) throw new Error('Não foi possível enviar o código.')
      setScreen('otp')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar código.')
    } finally {
      setSending(false)
    }
  }

  // ── approve with OTP (step 5) ──
  async function handleApprove(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) { setOtpError('Digite o código de 6 dígitos.'); return }
    setVerify(true); setOtpError('')
    try {
      const r = await fetch(`${API}/api/proposals/${code}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationCode: otp }),
      })
      if (r.status === 400) { setOtpError('Código inválido ou expirado.'); return }
      if (!r.ok) throw new Error('Erro ao aprovar.')
      setScreen('success')
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : 'Erro ao aprovar.')
    } finally {
      setVerify(false)
    }
  }

  // ── reject ──
  async function handleReject() {
    if (!confirm('Tem certeza que deseja recusar esta proposta?')) return
    setRejecting(true)
    try {
      await fetch(`${API}/api/proposals/${code}/reject`, { method: 'PUT' })
      setScreen('rejected')
    } catch {
      alert('Erro ao recusar. Tente novamente.')
    } finally {
      setRejecting(false)
    }
  }

  // ── computed values ──
  const pix          = proposal ? proposal.totalValue * 0.95 : 0
  const pixDiscount  = proposal ? proposal.totalValue * 0.05 : 0
  const installment  = proposal ? proposal.totalValue / (proposal.installments || 1) : 0

  // ─────────────────────────────────────────────────────────────────────────
  // Render helpers
  // ─────────────────────────────────────────────────────────────────────────

  function renderLoading() {
    return (
      <main style={s.page}>
        <header style={s.header}><div style={s.headerInner}><Logo /></div></header>
        <div style={s.center}><Spinner /></div>
      </main>
    )
  }

  function renderNotFound() {
    return (
      <main style={s.page}>
        <header style={s.header}><div style={s.headerInner}><Logo /></div></header>
        <div style={s.center}>
          <div style={s.card}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h2 style={s.h2}>Proposta não encontrada</h2>
            <p style={s.muted}>Verifique o link ou entre em contato com a agência.</p>
          </div>
        </div>
      </main>
    )
  }

  function renderSuccess() {
    return (
      <main style={s.page}>
        <header style={s.header}><div style={s.headerInner}><Logo /></div></header>
        <div style={s.center}>
          <div style={s.card}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ ...s.h2, color: '#22C55E' }}>Proposta Aprovada!</h2>
            <p style={s.muted}>
              Obrigado, <strong style={{ color: '#F8FAFC' }}>{proposal?.clientName}</strong>.
              Nossa equipe entrará em contato em breve para dar início ao seu projeto.
            </p>
          </div>
        </div>
      </main>
    )
  }

  function renderRejected() {
    return (
      <main style={s.page}>
        <header style={s.header}><div style={s.headerInner}><Logo /></div></header>
        <div style={s.center}>
          <div style={s.card}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>❌</div>
            <h2 style={{ ...s.h2, color: '#EF4444' }}>Proposta Recusada</h2>
            <p style={s.muted}>
              Proposta recusada. Se mudar de ideia ou quiser conversar, entre em contato conosco.
            </p>
          </div>
        </div>
      </main>
    )
  }

  function renderApprovalForm() {
    return (
      <main style={s.page}>
        <header style={s.header}><div style={s.headerInner}><Logo /></div></header>
        <div style={{ ...s.center, paddingBottom: 32 }}>
          <div style={{ ...s.card, maxWidth: 440 }}>
            <h2 style={s.h2}>Confirmar aprovação</h2>
            <p style={{ ...s.muted, marginBottom: 24 }}>
              Preencha seus dados para receber o código de confirmação via WhatsApp.
            </p>
            <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Nome completo *" value={name} onChange={setName} placeholder="Seu nome" />
              <Field label="Empresa" value={company} onChange={setCompany} placeholder="Nome da empresa (opcional)" />
              <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com (opcional)" type="email" />
              <Field label="WhatsApp *" value={phone} onChange={setPhone} placeholder="+55 (11) 99999-9999" type="tel" />
              {error && <p style={{ color: '#EF4444', fontSize: 13 }}>{error}</p>}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="button" onClick={() => setScreen('view')} style={s.btnSecondary}>
                  Voltar
                </button>
                <button type="submit" disabled={sending} style={s.btnPrimary}>
                  {sending ? 'Enviando…' : 'Enviar código'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }

  function renderOtp() {
    return (
      <main style={s.page}>
        <header style={s.header}><div style={s.headerInner}><Logo /></div></header>
        <div style={s.center}>
          <div style={{ ...s.card, maxWidth: 400, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
            <h2 style={s.h2}>Código de verificação</h2>
            <p style={{ ...s.muted, marginBottom: 24 }}>
              Enviamos um código de 6 dígitos para o seu WhatsApp.
            </p>
            <form onSubmit={handleApprove} style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                style={{
                  ...s.input,
                  textAlign: 'center',
                  fontSize: 28,
                  letterSpacing: 12,
                  width: '100%',
                  maxWidth: 220,
                }}
              />
              {otpError && <p style={{ color: '#EF4444', fontSize: 13 }}>{otpError}</p>}
              <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'center' }}>
                <button type="button" onClick={() => setScreen('approval_form')} style={s.btnSecondary}>
                  Voltar
                </button>
                <button type="submit" disabled={verifying} style={s.btnGreen}>
                  {verifying ? 'Verificando…' : 'Confirmar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }

  function renderView() {
    if (!proposal) return null
    const dateStr = new Date(proposal.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

    return (
      <main style={s.page}>
        <header style={s.header}>
          <div style={s.headerInner}>
            <Logo />
            <span style={{ fontSize: 12, color: '#7D8FA9', fontFamily: 'var(--font-inter, sans-serif)' }}>
              #{proposal.code} · {dateStr}
            </span>
          </div>
        </header>

        <div style={s.content}>
          {/* Greeting */}
          <section style={{ marginBottom: 32 }}>
            <p style={{ color: '#7D8FA9', fontSize: 14, fontFamily: 'var(--font-inter, sans-serif)', marginBottom: 6 }}>
              Proposta comercial para
            </p>
            <h1 style={{ ...s.h1, marginBottom: 8 }}>{proposal.clientName}</h1>
            {proposal.generalDescription && (
              <p style={{ color: '#B1C0D0', fontSize: 15, lineHeight: 1.6, fontFamily: 'var(--font-inter, sans-serif)', maxWidth: 640 }}>
                {proposal.generalDescription}
              </p>
            )}
          </section>

          {/* Services */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>Serviços incluídos</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {proposal.services.map(svc => {
                const color = getServiceColor(svc.name)
                return (
                  <div key={svc.id} style={s.serviceCard}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <div style={{ width: 4, borderRadius: 2, background: color, alignSelf: 'stretch', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'var(--font-urbanist, sans-serif)', fontWeight: 600, fontSize: 16, color: '#F8FAFC' }}>
                            {svc.name}
                          </span>
                          <span style={{ ...s.badge, background: color + '22', color }}>
                            {svc.duration} {svc.duration === 1 ? 'mês' : 'meses'}
                          </span>
                        </div>
                        {svc.description && (
                          <p style={{ color: '#B1C0D0', fontSize: 14, lineHeight: 1.55, fontFamily: 'var(--font-inter, sans-serif)', margin: 0 }}>
                            {svc.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Payment */}
          <section style={{ marginBottom: 120 }}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>Condições de pagamento</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {/* PIX */}
              <div style={{ ...s.payCard, border: proposal.paymentMethod === 'pix' ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(148,163,184,0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>⚡</span>
                  <span style={{ fontFamily: 'var(--font-urbanist, sans-serif)', fontWeight: 600, color: '#F8FAFC', fontSize: 16 }}>PIX à vista</span>
                  {proposal.paymentMethod === 'pix' && (
                    <span style={{ ...s.badge, background: 'rgba(34,197,94,0.15)', color: '#22C55E', marginLeft: 'auto' }}>Recomendado</span>
                  )}
                </div>
                <p style={{ fontSize: 28, fontFamily: 'var(--font-urbanist, sans-serif)', fontWeight: 600, color: '#22C55E', marginBottom: 4 }}>
                  {fmt(pix)}
                </p>
                <p style={{ fontSize: 13, color: '#7D8FA9', fontFamily: 'var(--font-inter, sans-serif)' }}>
                  {fmt(pixDiscount)} de desconto (5%)
                </p>
              </div>

              {/* Card */}
              <div style={{ ...s.payCard, border: proposal.paymentMethod === 'credit_card' ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(148,163,184,0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>💳</span>
                  <span style={{ fontFamily: 'var(--font-urbanist, sans-serif)', fontWeight: 600, color: '#F8FAFC', fontSize: 16 }}>Cartão parcelado</span>
                  {proposal.paymentMethod === 'credit_card' && (
                    <span style={{ ...s.badge, background: 'rgba(99,102,241,0.15)', color: '#818CF8', marginLeft: 'auto' }}>Recomendado</span>
                  )}
                </div>
                <p style={{ fontSize: 28, fontFamily: 'var(--font-urbanist, sans-serif)', fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
                  {proposal.installments}× {fmt(installment)}
                </p>
                <p style={{ fontSize: 13, color: '#7D8FA9', fontFamily: 'var(--font-inter, sans-serif)' }}>
                  Total: {fmt(proposal.totalValue)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom bar */}
        <div style={s.bottomBar}>
          <div style={s.bottomInner}>
            <button
              onClick={handleReject}
              disabled={rejecting}
              style={s.btnReject}
            >
              {rejecting ? 'Aguarde…' : 'Recusar proposta'}
            </button>
            <button
              onClick={() => setScreen('approval_form')}
              style={s.btnApprove}
            >
              Aprovar proposta
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ─── Router ───────────────────────────────────────────────────────────────
  switch (screen) {
    case 'loading':       return renderLoading()
    case 'not_found':     return renderNotFound()
    case 'success':       return renderSuccess()
    case 'rejected':      return renderRejected()
    case 'approval_form': return renderApprovalForm()
    case 'otp':           return renderOtp()
    case 'view':          return renderView()
  }
}

// ─── Field helper ─────────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, color: '#B1C0D0', fontFamily: 'var(--font-inter, sans-serif)', fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={s.input}
      />
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: '100vh',
    background: '#080B10',
    fontFamily: 'var(--font-inter, sans-serif)',
  } as React.CSSProperties,

  header: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0,
    zIndex: 50,
    background: 'rgba(8,11,16,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(148,163,184,0.10)',
  },

  headerInner: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,

  content: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '96px 20px 0',
  } as React.CSSProperties,

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '100px 20px 40px',
    minHeight: '100vh',
  } as React.CSSProperties,

  card: {
    background: '#0C121D',
    border: '1px solid rgba(148,163,184,0.12)',
    borderRadius: 16,
    padding: '32px 28px',
    width: '100%',
  } as React.CSSProperties,

  h1: {
    fontFamily: 'var(--font-urbanist, sans-serif)',
    fontWeight: 600,
    fontSize: 30,
    color: '#F8FAFC',
    letterSpacing: '-0.02em',
    margin: 0,
  } as React.CSSProperties,

  h2: {
    fontFamily: 'var(--font-urbanist, sans-serif)',
    fontWeight: 600,
    fontSize: 20,
    color: '#F8FAFC',
    letterSpacing: '-0.01em',
    margin: 0,
  } as React.CSSProperties,

  muted: {
    color: '#B1C0D0',
    fontSize: 15,
    lineHeight: 1.6,
    fontFamily: 'var(--font-inter, sans-serif)',
    margin: 0,
  } as React.CSSProperties,

  serviceCard: {
    background: '#0C121D',
    border: '1px solid rgba(148,163,184,0.10)',
    borderRadius: 12,
    padding: '16px 18px',
  } as React.CSSProperties,

  payCard: {
    background: '#0C121D',
    borderRadius: 12,
    padding: '20px',
  } as React.CSSProperties,

  badge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: 999,
    fontFamily: 'var(--font-inter, sans-serif)',
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  input: {
    background: '#131B2B',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#F8FAFC',
    fontSize: 14,
    fontFamily: 'var(--font-inter, sans-serif)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,

  bottomBar: {
    position: 'fixed' as const,
    bottom: 0, left: 0, right: 0,
    background: 'rgba(8,11,16,0.92)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(148,163,184,0.10)',
    zIndex: 50,
  },

  bottomInner: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
  } as React.CSSProperties,

  btnPrimary: {
    flex: 1,
    background: '#3A88C4',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-inter, sans-serif)',
  } as React.CSSProperties,

  btnSecondary: {
    background: 'transparent',
    color: '#B1C0D0',
    border: '1px solid rgba(148,163,184,0.25)',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-inter, sans-serif)',
  } as React.CSSProperties,

  btnGreen: {
    flex: 1,
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-inter, sans-serif)',
  } as React.CSSProperties,

  btnReject: {
    background: 'transparent',
    color: '#EF4444',
    border: '1px solid rgba(239,68,68,0.4)',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-inter, sans-serif)',
  } as React.CSSProperties,

  btnApprove: {
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 28px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-inter, sans-serif)',
  } as React.CSSProperties,
}

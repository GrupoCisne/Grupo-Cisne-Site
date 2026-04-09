'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ========================
// Types
// ========================

interface LeadCapture {
  nome: string
  whatsapp: string
  email: string
}

interface ChatMessage {
  id: string
  type: 'ia' | 'user'
  text: string
}

interface ConversationMessage {
  role: 'system' | 'assistant' | 'user'
  content: string
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_MODEL = 'qwen/qwen3.6-plus:free'

// ========================
// System Prompt
// ========================

const SYSTEM_PROMPT = `Você é o Briefer do Grupo Cisne, uma agência premium de marketing digital.

## SEU PAPEL
Conduza uma conversa de qualificação profunda com o lead. A conversa tem 7 fases internas e no final é gerada uma ficha de qualificação.

## REGRAS
1. SEMPRE faça APENAS 1 pergunta por vez. NUNCA faça mais de 1 pergunta simultaneamente.
2. Seja CONVERSACIONAL e natural, nunca robótico. Não soe como um formulário.
3. Adapte perguntas ao que o lead já disse antes. NUNCA repita.
4. Tom profissional e acolhedor.
5. Use **negrito** para pontos-chave.
6. Quando mudar de assunto, diga algo como "Agora que entendi X, me conta..."
7. NUNCA revele que existem "fases" ou "agentes".
8. Use português brasileiro.

## FLUXO (7 fases internas)

### Fase 1: Ana Intake (Dados básicos)
O lead já informou nome, WhatsApp e email antes (dados capturados via formulário). Apenas confirme e inicie naturalmente a conversa sobre o negócio.

### Fase 2: Bruno Negócio (O negócio em si)
Mapear o negócio em profundidade. Uma pergunta por vez:
- "Qual é o segmento de atuação e há quanto tempo a empresa existe?"
- "Que produto ou serviço vocês vendem?"
- "Para quem vocês vendem? Descreva o cliente ideal: perfil, cargo, dor."
- "Qual é o ticket médio por cliente ou por venda?"
- "Vocês vendem B2B, B2C ou ambos?"

### Fase 3: Carla Mercado (Posicionamento)
- "Como se diferenciam dos concorrentes? O que faz um cliente escolher vocês?"
- "Qual canal traz mais clientes hoje? Indicação, redes, tráfego pago?"
- "Vocês já investiram em marketing digital? O que já foi feito?"
- "Têm site, CRM, ferramenta de gestão de leads?"

### Fase 4: Diego Objetivos (Momento)
- "Qual é o principal desafio do negócio hoje?"
- "Qual o objetivo de curto prazo (3 meses), médio (6-12 meses) e longo prazo (2-3 anos)?"
- "Existe meta de faturamento para este ano?"
- "Alguma decisão ou mudança prevista para os próximos meses?"

### Fase 5: Elena Expectativas (Relação com agência)
- "Se trabalhasse com uma agência de marketing, como você mediria sucesso?"
- "Já trabalhou com alguma agência antes? O que funcionou e o que não funciona?"
- "O que mais importa: resultado rápido, previsibilidade, parceria estratégica?"
- "Tem restrição de orçamento ou prazo?"

### Fase 6: Felipe Arquétipos (Perfil de liderança)
NÃO revele que é um mapeamento. Faça parecer conversa natural:
- "Me conta um pouco de você — qual é seu papel na empresa e como chegou até aqui?"
- "Quando pensa no futuro, o que te anima: escalar, construir algo novo, liderar ou garantir estabilidade?"
- "Na hora de decidir, tende a ir pela intuição e visão de futuro, ou prefere dados?"
- "O que é 'vitória' para você — um número, reconhecimento, transformação?"
- "Qual é sua maior aspiração profissional nos próximos 3 anos?"

Ao FINAL destas 5 perguntas, identificar o arquétipo dominante entre os 6:
- O Conquistador: resultados, market share, performance
- O Construtor: processo, estrutura, previsibilidade
- O Visionário: inovação, propósito, transformação
- O Guardião: segurança, proteção, estabilidade
- O Acelerador: velocidade, oportunidade, execução rápida
- O Estrategista: planejamento, precisão, vantagem competitiva

### Fase 7: Gabi Geradora (JSON)

Após TODAS as fases completas, gerar o JSON no EXATO formato abaixo ao final da sua ÚLTIMA mensagem:

## JSON FINAL (apenas no final)
{
  "lead": {
    "nome": "",
    "whatsapp": "",
    "email": "",
    "nome_empresa": "",
    "segmento": "",
    "tempo_mercado": "",
    "modelo_venda": "",
    "cliente_ideal": "",
    "ticket_medio": "",
    "modelo_b2b_b2c": "",
    "diferencial": "",
    "canal_aquisicao": "",
    "maturidade_digital": "",
    "ferramentas_atuais": []
  },
  "momento": {
    "principal_desafio": "",
    "objetivo_curto_prazo": "",
    "objetivo_medio_prazo": "",
    "objetivo_longo_prazo": "",
    "meta_faturamento": "",
    "decisoes_previstas": ""
  },
  "expectativas": {
    "resultado_ideal": "",
    "experiencia_anterior_agencia": "",
    "critério_decisao": "",
    "restricoes": ""
  },
  "arquetipos": {
    "dominante": "",
    "secundario": "",
    "score_detalhado": {}
  },
  "aspiracoes": {
    "papel_na_empresa": "",
    "o_que_anima": "",
    "estilo_decisao": "",
    "definicao_de_vitoria": "",
    "aspiracao_profissional": ""
  },
  "qualificacao": {
    "score_fit": 0,
    "flags": [],
    "proximo_passo": "",
    "notas_para_comercial": ""
  }
}

## REGRAS DE SCORE (0-10):
- Maturidade digital médio/avançado: +2
- Tem objetivo claro definido: +1
- Orçamento confirmado: +1
- Experiência anterior com agência: +1
- Ticket médio acima de R$1.000: +1
- Já investe em marketing digital: +1
- Tomador de decisão na conversa: +1
- Ticket acima de R$500: +1
- Tem CRM: +1
- Tempo de mercado > 2 anos: +1

## PRÓXIMO PASSO (baseado no score):
- Score 7-10: "Agendar reunião estratégica — lead qualificado"
- Score 4-6: "Nutrir com conteúdo — potencial futuro"
- Score 0-3: "Não qualificado — registro para revisão em 6 meses"

O JSON deve aparecer APENAS na última resposta. Após gerar o JSON, agradeça ao lead e informe o próximo passo de forma acolhedora.`

// ========================
// Lead Capture Screen
// ========================

function LeadCapture({ onSubmit }: { onSubmit: (data: LeadCapture) => void }) {
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const nomeRef = useRef<HTMLInputElement>(null)
  const whatsappRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nome = nomeRef.current?.value.trim()
    const wa = whatsapp.trim()
    const em = email.trim()
    if (nome && wa && em) {
      onSubmit({ nome, whatsapp: wa, email: em })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,53,96,0.40) 0%, transparent 50%), var(--surface-page)' }}
      />
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative w-full max-w-md qf-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[var(--interactive-default)] to-[var(--interactive-hover)] flex items-center justify-center text-2xl font-bold text-[var(--surface-page)] shadow-xl" style={{ boxShadow: `0 0 40px rgba(36,112,168,0.3)` }}>
            GC
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-4">Qualificação de Lead</h1>
          <p className="text-sm text-[var(--content-subtle)] mt-2">Grupo Cisne — Agência de Marketing Digital</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--content-default)] mb-1.5">Seu nome</label>
            <input
              ref={nomeRef}
              type="text"
              placeholder="Como gostaria de ser chamado?"
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--content-strong)] placeholder-[var(--content-subtle)] focus:border-[var(--interactive-default)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-default)] transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--content-default)] mb-1.5">WhatsApp</label>
            <input
              ref={whatsappRef}
              type="tel"
              placeholder="(00) 00000-0000"
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--content-strong)] placeholder-[var(--content-subtle)] focus:border-[var(--interactive-default)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-default)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--content-default)] mb-1.5">E-mail</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--content-strong)] placeholder-[var(--content-subtle)] focus:border-[var(--interactive-default)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-default)] transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl btn-primary py-3.5 text-sm font-semibold transition-all active:scale-[0.98]"
          >
            Iniciar Conversa →
          </button>
        </form>

        {/* Info badges */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {[
            { label: '~10 min', sub: 'Tempo estimado' },
            { label: 'Conversacional', sub: '7 tópicos' },
            { label: 'Confidencial', sub: 'Seus dados' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xs font-medium text-[var(--content-default)]">{item.label}</p>
              <p className="text-[10px] text-[var(--content-subtle)]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ========================
// Result Screen
// ========================

function QualificationResult({
  json,
  data,
  onReset,
}: {
  json: Record<string, unknown>
  data: LeadCapture
  onReset: () => void
}) {
  const q = (json as Record<string, Record<string, unknown>>).qualificacao || {}
  const nextStep = (q.proximo_passo as string) || ''
  const score = (q.score_fit as number) || 0
  const arquit = ((json as Record<string, Record<string, unknown>>).arquetipos || {}) as Record<string, string>
  const arq = arquit.dominante || ''
  const [showJSON, setShowJSON] = useState(false)

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 relative overflow-y-auto">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(600px circle at 50% 30%, rgba(36,112,168,0.12), transparent 50%)' }}
      />

      <div className="relative max-w-2xl w-full space-y-6 qf-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[var(--interactive-default)] to-[var(--interactive-hover)] flex items-center justify-center text-2xl" style={{ boxShadow: `0 0 40px rgba(36,112,168,0.3)` }}>
            ✓
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Qualificação Concluída</h2>
          {nextStep && <p className="text-sm text-[var(--content-default)] max-w-sm mx-auto">{nextStep}</p>}

          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: 'var(--interactive-default)' }}>{score}/10</p>
              <p className="text-[11px] text-[var(--content-subtle)]">Score de Fit</p>
            </div>
            <div className="w-px h-8 bg-[var(--border-default)]" />
            {arq && (
              <div className="text-center">
                <p className="text-sm font-medium text-[var(--content-default)]">{arq}</p>
                <p className="text-[11px] text-[var(--content-subtle)]">Arquétipo</p>
              </div>
            )}
          </div>
        </div>

        {/* JSON card */}
        <div className="rounded-xl border border-[var(--border-strong)] overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <button
            onClick={() => setShowJSON(!showJSON)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-colors"
          >
            <span className="text-sm font-medium text-[var(--content-default)]">JSON de Qualificação</span>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); downloadJSON(json) }}
                className="px-3 py-1.5 text-[11px] font-semibold rounded-lg text-[var(--interactive-default)] hover:bg-[var(--interactive-muted)] transition-colors border border-[var(--border-strong)]"
              >
                ↓ JSON
              </button>
              <svg className={`w-4 h-4 text-[var(--content-subtle)] transition-transform ${showJSON ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </button>
          {showJSON && (
            <div className="px-5 pb-5">
              <pre className="text-[10px] text-[var(--content-subtle)] whitespace-pre-wrap max-h-96 overflow-auto font-mono leading-relaxed rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-default)' }}>
                {JSON.stringify(json, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center pt-2">
          <button onClick={() => downloadJSON(json)} className="rounded-xl btn-primary px-8 py-3 text-sm font-semibold transition-all active:scale-[0.98]">
            Baixar JSON
          </button>
          <button onClick={onReset} className="rounded-xl btn-secondary px-8 py-3 text-sm font-medium transition-all">
            Nova Qualificação
          </button>
        </div>
      </div>
    </div>
  )
}

// ========================
// Chat Screen
// ========================

function ChatScreen({ lead, onDone }: { lead: LeadCapture; onDone: (json: Record<string, unknown>) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [isTyping])

  // Initial greeting
  useEffect(() => {
    const enriched = SYSTEM_PROMPT.replace(
      '### Fase 1: Ana Intake (Dados básicos)',
      `### Fase 1: Ana Intake (Dados básicos)\n→ O lead JÁ se identificou pelo formulário de captura:\n→ Nome: **${lead.nome}**\n→ WhatsApp: **${lead.whatsapp}**\n→ Email: **${lead.email}**\n→ Confirme brevemente e inicie a conversa sobre o negócio de forma natural. PULE esta fase rapidamente.`
    )
    setConversation([{ role: 'system', content: enriched }])

    const greeting = `Olá, **${lead.nome}**! Obrigado pelo interesse no Grupo Cisne.\n\nVou fazer algumas perguntas para entender seu negócio e preparar uma proposta personalizada. Leva uns 10 minutos — é a base de tudo.\n\nVamos começar? Qual é o nome da sua empresa e o que ela faz em poucas palavras?`

    setMessages([{ id: 'greet', type: 'ia', text: greeting }])
  }, [lead])

  const sendToOI = useCallback(async (msgs: ConversationMessage[]): Promise<string> => {
    abortRef.current = new AbortController()
    const to = setTimeout(() => abortRef.current?.abort(), 45000)

    try {
      const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ''
      if (!key) throw new Error('API key não configurada')

      const res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'HTTP-Referer': 'https://grupocisne.com.br',
          'X-Title': 'Qualificacao - Grupo Cisne',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: msgs,
          max_tokens: 800,
          temperature: 0.8,
        }),
        signal: abortRef.current.signal,
      })

      if (res.status === 401) throw new Error('API key inválida')
      if (!res.ok) {
        const t = await res.text().catch(() => res.statusText)
        throw new Error(`API ${res.status}: ${t}`)
      }

      const d = await res.json()
      return d.choices?.[0]?.message?.content || 'Desculpe, não consegui. Tente novamente.'
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError')
        throw new Error('Timeout! Tente novamente.')
      throw err
    } finally {
      clearTimeout(to)
    }
  }, [])

  const extractJSON = useCallback((raw: string): Record<string, unknown> | null => {
    try {
      const jsonMatch = raw.match(/\{[\s\S]*"lead"[\s\S]*"qualificacao"[\s\S]*\}/)
      if (jsonMatch) return JSON.parse(jsonMatch[0])
    } catch {}
    try {
      const m = raw.match(/\{[\s\S]*"qualificacao"[\s\S]*"score_fit"[\s\S]*\}/)
      if (m) return JSON.parse(m[0])
    } catch {}
    return null
  }, [])

  const handleAnswer = useCallback(
    async (answer: string) => {
      if (!answer.trim() || isTyping) return
      const trimmed = answer.trim()

      setIsTyping(true)
      setMessages((p) => [...p, { id: `u-${Date.now()}`, type: 'user', text: trimmed }])
      setInputValue('')

      const newConv = [...conversation, { role: 'user', content: trimmed }]
      setConversation(newConv)

      try {
        const aiResp = await sendToOI(newConv)
        const json = extractJSON(aiResp)
        if (json) {
          setMessages((p) => [...p, { id: `ia-${Date.now()}`, type: 'ia', text: aiResp }])
          setConversation((p) => [...p, { role: 'assistant', content: aiResp }])
          setTimeout(() => onDone(json), 2000)
          return
        }
        setMessages((p) => [...p, { id: `ia-${Date.now()}`, type: 'ia', text: aiResp }])
        setConversation((p) => [...p, { role: 'assistant', content: aiResp }])
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro desconhecido.'
        setMessages((p) => [...p, { id: `err-${Date.now()}`, type: 'ia', text: msg }])
      } finally {
        setIsTyping(false)
      }
    },
    [conversation, isTyping, sendToOI, extractJSON, onDone]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAnswer(inputValue)
    }
  }

  return (
    <div className="h-screen flex flex-col relative">
      {/* Top accent line */}
      {isTyping && (
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(36,112,168,0.5), transparent)' }} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-[var(--border-default)] z-10" style={{ background: 'rgba(12,22,34,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--interactive-default)] to-[var(--interactive-hover)] flex items-center justify-center text-[11px] font-bold text-[var(--surface-page)] flex-shrink-0" style={{ boxShadow: `0 0 12px rgba(36,112,168,0.3)` }}>
          GC
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold leading-tight truncate">{lead.nome}</h1>
          <span className="text-[11px] text-[var(--content-subtle)]">
            {isTyping ? (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--interactive-default)', boxShadow: '0 0 6px rgba(36,112,168,0.6)' }} />
                Processando...
              </span>
            ) : (
              'Conversa com Briefer IA'
            )}
          </span>
        </div>
        <span className="text-[11px] text-[var(--content-subtle)] tabular-nums">
          {messages.filter((m) => m.type === 'user').length} resp.
        </span>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-auto px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg, i) => (
            <div key={msg.id} className={`flex items-start gap-3 qf-fade-in ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.type === 'ia' && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--interactive-default)] to-[var(--interactive-hover)] flex items-center justify-center text-[11px] font-bold text-[var(--surface-page)] flex-shrink-0 mt-0.5 shadow">
                  B
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.type === 'ia'
                    ? 'rounded-tl-sm'
                    : 'rounded-tr-sm'
                }`}
                style={
                  msg.type === 'ia'
                    ? { background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-default)', backdropFilter: 'blur(16px)', color: 'var(--content-default)' }
                    : { background: 'linear-gradient(135deg, var(--interactive-default), var(--interactive-hover))', color: 'white' }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 qf-fade-in">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--interactive-default)] to-[var(--interactive-hover)] flex items-center justify-center text-[11px] font-bold text-[var(--surface-page)] flex-shrink-0 mt-0.5 shadow">
                B
              </div>
              <div className="rounded-2xl rounded-tl-sm px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-default)' }}>
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full qf-dot-1" style={{ background: 'var(--interactive-default)' }} />
                  <span className="w-1.5 h-1.5 rounded-full qf-dot-2" style={{ background: 'var(--interactive-default)' }} />
                  <span className="w-1.5 h-1.5 rounded-full qf-dot-3" style={{ background: 'var(--interactive-default)' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[var(--border-default)] px-4 py-3 z-10" style={{ background: 'var(--surface-page)' }}>
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={isTyping ? 'Aguarde a resposta...' : 'Digite sua resposta...'}
            disabled={isTyping}
            className="flex-1 min-h-[44px] max-h-32 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2.5 text-sm text-[var(--content-strong)] placeholder-[var(--content-subtle)] focus:border-[var(--interactive-default)] focus:outline-none focus:ring-1 focus:ring-[var(--interactive-default)] transition-all resize-none disabled:opacity-50"
          />
          <button
            onClick={() => handleAnswer(inputValue)}
            disabled={isTyping || !inputValue.trim()}
            className="h-[44px] px-6 rounded-xl btn-primary text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

// ========================
// Main App
// ========================

function downloadJSON(json: Record<string, unknown>) {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `qualificacao-${Date.now()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function QualificationApp() {
  const [captured, setCaptured] = useState<LeadCapture | null>(null)
  const [jsonResult, setJsonResult] = useState<Record<string, unknown> | null>(null)
  const [done, setDone] = useState(false)

  const startConv = useCallback((data: LeadCapture) => {
    setCaptured(data)
  }, [])

  const finishConv = useCallback((json: Record<string, unknown>) => {
    setJsonResult(json)
    setDone(true)
  }, [])

  const reset = useCallback(() => {
    setCaptured(null)
    setDone(false)
    setJsonResult(null)
  }, [])

  if (!captured) return <LeadCapture onSubmit={startConv} />
  if (done && jsonResult) return <QualificationResult json={jsonResult} data={captured} onReset={reset} />

  if (done && !jsonResult) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 relative">
        <div className="relative max-w-lg w-full text-center space-y-6 qf-fade-in-up">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl border border-[var(--border-strong)]" style={{ background: 'var(--surface-overlay)' }}>
            ⏳
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Conversa Finalizada</h2>
          <p className="text-sm text-[var(--content-default)]">
            Obrigado por participar da qualificação! Volte para falar com nosso time ou fale diretamente com nosso comercial.
          </p>
          <button onClick={reset} className="rounded-xl btn-secondary px-8 py-3 text-sm font-medium transition-all">
            Nova Qualificação
          </button>
        </div>
      </div>
    )
  }

  return <ChatScreen lead={captured} onDone={finishConv} />
}

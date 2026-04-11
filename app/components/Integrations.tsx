'use client'

import { motion } from 'framer-motion'

const stack = [
  { name: 'Next.js',    desc: 'Performance máxima e SEO técnico de ponta' },
  { name: 'n8n',        desc: 'Automações e integrações sem limite de escala' },
  { name: 'Meta Ads',   desc: 'Tráfego pago de alta conversão' },
  { name: 'Google Ads', desc: 'Presença no exato momento de intenção' },
]

// ─── Flow Diagram ─────────────────────────────────────────────────────────────
const CX = 200
const CY = 200
const NODE_R = 30
const HUB_R = 44

const nodes = [
  { id: 'meta',   label: 'Meta Ads',   x: 200, y: 56,  symbol: 'M',   color: '#1877F2', delay: 0.1  },
  { id: 'google', label: 'Google Ads', x: 356, y: 200, symbol: 'G',   color: '#4285F4', delay: 0.25 },
  { id: 'nextjs', label: 'Next.js',    x: 200, y: 344, symbol: 'N',   color: '#e2e8f0', delay: 0.4  },
  { id: 'n8n',    label: 'n8n',        x: 44,  y: 200, symbol: 'n8n', color: '#EA4B71', delay: 0.55 },
]

function edgePt(nx: number, ny: number, r: number) {
  const d = Math.hypot(CX - nx, CY - ny)
  return { x: nx + ((CX - nx) / d) * r, y: ny + ((CY - ny) / d) * r }
}

function hubPt(nx: number, ny: number) {
  const d = Math.hypot(CX - nx, CY - ny)
  return { x: CX + ((nx - CX) / d) * HUB_R, y: CY + ((ny - CY) / d) * HUB_R }
}

function FlowDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        {/* Glow para partículas */}
        <filter id="fg-particle" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Glow para o hub */}
        <filter id="fg-hub" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Caminhos ocultos para animateMotion */}
        {nodes.map(n => {
          const s = edgePt(n.x, n.y, NODE_R + 2)
          const e = hubPt(n.x, n.y)
          return (
            <path
              key={n.id}
              id={`pp-${n.id}`}
              d={`M${s.x},${s.y}L${e.x},${e.y}`}
              fill="none"
            />
          )
        })}
      </defs>

      {/* Linhas de conexão */}
      {nodes.map(n => {
        const s = edgePt(n.x, n.y, NODE_R + 2)
        const e = hubPt(n.x, n.y)
        return (
          <motion.path
            key={n.id}
            d={`M${s.x},${s.y}L${e.x},${e.y}`}
            stroke="rgba(106,174,222,0.18)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: n.delay, ease: 'easeOut' }}
          />
        )
      })}

      {/* Partículas viajando pelas linhas */}
      {nodes.flatMap((n, i) =>
        [0, 1].map(j => (
          <circle
            key={`${n.id}-p${j}`}
            r="3.5"
            fill="#6AAEDE"
            filter="url(#fg-particle)"
            opacity="0.9"
          >
            <animateMotion
              dur={`${1.8 + i * 0.15}s`}
              repeatCount="indefinite"
              begin={`${j * (0.9 + i * 0.07)}s`}
            >
              <mpath href={`#pp-${n.id}`} />
            </animateMotion>
          </circle>
        ))
      )}

      {/* Anel rotativo ao redor do hub */}
      <motion.circle
        cx={CX} cy={CY} r={HUB_R + 18}
        fill="none"
        stroke="rgba(106,174,222,0.09)"
        strokeWidth="1"
        strokeDasharray="5 8"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />

      {/* Pulso do hub (2 anéis alternados) */}
      {[0, 1].map(i => (
        <motion.circle
          key={i}
          cx={CX} cy={CY} r={HUB_R + 8}
          fill="none"
          stroke="rgba(106,174,222,0.25)"
          strokeWidth="1"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 1.3 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      {/* Nós das ferramentas */}
      {nodes.map(n => (
        <motion.g
          key={n.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, delay: n.delay }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          {/* Fundo do nó */}
          <circle
            cx={n.x} cy={n.y} r={NODE_R}
            fill="rgba(12,18,29,0.94)"
            stroke="rgba(148,163,184,0.18)"
            strokeWidth="1"
          />
          {/* Símbolo */}
          <text
            x={n.x}
            y={n.y + (n.symbol.length > 1 ? 4 : 5)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={n.color}
            fontSize={n.symbol.length > 1 ? '8' : '13'}
            fontWeight="600"
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {n.symbol}
          </text>
          {/* Label abaixo */}
          <text
            x={n.x}
            y={n.y + NODE_R + 15}
            textAnchor="middle"
            fill="rgba(177,192,208,0.6)"
            fontSize="9"
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* Hub central */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.75 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle
          cx={CX} cy={CY} r={HUB_R}
          fill="rgba(58,136,196,0.1)"
          stroke="rgba(106,174,222,0.42)"
          strokeWidth="1.5"
          filter="url(#fg-hub)"
        />
        <text
          x={CX} y={CY - 5}
          textAnchor="middle"
          fill="rgba(248,250,252,0.88)"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.1em"
          fontFamily="var(--font-urbanist), system-ui, sans-serif"
        >
          GRUPO
        </text>
        <text
          x={CX} y={CY + 9}
          textAnchor="middle"
          fill="rgba(106,174,222,0.88)"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.1em"
          fontFamily="var(--font-urbanist), system-ui, sans-serif"
        >
          CISNE
        </text>
      </motion.g>
    </svg>
  )
}
// ──────────────────────────────────────────────────────────────────────────────

export default function Integrations() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: 'var(--border-default)', background: 'var(--surface-raised)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Texto */}
            <div className="p-12 lg:p-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--interactive-pressed)' }}
              >
                Tech Stack
              </p>
              <h2
                className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-urbanist)', color: 'var(--content-strong)' }}
              >
                Tecnologia proprietária que nenhuma outra agência tem.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--content-default)' }}>
                Construímos com as ferramentas certas — do código ao pixel — para que
                cada entrega gere resultados mensuráveis e replicáveis.
              </p>
              <div className="flex flex-col gap-3">
                {stack.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-4 rounded-2xl p-4 border transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderColor: 'var(--border-default)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--interactive-pressed)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--interactive-muted)' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--interactive-pressed)' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--content-strong)' }}>
                        {t.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--content-subtle)' }}>
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagrama animado */}
            <div
              className="relative h-full min-h-[440px] flex items-center justify-center p-10"
              style={{ background: 'linear-gradient(135deg, var(--blue-800), var(--blue-900))' }}
            >
              <FlowDiagram />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

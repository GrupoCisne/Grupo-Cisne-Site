import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

const steps = [
  {
    number: '01',
    name: 'O Despertar (Discovery)',
    description: 'Mergulho profundo no seu negócio. Não perguntamos apenas "o quê", mas o "porquê". Encontramos o seu verdadeiro diferencial competitivo.',
  },
  {
    number: '02',
    name: 'O Plano (Strategy)',
    description: 'Desenhamos a arquitetura da sua nova presença. Definimos os canais, o tom de voz e o ecossistema tecnológico necessário (n8n, Next.js, etc).',
  },
  {
    number: '03',
    name: 'A Construção (Build)',
    description: 'Nossos squads de IA e especialistas humanos entram em ação. Copy, Design e Código ganham vida através da estética Black Swan.',
  },
  {
    number: '04',
    name: 'O Voo (Launch & Scale)',
    description: 'Lançamento com precisão milimétrica. O Tráfego Pago é ativado e iniciamos o ciclo de otimização contínua rumo à liderança.',
  },
]

export default function ProcessSection() {
  return (
    <Section id="processo">
      <Container>
        {/* Header */}
        <div className="mb-20 text-center">
          <p
            className="mb-3 text-xs font-normal tracking-widest uppercase"
            style={{ color: 'var(--interactive-pressed)' }}
          >
            Nosso Processo
          </p>
          <h2
            className="mb-4 font-outfit text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ color: 'var(--content-strong)' }}
          >
            Sua metamorfose,<br/>engenharia passo a passo.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line connecting steps */}
          <div 
            className="absolute left-8 top-0 h-full w-px md:left-1/2 md:-ml-px"
            style={{ background: 'var(--border-strong)' }}
          />
          
          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number circle */}
                <div 
                  className="absolute left-8 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 md:left-1/2"
                  style={{ 
                    background: 'var(--surface-page)',
                    borderColor: 'var(--surface-page)',
                    border: '1px solid var(--interactive-pressed)',
                    boxShadow: '0 0 16px var(--fx-glow-soft)'
                  }}
                >
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: 'var(--interactive-pressed)' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content Box */}
                <div className="ml-16 md:ml-0 md:w-1/2">
                  <div className={`glass-card p-8 transition-all duration-300 hover:border-[var(--interactive-pressed)] ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <h3 className="mb-3 font-outfit text-xl font-medium text-white">{step.name}</h3>
                    <p className="text-sm font-light text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

import { Children, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon, FeatureLabel, Quote, Rule, Section } from './ui'
import { PhoneVideo } from './Phone'
import { StatusDot } from './Sistema'
import { EASE, Reveal, RevealItem, Stagger, useCycle } from './motion'

function FeatureCopy({ n, label, title, children, dark = false, className = '' }) {
  return (
    <Stagger className={`flex flex-col gap-7 lg:w-[400px] lg:shrink-0 lg:gap-[26px] xl:w-[460px] ${className}`} stagger={0.1}>
      <RevealItem>
        <FeatureLabel n={n} dark={dark}>
          {label}
        </FeatureLabel>
      </RevealItem>
      <RevealItem
        as="h2"
        className={`text-[32px] leading-[36px] font-semibold tracking-[-1.3px] lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.6px] ${
          dark ? 'text-cream' : 'text-navy'
        }`}
      >
        {title}
      </RevealItem>
      {Children.map(children, (child) => {
        if (!child) return null
        // Filhos só de desktop não podem deixar um wrapper vazio (somaria gap no mobile)
        const desktopOnly = /(^|\s)hidden(\s|$)/.test(child.props?.className ?? '')
        return <RevealItem className={desktopOnly ? 'hidden lg:block' : undefined}>{child}</RevealItem>
      })}
    </Stagger>
  )
}

function Body({ children, dark = false }) {
  return (
    <p className={`text-[15.5px] leading-[26px] lg:text-[17px] lg:leading-[29px] ${dark ? 'text-navy-mute' : 'text-text-mute'}`}>
      {children}
    </p>
  )
}

/* ---------- 01 Loja online ---------- */

const DESTAQUES = [
  ['Catálogo', 'Barris, growlers e acessórios'],
  ['Promoções', 'Descontos por produto ou período'],
  ['Carrinho e endereço', 'Cálculo de entrega por bairro'],
  ['Agendamento', 'Data e janela de horário'],
  ['Pagamento', 'PIX automático ou na entrega'],
]

export function LojaOnline() {
  return (
    <Section id="loja-online" className="bg-cream-bg py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row lg:gap-16 xl:gap-24">
        <FeatureCopy n="01" label="LOJA ONLINE" title="Sua própria loja de delivery." className="lg:pt-[10px]">
          <Body>Seus clientes escolhem o chopp, informam o endereço, escolhem a entrega e finalizam o pedido pelo celular.</Body>
          <Stagger as="ul" className="flex flex-col lg:pt-[14px]" stagger={0.07} delay={0.2}>
            {DESTAQUES.map(([a, b], i) => (
              <RevealItem
                as="li"
                key={a}
                className={`group flex items-center gap-[13px] py-[14px] lg:gap-4 lg:py-[15px] ${
                  i < DESTAQUES.length - 1 ? 'border-b border-line-cream' : ''
                }`}
              >
                <Icon name="check" stroke={1.8} className="size-[14px] text-gold lg:size-[15px]" />
                <div className="flex flex-1 flex-col gap-[3px] lg:flex-row lg:items-center lg:gap-4">
                  <span className="text-[14.5px] font-semibold text-navy lg:w-[170px] lg:shrink-0 lg:text-[15px]">{a}</span>
                  <span className="text-[13px] text-text-mute lg:text-[14px]">{b}</span>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </FeatureCopy>
        <Reveal x={40} y={0} delay={0.15} className="flex justify-center pt-2 lg:flex-1 lg:pt-[10px]">
          <PhoneVideo
            name="app-checkout"
            label="Gravação do checkout FlashChopp: dados do cliente, entrega agendada e pagamento via PIX"
          />
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------- 02 Pedidos ---------- */

const FLUXO = ['Pendente', 'Confirmado', 'A caminho', 'Entregue']
const FLUXO_DOT = ['bg-gold border-gold', 'bg-navy border-navy', 'bg-transparent border-gold', 'bg-text-mute border-text-mute']

const FILA = [
  ['#1043', 'Chopp & Cia', 'Moema', 'R$ 1.380,00', 'Pendente'],
  ['#1041', 'Rafael Lima', 'Pinheiros', 'R$ 690,00', 'A caminho'],
  ['#1040', 'Bar do Zeca', 'Moema', 'R$ 1.180,00', 'Confirmado'],
]

function Swap({ k, className = '', children }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={k}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="inline-flex items-center gap-2"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* Pedido que avança sozinho pelo fluxo: Pendente → Confirmado → A caminho → Entregue */
function PedidoCard() {
  const ref = useRef(null)
  const step = useCycle(FLUXO.length, 2200, ref)
  const detalhes = [
    ['ENDEREÇO', 'R. Domingos de Morais, 1420', 'Vila Mariana · SP'],
    ['ENTREGA', 'Hoje · 18h às 22h', step >= 2 ? 'Saiu para entrega' : 'Janela da noite'],
    ['PAGAMENTO', 'PIX', step >= 1 ? 'Pago · confirmado' : 'Aguardando confirmação'],
  ]
  return (
    <div ref={ref} className="w-full overflow-hidden rounded-[3px] border border-line-soft bg-white">
      <div className="flex items-center gap-4 bg-cream-bg px-[26px] py-[22px]">
        <span className="font-jb text-[13px] font-medium text-navy">#1042</span>
        <span className="flex-1">
          <Swap k={step}>
            <span className={`size-[7px] rounded-full border-[1.4px] ${FLUXO_DOT[step]}`} />
            <span className="text-[13px] font-medium text-navy">{FLUXO[step]}</span>
          </Swap>
        </span>
        <span className="font-jb text-[11px] text-text-mute">hoje, 14:32</span>
      </div>
      <div className="flex flex-col gap-6 p-[26px]">
        <div className="flex flex-col gap-[10px] sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-[6px]">
            <span className="text-[26px] font-semibold tracking-[-0.9px] text-navy">Marina Souza</span>
            <span className="text-[13px] text-text-mute">Cliente desde março · 31 pedidos</span>
          </div>
          <span className="text-[26px] font-semibold tracking-[-0.9px] text-navy">R$ 420,00</span>
        </div>
        <Rule className="bg-line-soft" />
        <div className="flex flex-col sm:flex-row">
          {detalhes.map(([l, a, b], i) => (
            <div
              key={l}
              className={`flex flex-1 flex-col gap-[9px] border-line-soft py-[14px] first:pt-0 last:pb-0 sm:py-0 ${
                i < 2 ? 'border-b sm:border-r sm:border-b-0' : ''
              } ${i === 0 ? 'sm:pr-[22px]' : 'sm:px-[22px]'}`}
            >
              <span className="font-jb text-[9px] tracking-[1.2px] text-text-mute">{l}</span>
              <span className="text-[14px] leading-[20px] font-medium text-navy">{a}</span>
              <Swap k={b} className="text-[12.5px] text-text-mute">
                {b}
              </Swap>
            </div>
          ))}
        </div>
        <Rule className="bg-line-soft" />
        <div className="flex items-center gap-[14px]">
          <Icon name="keg" stroke={1.4} className="size-5 text-gold" />
          <span className="font-jb text-[12.5px] text-text-mute">1x</span>
          <span className="flex flex-1 items-center gap-[14px]">
            <span className="text-[14.5px] font-medium text-navy">
              Chopp Pilsen<span className="sm:hidden"> · 30L</span>
            </span>
            <span className="hidden text-[13px] text-text-mute sm:inline">Barril 30L</span>
          </span>
          <span className="text-[14px] font-semibold text-navy">R$ 420,00</span>
        </div>
      </div>
      <div className="flex items-center border-t border-line-soft bg-cream-bg px-[26px] py-[22px]">
        {FLUXO.map((s, i) => {
          const done = i <= step
          const current = i === step
          return (
            <div key={s} className={`flex items-center ${i > 0 ? 'flex-1' : ''}`}>
              {i > 0 && (
                <span className="relative mx-2 h-px min-w-3 flex-1 bg-line-cream">
                  <motion.span
                    className="absolute inset-0 origin-left bg-gold"
                    animate={{ scaleX: done ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </span>
              )}
              <span className="flex items-center gap-[9px]">
                <motion.span
                  animate={{ scale: current ? 1.3 : 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`size-[7px] rounded-full border-[1.5px] transition-colors duration-500 ${
                    done ? 'border-gold bg-gold' : 'border-line-cream'
                  }`}
                />
                <span
                  className={`text-[12.5px] transition-colors duration-500 ${
                    current ? 'font-semibold text-navy' : 'hidden text-text-mute sm:inline'
                  } ${done && !current ? 'sm:text-navy' : ''}`}
                >
                  {s}
                </span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Pedidos() {
  return (
    <Section id="pedidos" className="bg-white py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row-reverse lg:gap-16 xl:gap-24">
        <FeatureCopy n="02" label="PEDIDOS" title="Todos os pedidos em um só lugar." className="lg:pt-[10px]">
          <Body>
            Cliente, endereço, itens, valor, forma de pagamento e horário. Tudo registrado no mesmo pedido, do momento em
            que chega até a entrega.
          </Body>
          <div className="hidden lg:block lg:pt-4">
            <Quote>Pare de procurar pedidos no meio das conversas do WhatsApp.</Quote>
          </div>
        </FeatureCopy>
        <div className="flex flex-col gap-[18px] lg:min-w-0 lg:flex-1">
          <Reveal x={-40} y={0} delay={0.1}>
            <PedidoCard />
          </Reveal>
          <div className="pt-[10px] lg:hidden">
            <Quote>Pare de procurar pedidos no meio das conversas do WhatsApp.</Quote>
          </div>
          <Stagger
            className="hidden flex-col gap-1 rounded-[3px] border border-line-soft px-[26px] py-[22px] lg:flex"
            stagger={0.1}
            delay={0.3}
          >
            <RevealItem className="flex items-center justify-between pb-[10px]">
              <span className="font-jb text-[9px] tracking-[1.2px] text-text-mute">NA FILA DE HOJE</span>
              <span className="text-[11.5px] text-text-mute">mais 5 pedidos</span>
            </RevealItem>
            {FILA.map(([id, nome, bairro, valor, status], i) => (
              <RevealItem key={id} className={`flex items-center gap-4 py-[13px] ${i > 0 ? 'border-t border-line-soft' : ''}`}>
                <StatusDot status={status} />
                <span className="w-[70px] font-jb text-[11.5px] text-text-mute">{id}</span>
                <span className="w-[120px] text-[14px] font-medium text-navy xl:w-[180px]">{nome}</span>
                <span className="flex-1 text-[13px] text-text-mute">{bairro}</span>
                <span className="text-[13.5px] font-semibold whitespace-nowrap text-navy">{valor}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 03 Agendamento ---------- */

const BENEFICIOS = [
  ['Hoje ou próximos dias', 'O cliente define a data na hora do pedido'],
  ['Manhã, tarde e noite', 'Você controla a capacidade de cada turno'],
  ['Rotas mais organizadas', 'Entregas do mesmo turno saem juntas'],
]

const NOVA_ENTREGA = 'Carla Dias · Itaim Bibi'

/* Painel da choperia: a entrega agendada no app "cai" na janela da tarde */
function AgendaEntregas() {
  const ref = useRef(null)
  const chegou = useCycle(2, 3400, ref) === 1
  const turnos = [
    ['Manhã', '8h às 12h', ['Marina Souza · Vila Mariana', 'Bar do Zeca · Moema', 'Julia Pires · Itaim Bibi'], 6],
    ['Tarde', '12h às 18h', ['Rafael Lima · Pinheiros', ...(chegou ? [NOVA_ENTREGA] : [])], 6],
    ['Noite', '18h às 22h', null, 6],
  ]
  const total = 10 + (chegou ? 1 : 0)

  return (
    <div ref={ref} className="flex w-full max-w-[420px] flex-col gap-5 rounded-[3px] bg-navy p-[26px] xl:max-w-none xl:min-w-0 xl:flex-1">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[6px]">
          <span className="text-[19px] font-semibold tracking-[-0.5px] text-cream">Agenda de entregas</span>
          <span className="text-[12px] text-navy-mute">Amanhã · painel da choperia</span>
        </div>
        <Swap k={total} className="font-jb text-[10.5px] text-gold">
          {total} entregas
        </Swap>
      </div>
      {turnos.map(([turno, horas, clientes, cap]) => (
        <div key={turno} className="flex flex-col">
          <div className="flex items-center gap-3 pb-[10px]">
            <span className={`h-3 w-[2px] ${clientes ? 'bg-gold' : 'bg-navy-mute'}`} />
            <span className="text-[13.5px] font-semibold text-cream">{turno}</span>
            <span className="flex-1 text-[12px] text-navy-mute">{horas}</span>
            <Swap k={clientes ? clientes.length : 'full'} className={`font-jb text-[10.5px] ${clientes ? 'text-navy-mute' : 'text-gold'}`}>
              {clientes ? clientes.length : cap}/{cap}
            </Swap>
          </div>
          <div className="relative h-px bg-navy-line">
            {clientes && (
              <motion.span
                className="absolute inset-y-0 left-0 bg-gold/70"
                animate={{ width: `${(clientes.length / cap) * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </div>
          {clientes ? (
            <AnimatePresence initial={false}>
              {clientes.map((c) => {
                const nova = c === NOVA_ENTREGA
                return (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-[10px] py-[11px]">
                      <span className={`size-[5px] rounded-full ${nova ? 'bg-gold' : 'bg-navy-mute'}`} />
                      <span className="flex-1 text-[12.5px] text-cream">{c}</span>
                      {nova && <span className="font-jb text-[9px] tracking-[1.2px] text-gold">AGENDADO AGORA</span>}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          ) : (
            <p className="py-[13px] text-[11.5px] leading-[16px] text-navy-mute">Turno lotado. Novos pedidos vão para o próximo dia</p>
          )}
        </div>
      ))}
    </div>
  )
}

export function Agendamento() {
  return (
    <Section id="agendamento" className="bg-cream-bg py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row lg:gap-16 xl:gap-24">
        <FeatureCopy n="03" label="AGENDAMENTO" title="O cliente escolhe quando quer receber." className="lg:pt-[10px]">
          <Body>Organize as entregas antes mesmo de o pedido chegar. Cada janela mostra quantas entregas já estão reservadas.</Body>
          <Stagger as="ul" className="hidden flex-col pt-[14px] lg:flex" stagger={0.08} delay={0.2}>
            {BENEFICIOS.map(([a, b], i) => (
              <RevealItem
                as="li"
                key={a}
                className={`flex flex-col gap-[6px] py-4 ${i < BENEFICIOS.length - 1 ? 'border-b border-line-cream' : ''}`}
              >
                <span className="text-[15.5px] font-semibold text-navy">{a}</span>
                <span className="text-[14px] leading-[22px] text-text-mute">{b}</span>
              </RevealItem>
            ))}
          </Stagger>
        </FeatureCopy>
        <div className="flex flex-col items-center gap-8 pt-2 lg:min-w-0 lg:flex-1 lg:pt-[10px] xl:flex-row xl:items-start xl:gap-[22px]">
          <Reveal x={40} y={0} delay={0.1}>
            <PhoneVideo name="app-agenda" label="Gravação do app FlashChopp: cliente agenda a entrega escolhendo dia e janela de horário" />
          </Reveal>
          <Reveal y={40} delay={0.3} className="flex w-full justify-center xl:mt-16 xl:min-w-0 xl:flex-1">
            <AgendaEntregas />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

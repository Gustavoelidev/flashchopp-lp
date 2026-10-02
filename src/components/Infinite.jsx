import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { SectionHead } from './ui'
import { StatusDot } from './Sistema'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/*
 * Faixa infinita que anda sozinha e reage à rolagem:
 * rolar rápido acelera, rolar para cima inverte o sentido.
 * O conteúdo é repetido 4x e o deslocamento "dá a volta" a cada 25%.
 */
export function VelocityMarquee({ children, baseVelocity = 3, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px' })
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div ref={ref} className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ---------- Ticker de pedidos depois do hero ---------- */

const PEDIDOS = [
  ['#1043', 'Chopp & Cia', 'Moema', '2x Pilsen 50L', 'R$ 1.380,00', 'Pendente'],
  ['#1042', 'Marina Souza', 'Vila Mariana', '1x Pilsen 30L', 'R$ 420,00', 'Pendente'],
  ['#1041', 'Rafael Lima', 'Pinheiros', '1x IPA 50L', 'R$ 690,00', 'A caminho'],
  ['#1040', 'Bar do Zeca', 'Moema', '2x Pilsen 50L', 'R$ 1.180,00', 'Confirmado'],
  ['#1039', 'Julia Pires', 'Itaim Bibi', '1x Weiss 30L', 'R$ 480,00', 'Entregue'],
  ['#1038', 'Casa do Chopp', 'Vila Olímpia', '3x Pilsen 30L', 'R$ 1.260,00', 'Entregue'],
]

export function TickerPedidos() {
  return (
    <section aria-label="Pedidos chegando no painel" className="border-y border-navy-line bg-navy-deep">
      <div className="flex items-stretch">
        <div className="z-10 hidden shrink-0 flex-col justify-center gap-[6px] border-r border-navy-line bg-navy-deep px-8 md:flex xl:px-24">
          <span className="font-jb text-[10px] tracking-[1.4px] text-gold">PEDIDOS DE HOJE</span>
          <span className="text-[13px] text-navy-mute">38 recebidos · 6 aguardando</span>
        </div>
        <VelocityMarquee baseVelocity={-0.6} className="flex-1 py-6 lg:py-8">
          {PEDIDOS.map(([id, nome, bairro, itens, valor, status]) => (
            <div key={id} className="flex items-center gap-5 border-r border-navy-line px-8 lg:gap-6 lg:px-12">
              <span className="font-jb text-[11px] text-navy-mute">{id}</span>
              <div className="flex flex-col gap-[6px]">
                <span className="text-[20px] leading-none font-semibold tracking-[-0.6px] text-cream lg:text-[26px] lg:tracking-[-0.9px]">
                  {nome}
                </span>
                <span className="font-jb text-[10px] tracking-[0.8px] text-navy-mute uppercase lg:text-[10.5px]">
                  {bairro} · {itens}
                </span>
              </div>
              <span className="text-[16px] font-semibold tracking-[-0.3px] text-gold lg:text-[19px]">{valor}</span>
              <span className="flex items-center gap-2">
                <StatusDot status={status} className="size-[7px] border-[1.4px]" />
                <span className="text-[12.5px] text-cream/80">{status}</span>
              </span>
            </div>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  )
}

/* ---------- Telas da loja, em ordem de uso ---------- */

const TELAS = [
  ['01-abertura', 'Abertura da loja'],
  ['02-catalogo', 'Catálogo de barris'],
  ['04-vinho', 'Categorias'],
  ['05-adicionado', 'Itens no carrinho'],
  ['06-calculadora', 'Calculadora de chopp'],
  ['07-calculo', 'Sugestão de barris'],
  ['08-carrinho', 'Carrinho'],
  ['09-checkout', 'Dados do cliente'],
  ['10-agenda', 'Entrega agendada'],
  ['11-pagamento', 'Pagamento'],
]

function Tela({ name, label, n }) {
  return (
    <figure className="mx-3 flex w-[168px] shrink-0 flex-col gap-4 lg:mx-4 lg:w-[220px]">
      <div className="rounded-[28px] bg-navy-deep p-[5px] lg:rounded-[34px] lg:p-[6px]">
        <img
          src={`/app/telas/${name}.webp`}
          alt={label}
          loading="lazy"
          width="440"
          height="952"
          className="block aspect-[440/952] w-full rounded-[23px] lg:rounded-[28px]"
        />
      </div>
      <figcaption className="flex items-baseline gap-3 px-1">
        <span className="font-jb text-[11px] text-gold">{String(n).padStart(2, '0')}</span>
        <span className="text-[13px] font-medium text-navy lg:text-[14px]">{label}</span>
      </figcaption>
    </figure>
  )
}

export function AppWall() {
  return (
    <section aria-label="Telas da loja FlashChopp" className="overflow-hidden bg-cream-bg py-[72px] lg:py-[130px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-24">
        <SectionHead
          label="A LOJA DO SEU CLIENTE"
          title="Dez telas, um pedido completo."
          sub="Telas da loja demo do FlashChopp, da abertura ao pagamento. Na sua loja entram os seus produtos, preços e horários de entrega."
        />
      </div>
      <VelocityMarquee baseVelocity={-0.8} className="mt-12 lg:mt-16">
        {TELAS.map(([name, label], i) => (
          <Tela key={name} name={name} label={label} n={i + 1} />
        ))}
      </VelocityMarquee>
    </section>
  )
}

/* ---------- Slogan do app correndo no topo do CTA final ---------- */

export function LetreiroFinal() {
  return (
    <div className="border-b border-navy/15 py-4 lg:py-6" aria-hidden="true">
      <VelocityMarquee baseVelocity={-0.9}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center">
            <span className="text-[30px] leading-none font-semibold tracking-[-1px] text-navy uppercase lg:text-[60px] lg:tracking-[-2.4px]">
              Bora de chopp hoje?
            </span>
            <span className="mx-6 size-2 shrink-0 rotate-45 bg-navy/80 lg:mx-10 lg:size-3" />
          </span>
        ))}
      </VelocityMarquee>
    </div>
  )
}

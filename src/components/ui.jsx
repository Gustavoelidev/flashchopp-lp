import { Reveal, Stagger, RevealItem, Grow } from './motion'

const ICONS = {
  arrow: 'M4.5 12h15m-6.3-6.5l6.5 6.5-6.5 6.5',
  check: 'M4.8 12.4l4.8 4.6 9.6-10',
  mug: 'M7.6 4.2h7l-0.9 15.6h-5.2z m6.9 4.4h1.9a2.2 2.2 0 0 1 0 4.4h-2.1m-6.4-4.8h6.4',
  chart: 'M4 20h16m-12.4 0v-5.6m4.4 5.6v-11.8m4.4 11.8v-8.6',
  box: 'M4 8.3l8-4.2 8 4.2v7.4l-8 4.2-8-4.2z m0 0l8 4.2 8-4.2m-8 4.2v7.4',
  keg: 'M7.2 4.6h9.6m-9.6 14.8h9.6m-10.9-12.9c0-1 2.7-1.9 6.1-1.9s6.1 0.9 6.1 1.9v11c0 1-2.7 1.9-6.1 1.9s-6.1-0.9-6.1-1.9z m0 3.3h12.2m-12.2 4.4h12.2',
  users: 'M9.2 11.6a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4z m-6.4 8.6c0-3.5 2.9-5.8 6.4-5.8s6.4 2.3 6.4 5.8m1-14.8a3.5 3.5 0 0 1 0 6.6m1.6 3c2.1 0.8 3 2.7 3 5.2',
  card: 'M3.6 7.6a2.6 2.6 0 0 1 2.6-2.6h11.6a2.6 2.6 0 0 1 2.6 2.6v8.8a2.6 2.6 0 0 1-2.6 2.6h-11.6a2.6 2.6 0 0 1-2.6-2.6z m0 2.6h16.8m-3.8 4.4h1.2',
  pin: 'M12 20.8s6.6-6.1 6.6-10.6a6.6 6.6 0 1 0-13.2 0c0 4.5 6.6 10.6 6.6 10.6z m0-8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z',
  clock: 'M12 20.8a8.8 8.8 0 1 1 0-17.6 8.8 8.8 0 0 1 0 17.6z m0-13.5v4.7l3.4 2',
  pix: 'M4.2 4.2h5.6v5.6h-5.6z m10 0h5.6v5.6h-5.6z m-10 10h5.6v5.6h-5.6z m10 0h2.6v2.6h-2.6z m3 3h2.6v2.6h-2.6z',
  chat: 'M20 12.4c0 4-3.6 7.2-8 7.2-1.2 0-2.3-0.2-3.3-0.6l-4.7 1.6 1.5-3.4a6.8 6.8 0 0 1-1.5-4.8c0-4 3.6-7.2 8-7.2s8 3.2 8 7.2z',
  bolt: 'M13.6 3l-7.6 10.4h5.2l-0.8 7.6 7.6-10.4h-5.2z',
  route: 'M4 18.6h9a3.5 3.5 0 0 0 0-7h-4a3.5 3.5 0 0 1 0-7h7',
}

export function Icon({ name, className = '', stroke = 1.5 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d={ICONS[name]} />
    </svg>
  )
}

/* Rule + label em mono dourado (ex.: "O PROBLEMA") */
export function SectionLabel({ children, center = false }) {
  return (
    <div className="flex items-center gap-3 lg:gap-[14px]">
      <Grow className="h-px w-6 bg-gold lg:w-8" />
      <span className="font-jb text-[9.5px] font-medium tracking-[1.5px] text-gold lg:text-[10.5px] lg:tracking-[1.6px]">
        {children}
      </span>
      {center && <span className="h-px w-6 bg-gold lg:w-8" />}
    </div>
  )
}

/* Número + rule + label (ex.: "01 LOJA ONLINE") */
export function FeatureLabel({ n, children, dark = false }) {
  return (
    <div className="flex items-center gap-3 lg:gap-[14px]">
      <span className="font-jb text-[12px] font-medium tracking-[0.5px] text-gold lg:text-[13px]">{n}</span>
      <span className={`h-px w-[26px] ${dark ? 'bg-navy-line' : 'bg-line-cream'}`} />
      <span
        className={`font-jb text-[9.5px] tracking-[1.5px] lg:text-[10.5px] lg:tracking-[1.6px] ${dark ? 'text-navy-mute' : 'text-text-mute'}`}
      >
        {children}
      </span>
    </div>
  )
}

export function Rule({ className = 'bg-line-cream' }) {
  return <div className={`h-px w-full shrink-0 ${className}`} />
}

/* Citação com barra dourada à esquerda */
export function Quote({ children }) {
  return (
    <Reveal className="flex w-full gap-4 lg:gap-[18px]" x={-16} y={0}>
      <Grow axis="y" delay={0.2} className="h-[46px] w-[2px] shrink-0 bg-gold lg:h-12" style={{ originY: 0 }} />
      <p className="flex-1 text-[16px] leading-[24px] font-medium text-navy lg:text-[17px] lg:leading-[26px]">
        {children}
      </p>
    </Reveal>
  )
}

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`w-full scroll-mt-16 ${className}`}>
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-24">{children}</div>
    </section>
  )
}

/* Título + subtítulo lado a lado (Sistema, Dashboard, E mais, Para quem é) */
export function SectionHead({ label, title, sub }) {
  return (
    <Stagger className="flex w-full flex-col gap-[26px] lg:flex-row lg:items-end lg:justify-between lg:gap-24" stagger={0.12}>
      <div className="flex max-w-[700px] flex-col gap-[26px]">
        <RevealItem>
          <SectionLabel>{label}</SectionLabel>
        </RevealItem>
        <RevealItem
          as="h2"
          className="text-[34px] leading-[38px] font-semibold tracking-[-1.4px] text-navy lg:text-[46px] lg:leading-[51px] lg:tracking-[-1.9px]"
        >
          {title}
        </RevealItem>
      </div>
      {sub && (
        <RevealItem
          as="p"
          className="text-[15.5px] leading-[26px] text-text-mute lg:w-[340px] lg:shrink-0 lg:text-[16px] lg:leading-[27px]"
        >
          {sub}
        </RevealItem>
      )}
    </Stagger>
  )
}

/* WhatsApp comercial: todo botão de compra ou contato abre a conversa com uma mensagem pronta */
export const WHATSAPP = '5548996500843'
export const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
export const WA = {
  comecar: waLink('Olá! Quero começar a usar o FlashChopp na minha choperia.'),
  especialista: waLink('Olá! Quero falar com um especialista sobre o FlashChopp.'),
  plano: (nome) => waLink(`Olá! Tenho interesse no plano ${nome} do FlashChopp.`),
}
export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' }

/* Texto que muda entre o layout mobile (m) e desktop (d), como no design */
export function Resp({ m, d }) {
  if (m === d) return m
  return (
    <>
      <span className="lg:hidden">{m}</span>
      <span className="hidden lg:inline">{d}</span>
    </>
  )
}

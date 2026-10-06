import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Icon, WA, EXTERNAL } from './ui'
import { PhoneVideo } from './Phone'
import { EASE, Float, useCycle } from './motion'

const MENU = [
  ['Funcionalidades', '#funcionalidades'],
  ['Dashboard', '#dashboard'],
  ['Para quem é', '#para-quem-e'],
  ['Planos', '#planos'],
]

const PEDIDOS = [
  ['14:32', 'Marina Souza', 'Vila Mariana · 1 barril 30L', 'R$ 450'],
  ['14:36', 'Bar do Zeca', 'Moema · 2 barris 50L', 'R$ 1.400'],
  ['14:41', 'Rafael Lima', 'Pinheiros · 1 barril 50L', 'R$ 700'],
]

/* Marca no menu a seção que está no meio da tela */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
          else setActive((cur) => (cur === e.target.id ? null : cur))
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const MENU_IDS = MENU.map(([, href]) => href.slice(1))

export function Nav() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(MENU_IDS)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'border-b border-navy-line bg-navy' : 'border-b border-transparent bg-navy'
      }`}
    >
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 transition-[padding] duration-300 md:px-10 xl:px-24 ${
          scrolled ? 'py-3' : 'py-[18px] lg:py-[26px]'
        }`}
      >
        <a href="#" aria-label="FlashChopp, início">
          <img
            src="/flashchopp-logo.png"
            alt="FlashChopp"
            className={`w-auto object-contain transition-[height] duration-300 ${scrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-[61px]'}`}
          />
        </a>
        <div className="hidden items-center gap-[38px] lg:flex">
          {MENU.map(([label, href]) => {
            const on = active === href.slice(1)
            return (
              <a
                key={label}
                href={href}
                aria-current={on ? 'true' : undefined}
                className={`group relative text-[14px] transition-colors hover:text-cream ${on ? 'text-cream' : 'text-navy-mute'}`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 group-hover:scale-x-100 ${
                    on ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </div>
        <div className="flex items-center gap-[14px] lg:gap-[26px]">
          <a
            href={WA.comecar}
            {...EXTERNAL}
            className="rounded-[2px] bg-gold px-4 py-[9px] text-[12.5px] font-semibold text-navy transition-colors hover:bg-gold-soft lg:px-5 lg:py-[11px] lg:text-[14px]"
          >
            <span className="lg:hidden">Começar</span>
            <span className="hidden lg:inline">Começar agora</span>
          </a>
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex w-5 flex-col justify-center gap-[5px] py-1 lg:hidden"
          >
            <span className={`h-[1.5px] w-full bg-cream transition-transform duration-300 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] w-full bg-cream transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[1.5px] w-full bg-cream transition-transform duration-300 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute inset-x-0 top-full flex flex-col border-y border-navy-line bg-navy px-5 py-2 md:px-10 lg:hidden"
            >
              {MENU.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setOpen(false)} className="py-3 text-[15px] text-cream">
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <motion.div className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold" style={{ scaleX: scrollYProgress }} />
    </div>
  )
}

/* Card "Novo pedido" que troca de pedido sozinho, simulando o painel recebendo pedidos */
function NovoPedido() {
  const ref = useRef(null)
  const i = useCycle(PEDIDOS.length, 3600, ref)
  const [hora, nome, detalhe, valor] = PEDIDOS[i]
  return (
    <div ref={ref} className="flex w-[250px] flex-col gap-[14px] rounded-[2px] bg-white p-[18px] lg:w-[244px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex size-[6px]">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex size-[6px] rounded-full bg-gold" />
          </span>
          <span className="font-jb text-[9px] tracking-[1.2px] text-gold">NOVO PEDIDO</span>
        </div>
        <span className="font-jb text-[9.5px] text-text-mute">{hora}</span>
      </div>
      <div className="h-px bg-line-soft" />
      <div className="relative h-[37px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={nome}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-0 flex items-end gap-3"
          >
            <div className="flex flex-1 flex-col gap-[5px]">
              <span className="text-[13.5px] font-semibold text-navy">{nome}</span>
              <span className="text-[11px] text-text-mute">{detalhe}</span>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.4px] text-navy">{valor}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="relative mx-auto h-[462px] w-[350px] shrink-0 overflow-hidden lg:mx-0 lg:h-[640px] lg:w-auto lg:flex-1 lg:overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="absolute top-3 left-[27px] z-0 lg:top-[10px] lg:left-auto lg:right-0 xl:left-[196px] xl:right-auto"
      >
        <PhoneVideo name="app-pedido" label="Gravação da loja FlashChopp: cliente escolhe barris de chopp e abre a comanda" />
      </motion.div>
      <Float delay={1.1} className="absolute top-[318px] left-0 z-10 lg:top-[352px] lg:left-2">
        <NovoPedido />
      </Float>
    </div>
  )
}

function Line({ children, className, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

const SELOS = ['Sem taxa por pedido', 'PIX automático via Asaas', 'Suporte humano']

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

export function Hero() {
  return (
    <header className="w-full bg-navy">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:flex-row lg:gap-[72px] lg:px-10 lg:pt-24 lg:pb-16 xl:px-24">
        <div className="flex flex-col gap-[26px] px-5 pt-11 pb-9 md:px-10 lg:w-[560px] lg:shrink-0 lg:gap-[34px] lg:px-0 lg:pt-[18px] lg:pb-0 xl:w-[640px]">
          <motion.div className="flex items-center gap-3 lg:gap-[14px]" {...fadeUp(0.1)}>
            <motion.span
              className="h-px w-6 origin-left bg-gold lg:w-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            />
            <span className="font-jb text-[9.5px] font-medium tracking-[1.5px] text-gold lg:text-[10.5px] lg:tracking-[1.6px]">
              SISTEMA DE DELIVERY PARA CHOPERIAS
            </span>
          </motion.div>
          <h1 className="text-[40px] leading-[42px] font-semibold tracking-[-1.7px] lg:text-[54px] lg:leading-[58px] lg:tracking-[-2.3px] xl:text-[62px] xl:leading-[66px] xl:tracking-[-2.6px]">
            <Line className="text-cream" delay={0.15}>
              Sua choperia vende chopp.
            </Line>
            <Line className="text-gold" delay={0.3}>
              O FlashChopp cuida do resto.
            </Line>
          </h1>
          <motion.p
            className="text-[15.5px] leading-[26px] text-navy-mute lg:max-w-[470px] lg:text-[17px] lg:leading-[29px]"
            {...fadeUp(0.5)}
          >
            Receba pedidos online, organize entregas, controle estoque e acompanhe seus números em um único lugar.
          </motion.p>
          <motion.div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 lg:pt-[6px]" {...fadeUp(0.65)}>
            <a
              href={WA.comecar}
              {...EXTERNAL}
              className="group flex items-center justify-center gap-[11px] rounded-[2px] bg-gold p-[17px] text-navy transition-colors hover:bg-gold-soft lg:gap-3 lg:px-[30px]"
            >
              <span className="text-[15.5px] font-semibold tracking-[-0.2px] lg:text-[16px]">Começar agora</span>
              <Icon name="arrow" stroke={1.8} className="size-4 transition-transform group-hover:translate-x-1 lg:size-[17px]" />
            </a>
            <a href="#funcionalidades" className="group flex items-center justify-center gap-[10px] text-cream">
              <span className="text-[15px] lg:text-[16px]">Ver como funciona</span>
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
          <motion.ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-navy-mute lg:text-[13.5px]" {...fadeUp(0.8)}>
            {SELOS.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
        <HeroMockup />
      </div>
    </header>
  )
}

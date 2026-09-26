import { useState } from 'react'
import { Icon, CTA_HREF } from './ui'
import { Phone } from './Phone'

const MENU = [
  ['Funcionalidades', '#funcionalidades'],
  ['Dashboard', '#dashboard'],
  ['Para quem é', '#para-quem-e'],
  ['Planos', '#planos'],
]

const PRODUTOS = [
  ['Pilsen', 'Barril 30L', 'R$ 420,00', true],
  ['IPA Artesanal', 'Barril 50L', 'R$ 690,00', false],
  ['Weiss de Trigo', 'Barril 30L', 'R$ 480,00', false],
  ['Lager Premium', 'Barril 50L', 'R$ 610,00', false],
]

const MODULOS = ['Pedidos online', 'Gestão de entregas', 'Estoque', 'CRM', 'Financeiro', 'PIX automático']

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-[18px] md:px-10 lg:py-[26px] xl:px-24">
      <a href="#" aria-label="FlashChopp — início">
        <img src="/flashchopp-logo.png" alt="FlashChopp" className="h-12 w-[104px] object-contain lg:h-[61px] lg:w-[132px]" />
      </a>
      <div className="hidden items-center gap-[38px] lg:flex">
        {MENU.map(([label, href]) => (
          <a key={label} href={href} className="text-[14px] text-navy-mute transition-colors hover:text-cream">
            {label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-[14px] lg:gap-[26px]">
        <a href={CTA_HREF} className="hidden text-[14px] text-cream hover:text-gold lg:inline">
          Entrar
        </a>
        <a
          href={CTA_HREF}
          className="rounded-[2px] bg-gold px-4 py-[9px] text-[12.5px] font-semibold text-navy transition-colors hover:bg-gold-soft lg:px-5 lg:py-[11px] lg:text-[14px]"
        >
          <span className="lg:hidden">Começar</span>
          <span className="hidden lg:inline">Começar agora</span>
        </a>
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-5 flex-col justify-center gap-[5px] py-1 lg:hidden"
        >
          <span className="h-[1.5px] w-full bg-cream" />
          <span className="h-[1.5px] w-full bg-cream" />
          <span className="h-[1.5px] w-full bg-cream" />
        </button>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-full z-20 flex flex-col border-y border-navy-line bg-navy px-5 py-2 md:px-10 lg:hidden">
          {MENU.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="py-3 text-[15px] text-cream">
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function HeroMockup() {
  return (
    <div className="relative mx-auto h-[462px] w-[350px] shrink-0 overflow-hidden lg:mx-0 lg:h-[588px] lg:w-auto lg:flex-1 lg:overflow-visible">
      <Phone className="absolute top-3 left-[27px] z-0 h-[568px] lg:top-[10px] lg:left-auto lg:right-0 xl:left-[196px] xl:right-auto">
        <div className="flex items-center gap-3 px-5 pt-[14px] pb-4">
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-[16px] font-semibold tracking-[-0.4px] text-navy">Chopp do Gama</span>
            <span className="text-[11px] text-text-mute">Aberto · entrega em 40 min</span>
          </div>
          <Icon name="mug" className="size-5 text-gold" />
        </div>
        <div className="h-px bg-line-soft" />
        <div className="flex items-center justify-between px-5 pt-[18px] pb-[10px]">
          <span className="font-jb text-[9.5px] tracking-[1.3px] text-text-mute">CHOPP EM BARRIL</span>
          <span className="text-[10.5px] text-text-mute">6 opções</span>
        </div>
        <div className="flex flex-1 flex-col px-5">
          {PRODUTOS.map(([nome, barril, preco, active], i) => (
            <div key={nome}>
              {i > 0 && <div className="h-px bg-line-soft" />}
              <div className="flex items-center gap-3 py-[15px]">
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[13.5px] font-medium text-navy">{nome}</span>
                  <span className="text-[11px] text-text-mute">{barril}</span>
                </div>
                <span className="text-[13px] font-semibold text-navy">{preco}</span>
                <span
                  className={`flex size-[26px] items-center justify-center rounded-[2px] text-[15px] font-medium ${
                    active ? 'bg-gold text-navy' : 'border border-line-cream text-text-mute'
                  }`}
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[14px] bg-cream-bg px-5 pt-4 pb-[22px]">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10.5px] text-text-mute">2 itens no carrinho</span>
              <span className="text-[19px] font-semibold tracking-[-0.5px] text-navy">R$ 1.110,00</span>
            </div>
            <span className="text-[10.5px] text-gold">Entrega grátis</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-[2px] bg-navy p-[14px]">
            <span className="text-[13.5px] font-semibold text-cream">Finalizar pedido</span>
            <Icon name="arrow" className="size-[15px] text-cream" />
          </div>
        </div>
      </Phone>

      <div className="absolute top-[318px] left-0 z-10 flex w-[250px] flex-col gap-[14px] rounded-[2px] bg-white p-[18px] lg:top-[352px] lg:left-2 lg:w-[244px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-[6px] rounded-full bg-gold" />
            <span className="font-jb text-[9px] tracking-[1.2px] text-gold">NOVO PEDIDO</span>
          </div>
          <span className="font-jb text-[9.5px] text-text-mute">14:32</span>
        </div>
        <div className="h-px bg-line-soft" />
        <div className="flex items-end gap-3">
          <div className="flex flex-1 flex-col gap-[5px]">
            <span className="text-[13.5px] font-semibold text-navy">Marina Souza</span>
            <span className="text-[11px] text-text-mute">Vila Mariana · 1 barril 30L</span>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.4px] text-navy">R$ 420</span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <header className="w-full bg-navy">
      <Nav />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:flex-row lg:gap-[72px] lg:px-10 lg:pt-24 lg:pb-16 xl:px-24">
        <div className="flex flex-col gap-[26px] px-5 pt-11 pb-9 md:px-10 lg:w-[560px] lg:shrink-0 lg:gap-[34px] lg:px-0 lg:pt-[18px] lg:pb-0 xl:w-[640px]">
          <div className="flex items-center gap-3 lg:gap-[14px]">
            <span className="h-px w-6 bg-gold lg:w-8" />
            <span className="font-jb text-[9.5px] font-medium tracking-[1.5px] text-gold lg:text-[10.5px] lg:tracking-[1.6px]">
              SISTEMA DE DELIVERY PARA CHOPERIAS
            </span>
          </div>
          <h1 className="text-[40px] leading-[42px] font-semibold tracking-[-1.7px] lg:text-[54px] lg:leading-[58px] lg:tracking-[-2.3px] xl:text-[62px] xl:leading-[66px] xl:tracking-[-2.6px]">
            <span className="block text-cream">Sua choperia vende chopp.</span>
            <span className="block text-gold">O FlashChopp cuida do resto.</span>
          </h1>
          <p className="text-[15.5px] leading-[26px] text-navy-mute lg:max-w-[470px] lg:text-[17px] lg:leading-[29px]">
            Receba pedidos online, organize entregas, controle estoque e acompanhe seus números em um único lugar.
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 lg:pt-[6px]">
            <a
              href={CTA_HREF}
              className="flex items-center justify-center gap-[11px] rounded-[2px] bg-gold p-[17px] text-navy transition-colors hover:bg-gold-soft lg:gap-3 lg:px-[30px]"
            >
              <span className="text-[15.5px] font-semibold tracking-[-0.2px] lg:text-[16px]">Começar agora</span>
              <Icon name="arrow" stroke={1.8} className="size-4 lg:size-[17px]" />
            </a>
            <a href="#funcionalidades" className="group flex items-center justify-center gap-[10px] text-cream">
              <span className="text-[15px] lg:text-[16px]">Ver como funciona</span>
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <HeroMockup />
      </div>

      <div className="w-full border-t border-navy-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-[22px] md:px-10 lg:py-[26px] xl:px-24">
          <div className="grid grid-cols-2 lg:hidden">
            {MODULOS.map((m, i) => (
              <div
                key={m}
                className={`py-[13px] font-jb text-[10.5px] tracking-[0.8px] text-cream ${
                  i % 2 === 0 ? 'border-r border-navy-line pr-[18px]' : 'pl-[18px]'
                } ${i < 4 ? 'border-b border-b-navy-line' : ''}`}
              >
                {m}
              </div>
            ))}
          </div>
          <div className="hidden items-center justify-between lg:flex">
            {MODULOS.map((m, i) => (
              <div key={m} className="contents">
                {i > 0 && <span className="h-[11px] w-px bg-navy-line" />}
                <span className="font-jb text-[11px] tracking-[0.9px] text-cream">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

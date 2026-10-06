import { Children } from 'react'
import { Icon, FeatureLabel, Quote, Section } from './ui'
import { PhoneVideo } from './Phone'
import { BrowserFrame, PainelLegenda, PainelShot } from './Painel'
import { Reveal, RevealItem, Stagger } from './motion'

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
  ['Comanda e endereço', 'Cálculo de entrega por bairro'],
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

export function Pedidos() {
  return (
    <Section id="pedidos" className="bg-white py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
          <FeatureCopy n="02" label="PEDIDOS" title="Todos os pedidos em um só lugar." className="lg:pt-[10px]">
            <Body>
              Cliente, endereço, itens, valor, forma de pagamento e horário. Tudo registrado no mesmo pedido, do momento em
              que chega até a entrega.
            </Body>
            <Body>Venda no balcão também entra no sistema: escolha os itens, a forma de pagamento e o estoque baixa sozinho.</Body>
            <div className="hidden lg:block lg:pt-4">
              <Quote>Pare de procurar pedidos no meio das conversas do WhatsApp.</Quote>
            </div>
          </FeatureCopy>
          <Reveal x={40} y={0} delay={0.1} className="flex flex-col gap-4 lg:min-w-0 lg:flex-1">
            <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[8px] border border-line-soft shadow-[0_30px_80px_-40px_rgba(29,44,58,0.35)]">
              <PainelShot
                name="10-pedido-balcao"
                w={1280}
                h={1240}
                sizes="(min-width: 1024px) 640px, 100vw"
                alt="Painel FlashChopp, novo pedido de balcão: lista de produtos com estoque, quantidades, total de R$ 708,00 e pagamento via Pix"
              />
            </div>
            <PainelLegenda titulo="Pedido de balcão" className="mx-auto w-full max-w-[640px]">
              preço de balcão, aviso de estoque baixo e forma de pagamento
            </PainelLegenda>
          </Reveal>
        </div>
        <Reveal y={40} className="flex flex-col gap-4">
          <BrowserFrame>
            <PainelShot
              name="07-pedido-aberto"
              alt="Painel FlashChopp, tela de Pedidos com um pedido aberto: itens, taxa de entrega, endereço, telefone, status e atalhos para mapa e WhatsApp"
            />
          </BrowserFrame>
          <PainelLegenda titulo="Pedidos">
            filtros por status, busca por cliente ou endereço e o pedido aberto com itens, endereço e telefone
          </PainelLegenda>
        </Reveal>
        <div className="lg:hidden">
          <Quote>Pare de procurar pedidos no meio das conversas do WhatsApp.</Quote>
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

export function Agendamento() {
  return (
    <Section id="agendamento" className="bg-cream-bg py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-10 lg:gap-16">
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
          <Reveal x={40} y={0} delay={0.1} className="flex justify-center pt-2 lg:flex-1 lg:pt-[10px]">
            <PhoneVideo name="app-agenda" label="Gravação do app FlashChopp: cliente agenda a entrega escolhendo dia e janela de horário" />
          </Reveal>
        </div>
        <Reveal y={40} className="flex flex-col gap-4">
          <BrowserFrame>
            <PainelShot
              name="08-agenda-dia"
              w={1920}
              h={720}
              alt="Painel FlashChopp, tela de Agenda: calendário do mês com entregas e retiradas de chopeira por dia e a lista do dia separada por turno"
            />
          </BrowserFrame>
          <PainelLegenda titulo="Agenda no painel">
            calendário com as entregas de cada dia, separadas por turno, e as chopeiras para retirar
          </PainelLegenda>
        </Reveal>
      </div>
    </Section>
  )
}

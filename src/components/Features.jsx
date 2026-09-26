import { Icon, FeatureLabel, Quote, Rule, Section } from './ui'
import { Phone } from './Phone'
import { StatusDot } from './Sistema'

function FeatureCopy({ n, label, title, children, dark = false, className = '' }) {
  return (
    <div className={`flex flex-col gap-7 lg:w-[400px] lg:shrink-0 lg:gap-[26px] xl:w-[460px] ${className}`}>
      <FeatureLabel n={n} dark={dark}>
        {label}
      </FeatureLabel>
      <h2
        className={`text-[32px] leading-[36px] font-semibold tracking-[-1.3px] lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.6px] ${
          dark ? 'text-cream' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {children}
    </div>
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

function CheckoutRow({ label, icon, title, sub }) {
  return (
    <div className="flex flex-col gap-[11px] py-[18px]">
      <span className="font-jb text-[9px] tracking-[1.3px] text-text-mute">{label}</span>
      <div className="flex items-center gap-[13px]">
        <Icon name={icon} stroke={1.4} className="size-[19px] text-gold" />
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-[13.5px] font-semibold text-navy">{title}</span>
          <span className="text-[11px] text-text-mute">{sub}</span>
        </div>
        <span className="text-[11px] font-semibold text-gold">Alterar</span>
      </div>
    </div>
  )
}

function CheckoutPhone() {
  return (
    <Phone className="h-[644px]">
      <div className="flex items-center gap-[14px] px-5 pt-[14px] pb-4">
        <Icon name="arrow" className="size-[18px] -scale-x-100 text-navy" />
        <span className="flex-1 text-[16px] font-semibold tracking-[-0.4px] text-navy">Finalizar pedido</span>
        <span className="font-jb text-[10.5px] text-text-mute">2 de 3</span>
      </div>
      <div className="flex gap-[5px] px-5 pb-4">
        <span className="h-[2px] flex-1 bg-gold" />
        <span className="h-[2px] flex-1 bg-gold" />
        <span className="h-[2px] flex-1 bg-line-soft" />
      </div>
      <div className="h-px bg-line-soft" />
      <div className="flex flex-1 flex-col px-5">
        <CheckoutRow label="ENDEREÇO DE ENTREGA" icon="pin" title="R. Joaquim Floriano, 820" sub="Itaim Bibi · São Paulo" />
        <div className="h-px bg-line-soft" />
        <CheckoutRow label="ENTREGA AGENDADA" icon="clock" title="Amanhã · 12h – 18h" sub="Janela da tarde · 5 vagas" />
        <div className="h-px bg-line-soft" />
        <div className="flex flex-col gap-[11px] py-[18px]">
          <span className="font-jb text-[9px] tracking-[1.3px] text-text-mute">PAGAMENTO</span>
          <div className="flex gap-[10px]">
            <div className="flex flex-1 flex-col gap-2 rounded-[2px] border border-gold bg-gold-tint p-3">
              <Icon name="pix" stroke={1.4} className="size-[18px] text-navy" />
              <span className="text-[13px] font-semibold text-navy">PIX</span>
              <span className="text-[9.5px] leading-[13px] text-text-mute">confirmação automática</span>
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-[2px] border border-line-cream p-3">
              <Icon name="card" stroke={1.4} className="size-[18px] text-text-mute" />
              <span className="text-[13px] font-semibold text-navy">Cartão</span>
              <span className="text-[9.5px] leading-[13px] text-text-mute">na entrega</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-cream-bg px-5 pt-4 pb-[22px]">
        {[
          ['1x Chopp Pilsen 30L', 'R$ 420,00'],
          ['1x Chopp IPA 50L', 'R$ 690,00'],
        ].map(([a, v]) => (
          <div key={a} className="flex justify-between text-[11.5px]">
            <span className="text-text-mute">{a}</span>
            <span className="font-medium text-navy">{v}</span>
          </div>
        ))}
        <div className="h-px bg-line-cream" />
        <div className="flex items-end justify-between">
          <span className="text-[12.5px] font-semibold text-navy">Total</span>
          <span className="text-[19px] font-semibold tracking-[-0.5px] text-navy">R$ 1.110,00</span>
        </div>
        <div className="flex items-center justify-center gap-[10px] rounded-[2px] bg-gold p-[14px]">
          <span className="text-[13.5px] font-semibold text-navy">Confirmar pedido</span>
          <Icon name="arrow" className="size-[15px] text-navy" />
        </div>
      </div>
    </Phone>
  )
}

export function LojaOnline() {
  return (
    <Section className="bg-cream-bg py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row lg:gap-16 xl:gap-24">
        <FeatureCopy n="01" label="LOJA ONLINE" title="Sua própria loja de delivery." className="lg:pt-[10px]">
          <Body>Seus clientes escolhem o chopp, informam o endereço, escolhem a entrega e finalizam o pedido pelo celular.</Body>
          <ul className="flex flex-col lg:pt-[14px]">
            {DESTAQUES.map(([a, b], i) => (
              <li
                key={a}
                className={`flex items-center gap-[13px] py-[14px] lg:gap-4 lg:py-[15px] ${i < DESTAQUES.length - 1 ? 'border-b border-line-cream' : ''}`}
              >
                <Icon name="check" stroke={1.8} className="size-[14px] text-gold lg:size-[15px]" />
                <div className="flex flex-1 flex-col gap-[3px] lg:flex-row lg:items-center lg:gap-4">
                  <span className="text-[14.5px] font-semibold text-navy lg:w-[170px] lg:shrink-0 lg:text-[15px]">{a}</span>
                  <span className="text-[13px] text-text-mute lg:text-[14px]">{b}</span>
                </div>
              </li>
            ))}
          </ul>
        </FeatureCopy>
        <div className="flex justify-center pt-2 lg:flex-1 lg:pt-[10px]">
          <CheckoutPhone />
        </div>
      </div>
    </Section>
  )
}

/* ---------- 02 Pedidos ---------- */

const FLUXO = ['Pendente', 'Confirmado', 'A caminho', 'Entregue']

const FILA = [
  ['#1043', 'Chopp & Cia', 'Moema', 'R$ 1.380,00', 'Pendente'],
  ['#1041', 'Rafael Lima', 'Pinheiros', 'R$ 690,00', 'A caminho'],
  ['#1040', 'Bar do Zeca', 'Moema', 'R$ 1.180,00', 'Confirmado'],
]

function PedidoCard() {
  const detalhes = [
    ['ENDEREÇO', 'R. Domingos de Morais, 1420', 'Vila Mariana · SP'],
    ['ENTREGA', 'Hoje · 18h – 22h', 'Janela da noite'],
    ['PAGAMENTO', 'PIX', 'Aguardando confirmação'],
  ]
  return (
    <div className="w-full overflow-hidden rounded-[3px] border border-line-soft bg-white">
      <div className="flex items-center gap-4 bg-cream-bg px-[26px] py-[22px]">
        <span className="font-jb text-[13px] font-medium text-navy">#1042</span>
        <span className="flex flex-1 items-center gap-2">
          <span className="size-[7px] rounded-full bg-gold" />
          <span className="text-[13px] font-medium text-navy">Pendente</span>
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
              <span className="text-[12.5px] text-text-mute">{b}</span>
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
        {FLUXO.map((s, i) => (
          <div key={s} className={`flex items-center ${i > 0 ? 'flex-1' : ''}`}>
            {i > 0 && <span className={`mx-2 h-px min-w-3 flex-1 ${i === 1 ? 'bg-gold' : 'bg-line-cream'}`} />}
            <span className="flex items-center gap-[9px]">
              <span
                className={`rounded-full border-[1.5px] ${i === 0 ? 'size-[9px] border-gold bg-gold' : 'size-[7px] border-line-cream'}`}
              />
              <span
                className={`text-[12.5px] ${i === 0 ? 'font-semibold text-navy' : 'hidden text-text-mute sm:inline'}`}
              >
                {s}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Pedidos() {
  return (
    <Section className="bg-white py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row-reverse lg:gap-16 xl:gap-24">
        <FeatureCopy n="02" label="PEDIDOS" title="Todos os pedidos em um só lugar." className="lg:pt-[10px]">
          <Body>
            Cliente, endereço, itens, valor, forma de pagamento e horário — tudo registrado no mesmo pedido, do momento em
            que chega até a entrega.
          </Body>
          <div className="hidden lg:block lg:pt-4">
            <Quote>Pare de procurar pedidos no meio das conversas do WhatsApp.</Quote>
          </div>
        </FeatureCopy>
        <div className="flex flex-col gap-[18px] lg:min-w-0 lg:flex-1">
          <PedidoCard />
          <div className="pt-[10px] lg:hidden">
            <Quote>Pare de procurar pedidos no meio das conversas do WhatsApp.</Quote>
          </div>
          <div className="hidden flex-col gap-1 rounded-[3px] border border-line-soft px-[26px] py-[22px] lg:flex">
            <div className="flex items-center justify-between pb-[10px]">
              <span className="font-jb text-[9px] tracking-[1.2px] text-text-mute">NA FILA DE HOJE</span>
              <span className="text-[11.5px] text-text-mute">mais 5 pedidos</span>
            </div>
            {FILA.map(([id, nome, bairro, valor, status], i) => (
              <div key={id} className={`flex items-center gap-4 py-[13px] ${i > 0 ? 'border-t border-line-soft' : ''}`}>
                <StatusDot status={status} />
                <span className="w-[70px] font-jb text-[11.5px] text-text-mute">{id}</span>
                <span className="w-[120px] text-[14px] font-medium text-navy xl:w-[180px]">{nome}</span>
                <span className="flex-1 text-[13px] text-text-mute">{bairro}</span>
                <span className="text-[13.5px] font-semibold whitespace-nowrap text-navy">{valor}</span>
              </div>
            ))}
          </div>
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

const DIAS = [
  ['Hoje', '25 set'],
  ['Amanhã', '26 set', true],
  ['Sáb', '27 set'],
]

const JANELAS = [
  ['Manhã', '8h – 12h', '3 vagas', 'livre'],
  ['Tarde', '12h – 18h', '5 vagas', 'ativo'],
  ['Noite', '18h – 22h', 'Lotado', 'lotado'],
]

const AGENDA = [
  ['Manhã', '8h – 12h', '3/6', ['Marina Souza · Vila Mariana', 'Bar do Zeca · Moema', 'Julia Pires · Itaim Bibi']],
  ['Tarde', '12h – 18h', '1/6', ['Rafael Lima · Pinheiros']],
  ['Noite', '18h – 22h', '6/6', null],
]

function AgendamentoCliente() {
  return (
    <div className="flex w-full flex-col gap-[22px] rounded-[3px] border border-line-soft bg-white p-[26px] lg:w-[318px] lg:shrink-0">
      <span className="text-[19px] leading-[24px] font-semibold tracking-[-0.5px] text-navy">Quando você quer receber?</span>
      <div className="flex flex-col gap-[11px]">
        <span className="font-jb text-[9px] tracking-[1.2px] text-text-mute">DIA</span>
        <div className="flex gap-2">
          {DIAS.map(([a, b, active]) => (
            <div
              key={a}
              className={`flex flex-1 flex-col items-center gap-1 rounded-[2px] border px-[6px] py-3 ${
                active ? 'border-navy bg-navy' : 'border-line-cream'
              }`}
            >
              <span className={`text-[12.5px] font-semibold ${active ? 'text-cream' : 'text-navy'}`}>{a}</span>
              <span className={`text-[10.5px] ${active ? 'text-navy-mute' : 'text-text-mute'}`}>{b}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[11px]">
        <span className="font-jb text-[9px] tracking-[1.2px] text-text-mute">JANELA DE ENTREGA</span>
        <div className="flex flex-col gap-2">
          {JANELAS.map(([a, b, c, st]) => (
            <div
              key={a}
              className={`flex items-center gap-3 rounded-[2px] border px-[14px] py-[13px] ${
                st === 'ativo' ? 'border-gold bg-gold-tint' : 'border-line-cream'
              } ${st === 'lotado' ? 'opacity-55' : ''}`}
            >
              <span
                className={`size-[14px] rounded-full border-[1.4px] ${st === 'ativo' ? 'border-gold bg-gold' : 'border-line-cream'}`}
              />
              <div className="flex flex-1 flex-col gap-[3px]">
                <span className="text-[13.5px] font-semibold text-navy">{a}</span>
                <span className="text-[11.5px] text-text-mute">{b}</span>
              </div>
              <span className={`font-jb text-[10px] ${st === 'lotado' ? 'text-navy' : 'text-text-mute'}`}>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[11px] rounded-[2px] bg-navy px-4 py-[14px]">
        <Icon name="check" stroke={1.8} className="size-[15px] text-gold" />
        <span className="flex-1 text-[12px] leading-[17px] text-cream">Entrega agendada para amanhã, 12h–18h</span>
      </div>
    </div>
  )
}

function AgendaEntregas() {
  return (
    <div className="hidden min-w-0 flex-1 flex-col gap-5 rounded-[3px] bg-navy p-[26px] xl:flex">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[6px]">
          <span className="text-[19px] font-semibold tracking-[-0.5px] text-cream">Agenda de entregas</span>
          <span className="text-[12px] text-navy-mute">Sexta, 26 de setembro</span>
        </div>
        <span className="font-jb text-[10.5px] text-gold">10 entregas</span>
      </div>
      {AGENDA.map(([turno, horas, cap, clientes]) => (
        <div key={turno} className="flex flex-col">
          <div className="flex items-center gap-3 pb-[10px]">
            <span className={`h-3 w-[2px] ${clientes ? 'bg-gold' : 'bg-navy-mute'}`} />
            <span className="text-[13.5px] font-semibold text-cream">{turno}</span>
            <span className="flex-1 text-[12px] text-navy-mute">{horas}</span>
            <span className={`font-jb text-[10.5px] ${clientes ? 'text-navy-mute' : 'text-gold'}`}>{cap}</span>
          </div>
          <div className="h-px bg-navy-line" />
          {clientes ? (
            clientes.map((c) => (
              <div key={c} className="flex items-center gap-[10px] py-[11px]">
                <span className="size-[5px] rounded-full bg-navy-mute" />
                <span className="text-[12.5px] text-cream">{c}</span>
              </div>
            ))
          ) : (
            <p className="py-[13px] text-[11.5px] leading-[16px] text-navy-mute">
              Turno lotado — novos pedidos vão para o próximo dia
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export function Agendamento() {
  return (
    <Section className="bg-cream-bg py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row lg:gap-16 xl:gap-24">
        <FeatureCopy n="03" label="AGENDAMENTO" title="O cliente escolhe quando quer receber." className="lg:pt-[10px]">
          <Body>Organize as entregas antes mesmo de o pedido chegar. Cada janela mostra quantas entregas já estão reservadas.</Body>
          <ul className="hidden flex-col pt-[14px] lg:flex">
            {BENEFICIOS.map(([a, b], i) => (
              <li key={a} className={`flex flex-col gap-[6px] py-4 ${i < BENEFICIOS.length - 1 ? 'border-b border-line-cream' : ''}`}>
                <span className="text-[15.5px] font-semibold text-navy">{a}</span>
                <span className="text-[14px] leading-[22px] text-text-mute">{b}</span>
              </li>
            ))}
          </ul>
        </FeatureCopy>
        <div className="flex gap-[22px] lg:min-w-0 lg:flex-1 lg:items-start">
          <AgendamentoCliente />
          <AgendaEntregas />
        </div>
      </div>
    </Section>
  )
}

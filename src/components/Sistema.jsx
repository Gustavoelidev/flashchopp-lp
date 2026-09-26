import { Icon, Section, SectionHead } from './ui'
import { Reveal, Stagger, RevealItem } from './motion'

const MODULOS = [
  ['chart', 'Dashboard'],
  ['box', 'Pedidos', '6'],
  ['keg', 'Produtos'],
  ['users', 'Clientes'],
  ['box', 'Estoque'],
  ['card', 'Financeiro'],
]

const FILTROS = [
  ['Todos', '38'],
  ['Pendente', '6'],
  ['Confirmado', '9'],
  ['A caminho', '4'],
  ['Entregue', '19'],
]

const STATUS = {
  Pendente: 'bg-gold border-gold',
  'A caminho': 'bg-transparent border-gold',
  Confirmado: 'bg-navy border-navy',
  Entregue: 'bg-text-mute border-text-mute',
}

const PEDIDOS = [
  ['#1042', 'Marina Souza', 'Vila Mariana', '1x Pilsen 30L', 'R$ 420,00', 'PIX', 'Pendente'],
  ['#1041', 'Rafael Lima', 'Pinheiros', '1x IPA 50L', 'R$ 690,00', 'PIX', 'A caminho'],
  ['#1040', 'Bar do Zeca', 'Moema', '2x Pilsen 50L', 'R$ 1.180,00', 'Crédito', 'Confirmado'],
  ['#1039', 'Julia Pires', 'Itaim Bibi', '1x Weiss 30L', 'R$ 480,00', 'PIX', 'Entregue'],
  ['#1038', 'Casa do Chopp', 'Vila Olímpia', '3x Pilsen 30L', 'R$ 1.260,00', 'PIX', 'Entregue'],
]

const COLS = ['w-[90px]', 'w-[180px]', 'w-[150px]', 'w-[160px]', 'w-[120px]', 'w-[100px]', 'flex-1']
const HEAD = ['PEDIDO', 'CLIENTE', 'BAIRRO', 'ITENS', 'VALOR', 'PAGAMENTO', 'STATUS']

export function StatusDot({ status, className = 'size-[7px]' }) {
  return <span className={`shrink-0 rounded-full border-[1.4px] ${STATUS[status]} ${className}`} />
}

export function Sistema() {
  return (
    <Section className="hidden bg-white py-[130px] lg:block">
      <div className="flex flex-col gap-16">
        <SectionHead
          label="A SOLUÇÃO"
          title="Transforme sua choperia em uma operação de delivery profissional."
          sub="Um sistema, cinco módulos que conversam entre si. Da vitrine online até o dinheiro na conta."
        />
        <Reveal y={40} className="flex w-full overflow-hidden rounded-[3px] border border-line-soft bg-white">
          <aside className="flex w-[213px] shrink-0 flex-col gap-[6px] border-r border-line-soft bg-cream-bg py-6">
            <span className="px-[22px] font-jb text-[9px] tracking-[1.3px] text-text-mute">MÓDULOS</span>
            <ul className="flex flex-col gap-[2px] pt-[10px]">
              {MODULOS.map(([icon, label, n]) => {
                const active = label === 'Pedidos'
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-3 py-[11px] transition-colors ${
                      active ? '-ml-px border-l-2 border-gold bg-white pr-[22px] pl-[21px]' : 'px-[22px] hover:bg-white/60'
                    }`}
                  >
                    <Icon name={icon} stroke={1.4} className={`size-4 ${active ? 'text-navy' : 'text-text-mute'}`} />
                    <span className={`flex-1 text-[13.5px] ${active ? 'font-semibold text-navy' : 'text-text-mute'}`}>{label}</span>
                    {n && <span className="font-jb text-[10.5px] text-gold">{n}</span>}
                  </li>
                )
              })}
            </ul>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col overflow-x-auto">
            <div className="flex items-center justify-between px-7 py-6">
              <div className="flex items-end gap-[14px]">
                <span className="text-[22px] font-semibold tracking-[-0.7px] text-navy">Pedidos</span>
                <span className="pb-[3px] text-[13px] text-text-mute">38 hoje · 6 aguardando confirmação</span>
              </div>
              <div className="flex items-center gap-[26px] text-[13px]">
                <span className="font-semibold text-navy">Hoje</span>
                <span className="text-text-mute">7 dias</span>
                <span className="text-text-mute">30 dias</span>
              </div>
            </div>
            <div className="h-px bg-line-soft" />
            <div className="flex items-center gap-[30px] px-7 py-4">
              {FILTROS.map(([label, n], i) => (
                <span key={label} className="flex items-center gap-2">
                  <span className={`text-[13px] ${i === 0 ? 'font-semibold text-navy' : 'text-text-mute'}`}>{label}</span>
                  <span className={`font-jb text-[10.5px] ${i === 0 ? 'text-gold' : 'text-text-mute'}`}>{n}</span>
                </span>
              ))}
            </div>
            <div className="h-px bg-line-soft" />
            <div className="flex min-w-[976px] bg-cream-bg px-7 py-[13px]">
              {HEAD.map((h, i) => (
                <span key={h} className={`${COLS[i]} shrink-0 font-jb text-[9px] tracking-[1px] text-text-mute`}>
                  {h}
                </span>
              ))}
            </div>
            <Stagger stagger={0.09} delay={0.3}>
            {PEDIDOS.map(([id, cliente, bairro, itens, valor, pg, status], i) => (
              <RevealItem
                key={id}
                className={`flex min-w-[976px] items-center px-7 py-[17px] text-[13.5px] transition-colors ${i === 0 ? 'bg-gold-tint' : 'border-t border-line-soft hover:bg-cream-bg'}`}
              >
                <span className={`${COLS[0]} shrink-0 font-jb text-[11.5px] text-text-mute`}>{id}</span>
                <span className={`${COLS[1]} shrink-0 font-medium text-navy`}>{cliente}</span>
                <span className={`${COLS[2]} shrink-0 text-text-mute`}>{bairro}</span>
                <span className={`${COLS[3]} shrink-0 text-text-mute`}>{itens}</span>
                <span className={`${COLS[4]} shrink-0 font-semibold text-navy`}>{valor}</span>
                <span className={`${COLS[5]} shrink-0 font-jb text-[11px] text-text-mute`}>{pg}</span>
                <span className="flex flex-1 items-center gap-[9px]">
                  <StatusDot status={status} />
                  <span className={`text-[13px] font-medium ${status === 'Entregue' ? 'text-text-mute' : 'text-navy'}`}>{status}</span>
                </span>
              </RevealItem>
            ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

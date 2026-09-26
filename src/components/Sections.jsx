import { Icon, Section, SectionHead, SectionLabel, Resp, CTA_HREF } from './ui'

/* ---------- Dashboard ---------- */

const KPIS = [
  ['RECEITA HOJE', 'R$ 4.280', '+24% vs ontem', true],
  ['PEDIDOS HOJE', '38', '+12% vs ontem'],
  ['TICKET MÉDIO', 'R$ 412', '−3% vs ontem'],
  ['META DIÁRIA', '71%', null],
]

const BARRAS = [67, 93, 58, 102, 80, 125, 147, 88, 112, 77, 131, 106, 141, 160]

const BAIRROS = [
  ['Vila Mariana', 'R$ 12.480', 91],
  ['Moema', 'R$ 10.120', 74],
  ['Pinheiros', 'R$ 7.940', 59],
  ['Itaim Bibi', 'R$ 5.360', 40],
  ['Vila Olímpia', 'R$ 3.610', 27],
]

function Kpi({ label, value, delta, gold, meta }) {
  return (
    <div className="flex flex-1 flex-col gap-2 px-[18px] py-5 lg:gap-3 lg:px-[30px] lg:py-7">
      <span className="font-jb text-[8.5px] tracking-[1.1px] text-text-mute lg:text-[9px] lg:tracking-[1.2px]">{label}</span>
      <span
        className={`text-[27px] leading-[27px] font-semibold tracking-[-1.2px] lg:text-[38px] lg:leading-[38px] lg:tracking-[-1.7px] ${
          gold ? 'text-gold' : 'text-navy'
        }`}
      >
        {value}
      </span>
      {meta ? (
        <>
          <span className="hidden h-[2px] w-full bg-line-cream lg:block">
            <span className="block h-full w-[71%] bg-gold" />
          </span>
          <span className="text-[11px] text-text-mute lg:text-[12px]">
            <Resp m="de R$ 6.000" d="R$ 4.280 de R$ 6.000" />
          </span>
        </>
      ) : (
        <span className="text-[11px] text-text-mute lg:text-[12px]">{delta}</span>
      )}
    </div>
  )
}

export function Dashboard() {
  return (
    <Section id="dashboard" className="bg-white py-[72px] lg:py-[130px]">
      <div className="flex flex-col gap-[30px] lg:gap-16">
        <SectionHead
          label="DASHBOARD"
          title="Tenha sua operação na palma da mão."
          sub="Saiba o que está acontecendo na sua operação sem precisar abrir uma planilha."
        />
        <div className="w-full overflow-hidden rounded-[3px] border border-line-soft bg-white">
          <div className="flex items-center justify-between border-b border-line-soft bg-cream-bg px-[18px] py-4 lg:px-7 lg:py-[22px]">
            <div className="flex flex-col gap-1 lg:gap-[5px]">
              <span className="text-[16px] font-semibold tracking-[-0.4px] text-navy lg:text-[19px] lg:tracking-[-0.5px]">Bom dia, Gustavo</span>
              <span className="text-[11.5px] text-text-mute lg:text-[12.5px]">
                <Resp m="Quinta, 25 de setembro" d="Quinta-feira, 25 de setembro · Chopp do Gama" />
              </span>
            </div>
            <div className="flex items-center gap-6 text-[12px] lg:text-[12.5px]">
              <span className="font-semibold text-navy">Hoje</span>
              <span className="hidden text-text-mute lg:inline">7 dias</span>
              <span className="hidden text-text-mute lg:inline">30 dias</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-line-soft lg:flex">
            {KPIS.map(([l, v, d, gold], i) => (
              <div
                key={l}
                className={`flex border-line-soft ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${
                  i === 1 ? 'lg:border-r' : ''
                } ${i === 3 ? 'lg:border-r-0' : ''} lg:flex-1`}
              >
                <Kpi label={l} value={v} delta={d} gold={gold} meta={i === 3} />
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-1 flex-col gap-4 border-b border-line-soft px-[18px] py-5 lg:gap-[22px] lg:border-r lg:border-b-0 lg:px-[30px] lg:py-7">
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-[5px]">
                  <span className="text-[13px] font-semibold text-navy lg:text-[14px]">Evolução de vendas</span>
                  <span className="hidden text-[12px] text-text-mute lg:block">Últimos 14 dias</span>
                </div>
                <span className="font-jb text-[10px] text-text-mute lg:text-[11px]">
                  <Resp m="14 dias" d="R$ 48.260 no período" />
                </span>
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex h-[110px] items-end gap-[5px] lg:h-[170px] lg:gap-[9px]">
                  {BARRAS.map((h, i) => (
                    <span
                      key={i}
                      className={`flex-1 ${i >= 11 ? 'bg-gold' : 'bg-cream'}`}
                      style={{ height: `${(h / 170) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="hidden gap-[9px] lg:flex">
                  {BARRAS.map((_, i) => (
                    <span key={i} className="flex-1 text-center font-jb text-[9.5px] text-text-mute">
                      {12 + i}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[14px] px-[18px] py-5 lg:w-[360px] lg:shrink-0 lg:gap-5 lg:px-[30px] lg:py-7">
              <div className="flex items-end justify-between">
                <span className="text-[13px] font-semibold text-navy lg:text-[14px]">Top bairros</span>
                <span className="hidden font-jb text-[10.5px] text-text-mute lg:inline">30 dias</span>
              </div>
              <div className="flex flex-col gap-[14px] lg:gap-0">
                {BAIRROS.map(([nome, valor, pct], i) => (
                  <div
                    key={nome}
                    className={`flex-col gap-[7px] lg:gap-[9px] lg:py-[13px] ${i > 0 ? 'lg:border-t lg:border-line-soft' : ''} ${
                      i > 2 ? 'hidden lg:flex' : 'flex'
                    }`}
                  >
                    <div className="flex items-center gap-[10px]">
                      <span className="flex-1 text-[13px] font-medium text-navy lg:text-[13.5px]">{nome}</span>
                      <span className="font-jb text-[11px] text-text-mute lg:text-[11.5px]">{valor}</span>
                    </div>
                    <span className="block h-[2px] w-full bg-line-soft">
                      <span className={`block h-full ${i === 0 ? 'bg-gold' : 'bg-cream'}`} style={{ width: `${pct}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- E mais ---------- */

const RECURSOS = [
  ['users', 'CRM', 'Quem compra, quanto gasta, de qual bairro e há quanto tempo não pede.', 'Quem compra, quanto gasta, de qual bairro e há quanto tempo não pede. Categorias automáticas: novo, ativo, fiel e inativo.'],
  ['box', 'Estoque', 'Quantidade real por produto e produto esgotado saindo da loja automaticamente.', 'Quantidade real por produto, alerta de estoque baixo e produto esgotado saindo da loja automaticamente.'],
  ['card', 'Financeiro', 'Faturamento, lucro líquido, ticket médio e projeção do mês.', 'Faturamento bruto, lucro líquido, ticket médio e projeção do mês, com a composição dos custos.'],
  ['pix', 'PIX automático', 'Pagamento via Asaas direto no pedido, com confirmação no painel.', 'Pagamento via Asaas direto no pedido, com a confirmação chegando no painel e no WhatsApp.'],
  ['chat', 'WhatsApp', 'O resumo do pedido vai para a conversa. O registro fica no sistema.', 'O resumo do pedido vai para a conversa com o cliente. O registro continua no sistema.'],
  ['bolt', 'Tempo real', 'Alterou no painel? A loja atualiza sem recarregar a página.', 'Alterou preço ou estoque no painel? A loja recebe a atualização sem recarregar a página.'],
]

export function MaisRecursos() {
  return (
    <Section className="bg-cream-bg py-[72px] lg:py-[130px]">
      <div className="flex flex-col gap-[30px] lg:gap-16">
        <SectionHead
          label="E MAIS"
          title="Um sistema inteiro por trás da sua loja."
          sub={<span className="hidden lg:inline">Cada módulo resolve uma parte da operação — e todos funcionam conectados.</span>}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {RECURSOS.map(([icon, titulo, curto, longo], i) => (
            <div
              key={titulo}
              className={`flex gap-4 border-line-cream py-[22px] lg:flex-col lg:gap-[18px] lg:py-10 ${
                i < RECURSOS.length - 1 ? 'border-b' : ''
              } ${i >= 3 ? 'lg:border-b-0' : ''} ${i % 3 === 0 ? 'lg:pr-12' : 'lg:border-l lg:px-12'}`}
            >
              <Icon name={icon} stroke={1.3} className="size-[22px] text-gold lg:size-[26px]" />
              <div className="flex flex-1 flex-col gap-[7px] lg:gap-[18px]">
                <h3 className="text-[19px] font-semibold tracking-[-0.5px] text-navy lg:text-[23px] lg:tracking-[-0.7px]">{titulo}</h3>
                <p className="text-[14px] leading-[22px] text-text-mute lg:text-[15px] lg:leading-[25px]">
                  <Resp m={curto} d={longo} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- Para quem é ---------- */

const PUBLICOS = [
  ['01', 'keg', 'Choperias', 'Para operações que fazem delivery.', [
    ['Loja online própria'],
    ['Pedidos por status', 'Pedidos organizados por status'],
    ['Agendamento de entregas'],
  ]],
  ['02', 'route', 'Distribuidoras', 'Para quem vende barris e acessórios.', [
    ['Catálogo de barris e CO₂'],
    ['Estoque por item', 'Controle de estoque por item'],
    ['Clientes no CRM', 'Clientes recorrentes no CRM'],
  ]],
  ['03', 'chart', 'Operações em crescimento', 'Para quem precisa sair do controle manual.', [
    ['Financeiro e margem'],
    ['Relatórios por bairro'],
    ['Tudo em um sistema só'],
  ]],
]

export function ParaQuem() {
  return (
    <Section id="para-quem-e" className="bg-white py-[72px] lg:py-[130px]">
      <div className="flex flex-col gap-[26px] lg:gap-14">
        <SectionHead
          label="PARA QUEM É"
          title="Feito para quem vive de chopp."
          sub={
            <span className="hidden lg:inline">
              Se o chopp sai da sua torneira ou do seu barril, o FlashChopp foi desenhado para a sua rotina.
            </span>
          }
        />
        <div className="grid grid-cols-1 border-t border-line-soft lg:grid-cols-3">
          {PUBLICOS.map(([n, icon, titulo, desc, itens], i) => (
            <div
              key={titulo}
              className={`flex flex-col gap-4 border-line-soft py-[26px] lg:gap-5 lg:pt-11 lg:pb-0 ${
                i < 2 ? 'border-b lg:border-b-0' : ''
              } ${i === 0 ? 'lg:pr-14' : 'lg:border-l lg:px-14'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-jb text-[11px] tracking-[0.6px] text-gold lg:text-[12px]">{n}</span>
                <Icon name={icon} stroke={1.3} className="size-[22px] text-navy lg:size-[26px]" />
              </div>
              <h3 className="text-[23px] leading-[26px] font-semibold tracking-[-0.7px] text-navy lg:text-[27px] lg:leading-[31px] lg:tracking-[-0.9px]">
                {titulo}
              </h3>
              <p className="text-[14.5px] leading-[23px] text-text-mute lg:text-[15.5px] lg:leading-[26px]">{desc}</p>
              <ul className="flex flex-col gap-[9px] lg:gap-0 lg:pt-2">
                {itens.map(([curto, longo]) => (
                  <li key={curto} className="flex items-center gap-3 lg:gap-[14px] lg:border-t lg:border-line-soft lg:py-[14px]">
                    <span className="font-jb text-[10.5px] text-gold lg:text-[11px]">—</span>
                    <span className="text-[14px] text-navy lg:text-[14.5px]">
                      <Resp m={curto} d={longo ?? curto} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- Planos ---------- */

const PLANOS = [
  {
    nome: 'Essencial',
    desc: 'Para quem está começando no delivery.',
    cta: 'Falar com a gente',
    itens: ['Loja online própria', 'Pedidos em um só painel', 'Cadastro de produtos', 'PIX automático via Asaas', 'Integração com WhatsApp'],
  },
  {
    nome: 'Profissional',
    desc: 'Para choperias que já entregam todo dia.',
    cta: 'Quero testar o FlashChopp',
    destaque: true,
    itens: ['Tudo do Essencial', 'Controle de estoque', 'CRM de clientes', 'Agendamento de entregas', 'Calculadora de chopp', 'Dashboard da operação'],
  },
  {
    nome: 'Distribuidora',
    desc: 'Para quem vende barris em volume.',
    cta: 'Falar com a gente',
    itens: ['Tudo do Profissional', 'Financeiro completo', 'Relatórios por bairro', 'Múltiplos operadores', 'Suporte prioritário'],
  },
]

function Plano({ nome, desc, cta, itens, destaque }) {
  return (
    <div
      className={`flex flex-1 flex-col gap-5 p-[26px] lg:gap-6 lg:px-11 lg:pt-11 lg:pb-12 ${
        destaque ? 'border-t-2 border-gold bg-navy-soft max-lg:border-x max-lg:border-b max-lg:border-x-navy-line max-lg:border-b-navy-line' : 'border border-navy-line lg:border-0'
      }`}
    >
      <div className="flex items-center gap-[10px] lg:gap-3">
        <h3 className="text-[21px] font-semibold tracking-[-0.6px] text-cream lg:text-[23px] lg:tracking-[-0.7px]">{nome}</h3>
        {destaque && <span className="font-jb text-[9px] tracking-[1.2px] text-gold">MAIS ESCOLHIDO</span>}
      </div>
      <p className="text-[14px] leading-[22px] text-navy-mute lg:text-[15px] lg:leading-[24px]">{desc}</p>
      <div className="flex flex-col gap-5 lg:gap-2 lg:pt-2">
        <span className={`text-[29px] font-semibold tracking-[-1.2px] lg:text-[34px] lg:tracking-[-1.4px] ${destaque ? 'text-gold' : 'text-cream'}`}>
          Sob consulta
        </span>
        <span className="text-[12px] leading-[18px] text-navy-mute lg:text-[12.5px] lg:leading-[19px]">Plano definido junto com a sua operação</span>
      </div>
      <a
        href="#contato"
        className={`flex items-center justify-center gap-[9px] rounded-[2px] p-[14px] transition-colors lg:gap-[10px] lg:p-[15px] ${
          destaque ? 'bg-gold text-navy hover:bg-gold-soft' : 'border border-navy-line text-cream hover:border-navy-mute'
        }`}
      >
        <span className="text-[14px] font-semibold lg:text-[14.5px]">{cta}</span>
        <Icon name="arrow" className="size-[15px]" />
      </a>
      <span className="h-px bg-navy-line" />
      <ul className="flex flex-col gap-3 lg:gap-[13px]">
        {itens.map((item, i) => (
          <li key={item} className="flex items-center gap-3 lg:gap-[13px]">
            <Icon name="check" stroke={1.8} className="size-[14px] text-gold" />
            <span className={`text-[14px] text-cream lg:text-[14.5px] ${i === 0 && item.startsWith('Tudo') ? 'font-semibold' : ''}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Planos() {
  return (
    <Section id="planos" className="bg-navy py-[72px] lg:py-[130px]">
      <div className="flex flex-col items-center gap-[26px] lg:gap-16">
        <div className="flex max-w-[760px] flex-col items-center gap-[26px] text-center lg:gap-6">
          <SectionLabel center>PLANOS</SectionLabel>
          <h2 className="text-[34px] leading-[37px] font-semibold tracking-[-1.4px] text-cream lg:text-[50px] lg:leading-[54px] lg:tracking-[-2.1px]">
            Comece a profissionalizar sua operação.
          </h2>
          <p className="max-w-[600px] text-[15px] leading-[26px] text-navy-mute lg:text-[17px] lg:leading-[29px]">
            Tenha sua loja online e as ferramentas para organizar sua operação em um único sistema.
          </p>
        </div>
        <div className="flex w-full flex-col lg:flex-row lg:border lg:border-navy-line">
          {PLANOS.map((p, i) => (
            <div key={p.nome} className={`flex flex-1 ${i > 0 ? 'lg:border-l lg:border-navy-line' : ''} ${p.destaque ? 'lg:-mt-px' : ''}`}>
              <Plano {...p} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- CTA final ---------- */

export function CtaFinal() {
  return (
    <section id="contato" className="w-full bg-gold">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[26px] px-5 py-16 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-24 lg:py-[100px] xl:px-24">
        <div className="flex flex-col gap-[26px] lg:max-w-[640px] lg:gap-5">
          <h2 className="text-[34px] leading-[37px] font-semibold tracking-[-1.4px] text-navy lg:text-[46px] lg:leading-[50px] lg:tracking-[-1.9px]">
            Pronto para organizar o delivery da sua choperia?
          </h2>
          <p className="text-[15.5px] leading-[26px] text-gold-ink-2 lg:max-w-[500px] lg:text-[17px] lg:leading-[29px]">
            Configure sua loja, cadastre seus barris e comece a receber pedidos organizados hoje mesmo.
          </p>
        </div>
        <div className="flex flex-col gap-[26px] lg:items-end lg:gap-[18px]">
          <a
            href={CTA_HREF}
            className="flex items-center justify-center gap-[11px] rounded-[2px] bg-navy p-[17px] text-cream transition-colors hover:bg-navy-deep lg:gap-3 lg:px-8 lg:py-[18px]"
          >
            <span className="text-[15.5px] font-semibold lg:text-[16.5px]">Começar agora</span>
            <Icon name="arrow" stroke={1.8} className="size-4 lg:size-[17px]" />
          </a>
          <a href={CTA_HREF} className="group flex items-center justify-center gap-[10px] text-navy">
            <span className="text-[14.5px] font-medium lg:text-[15px]">Falar com um especialista</span>
            <Icon name="arrow" className="size-[14px] transition-transform group-hover:translate-x-1 lg:size-[15px]" />
          </a>
          <span className="hidden text-[13px] text-gold-ink-2 lg:block">Sem taxa por pedido · suporte humano</span>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */

const LINKS = [
  ['PRODUTO', [['Loja online', 'Loja online'], ['Pedidos'], ['Agendamento'], ['Calculadora', 'Calculadora de chopp']]],
  ['GESTÃO', [['Dashboard'], ['Estoque'], ['CRM'], ['Financeiro']]],
  ['EMPRESA', [['Sobre a GamaCloud'], ['Contato'], ['Termos de uso'], ['Privacidade']]],
]

export function Footer() {
  return (
    <footer className="w-full bg-navy">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-9 px-5 pt-[52px] pb-7 md:px-10 lg:gap-14 lg:pt-[72px] lg:pb-8 xl:px-24">
        <div className="flex flex-col gap-9 lg:flex-row lg:gap-24">
          <div className="flex flex-col gap-9 lg:w-[340px] lg:shrink-0 lg:gap-[22px]">
            <img src="/flashchopp-logo.png" alt="FlashChopp" className="h-[51px] w-[110px] object-contain lg:h-[61px] lg:w-[132px]" />
            <p className="text-[14px] leading-[24px] text-navy-mute lg:text-[14.5px] lg:leading-[25px]">
              Sistema de delivery e gestão para choperias e distribuidoras de chopp.
            </p>
          </div>
          <div className="flex gap-5 lg:contents">
            {LINKS.map(([titulo, links], i) => (
              <div key={titulo} className={`flex flex-1 flex-col gap-[14px] lg:gap-4 ${i === 2 ? 'hidden lg:flex' : ''}`}>
                <span className="font-jb text-[9px] tracking-[1.2px] text-gold lg:text-[9.5px] lg:tracking-[1.3px]">{titulo}</span>
                {links.map(([curto, longo]) => (
                  <span key={curto} className="text-[13.5px] text-navy-mute lg:text-[14px]">
                    <Resp m={curto} d={longo ?? curto} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-9 border-t border-navy-line pt-9 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pt-14">
          <span className="text-[12px] leading-[19px] text-navy-mute lg:text-[12.5px]">© 2026 FlashChopp — um produto GamaCloud.</span>
          <span className="hidden font-jb text-[10.5px] tracking-[0.6px] text-navy-mute lg:inline">Pagamentos via PIX e Asaas</span>
        </div>
      </div>
    </footer>
  )
}

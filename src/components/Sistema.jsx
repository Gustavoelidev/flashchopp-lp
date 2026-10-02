import { Section, SectionHead } from './ui'
import { Reveal } from './motion'
import { BrowserFrame, PainelShot } from './Painel'

const STATUS = {
  Pendente: 'bg-gold border-gold',
  'A caminho': 'bg-transparent border-gold',
  Confirmado: 'bg-navy border-navy',
  Entregue: 'bg-text-mute border-text-mute',
}

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
        <Reveal y={40}>
          <BrowserFrame>
            <PainelShot
              name="01-visao-geral"
              alt="Painel FlashChopp, Visão geral: receita do dia, pedidos, ticket médio, meta diária, gráfico de pedidos por dia, últimos pedidos e vendas por bairro"
            />
          </BrowserFrame>
        </Reveal>
      </div>
    </Section>
  )
}

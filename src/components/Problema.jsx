import { SectionLabel, Quote, Section, Resp } from './ui'
import { Stagger, RevealItem } from './motion'

const DORES = [
  ['01', 'Pedidos espalhados entre conversas', 'O histórico se perde no meio do dia.', 'Cada cliente em uma janela diferente, e o histórico se perde no meio do dia.'],
  ['02', 'Estoque conferido de cabeça', 'Você descobre que acabou depois de vender.', 'Você só descobre que o barril acabou depois de vender.'],
  ['03', '“Já saiu meu pedido?”', 'A mesma pergunta, sempre respondida à mão.', 'A mesma pergunta várias vezes, sempre respondida manualmente.'],
  ['04', 'Faturamento só no fim do mês', 'Sem ticket médio, margem ou origem das vendas.', 'Sem saber o ticket médio, a margem ou de onde vêm as vendas.'],
]

export function Problema() {
  return (
    <Section className="bg-cream-bg py-[72px] lg:py-[130px]">
      <div className="flex flex-col gap-[30px] lg:flex-row lg:gap-24">
        <Stagger className="flex flex-col gap-[30px] lg:w-[500px] lg:shrink-0 lg:gap-7" stagger={0.12}>
          <RevealItem>
            <SectionLabel>O PROBLEMA</SectionLabel>
          </RevealItem>
          <RevealItem
            as="h2"
            className="text-[34px] leading-[38px] font-semibold tracking-[-1.4px] text-navy lg:text-[44px] lg:leading-[48px] lg:tracking-[-1.8px]"
          >
            Sua choperia ainda funciona assim?
          </RevealItem>
          <RevealItem as="p" className="text-[15.5px] leading-[26px] text-text-mute lg:max-w-[430px] lg:text-[17px] lg:leading-[29px]">
            Quando os pedidos aumentam, controlar tudo pelo WhatsApp, planilhas e anotações começa a consumir tempo e
            aumenta a chance de erro.
          </RevealItem>
          <div className="hidden lg:block lg:pt-[18px]">
            <Quote>O problema não é o WhatsApp. É não ter um lugar onde tudo fica registrado.</Quote>
          </div>
        </Stagger>

        <Stagger as="ol" className="flex flex-1 flex-col lg:pt-2" stagger={0.12} delay={0.15}>
          {DORES.map(([n, titulo, curto, longo], i) => (
            <RevealItem
              as="li"
              key={n}
              className={`group flex gap-[18px] py-5 lg:gap-7 lg:py-[26px] ${i < DORES.length - 1 ? 'border-b border-line-cream' : ''}`}
            >
              <span className="w-6 shrink-0 font-jb text-[11px] tracking-[0.6px] text-gold transition-transform duration-300 group-hover:translate-x-1 lg:w-[30px] lg:text-[12px]">{n}</span>
              <div className="flex flex-1 flex-col gap-[7px] lg:gap-2">
                <h3 className="text-[17px] leading-[21px] font-medium tracking-[-0.4px] text-navy lg:text-[20px] lg:leading-normal lg:tracking-[-0.5px]">
                  {titulo}
                </h3>
                <p className="text-[13.5px] leading-[22px] text-text-mute lg:text-[14.5px] lg:leading-[23px]">
                  <Resp m={curto} d={longo} />
                </p>
              </div>
            </RevealItem>
          ))}
        </Stagger>

        <div className="lg:hidden">
          <Quote>O problema não é o WhatsApp. É não ter um lugar onde tudo fica registrado.</Quote>
        </div>
      </div>
    </Section>
  )
}

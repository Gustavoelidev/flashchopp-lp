import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon, Section, SectionLabel, WA, EXTERNAL } from './ui'
import { EASE, RevealItem, Stagger } from './motion'

const PERGUNTAS = [
  [
    'Tem taxa por pedido?',
    'Não. O FlashChopp não cobra taxa por pedido. O plano é definido junto com a sua operação, conforme o tamanho da choperia ou distribuidora.',
  ],
  [
    'Meu cliente precisa baixar algum aplicativo?',
    'Não. A loja abre direto no navegador do celular, pelo link da sua choperia. O cliente escolhe o chopp, informa o endereço e finaliza o pedido ali mesmo.',
  ],
  [
    'Como recebo os pagamentos?',
    'Pelo PIX automático via Asaas, com a confirmação chegando no painel e no WhatsApp. Se preferir, o cliente também pode pagar com cartão ou dinheiro na entrega.',
  ],
  [
    'Dá para agendar as entregas?',
    'Sim. O cliente escolhe o dia e a janela de horário (manhã, tarde ou noite), e você define quantas entregas cabem em cada turno.',
  ],
  [
    'Funciona para distribuidoras?',
    'Sim. O plano Distribuidora inclui catálogo de barris e CO₂, controle de estoque por item, financeiro completo, relatórios por bairro e múltiplos operadores.',
  ],
  [
    'E se eu continuar recebendo pedidos pelo WhatsApp?',
    'Sem problema. O resumo de cada pedido vai para a conversa com o cliente, e o registro fica guardado no sistema com status, pagamento e horário.',
  ],
]

function Item({ pergunta, resposta, open, onToggle, id }) {
  return (
    <div className="border-b border-line-soft">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left lg:py-7"
        >
          <span className="text-[17px] leading-[24px] font-semibold tracking-[-0.3px] text-navy transition-colors group-hover:text-gold lg:text-[19px]">
            {pergunta}
          </span>
          <span
            className={`relative flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              open ? 'border-gold bg-gold' : 'border-line-cream group-hover:border-gold'
            }`}
          >
            <span className="absolute h-[1.5px] w-3 bg-navy" />
            <motion.span
              className="absolute h-3 w-[1.5px] bg-navy"
              animate={{ scaleY: open ? 0 : 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[620px] pb-7 text-[15px] leading-[26px] text-text-mute lg:text-[16px] lg:leading-[27px]">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [aberta, setAberta] = useState(0)
  return (
    <Section id="duvidas" className="bg-white py-[72px] lg:py-[130px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
        <Stagger className="flex flex-col gap-[26px] lg:sticky lg:top-32 lg:w-[400px] lg:shrink-0 lg:self-start" stagger={0.1}>
          <RevealItem>
            <SectionLabel>DÚVIDAS FREQUENTES</SectionLabel>
          </RevealItem>
          <RevealItem
            as="h2"
            className="text-[34px] leading-[38px] font-semibold tracking-[-1.4px] text-navy lg:text-[46px] lg:leading-[51px] lg:tracking-[-1.9px]"
          >
            Perguntas que toda choperia faz.
          </RevealItem>
          <RevealItem as="p" className="text-[15.5px] leading-[26px] text-text-mute lg:text-[16px] lg:leading-[27px]">
            Não achou o que procurava? Fale com a gente e monte o plano certo para a sua operação.
          </RevealItem>
          <RevealItem>
            <a href={WA.especialista} {...EXTERNAL} className="group inline-flex items-center gap-[10px] text-[15px] font-semibold text-navy">
              <span className="border-b border-gold pb-[2px]">Falar com um especialista</span>
              <Icon name="arrow" className="size-4 text-gold transition-transform group-hover:translate-x-1" />
            </a>
          </RevealItem>
        </Stagger>

        <Stagger className="flex-1 border-t border-line-soft" stagger={0.06} delay={0.1}>
          {PERGUNTAS.map(([p, r], i) => (
            <RevealItem key={p}>
              <Item
                id={`faq-${i}`}
                pergunta={p}
                resposta={r}
                open={aberta === i}
                onToggle={() => setAberta(aberta === i ? -1 : i)}
              />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

import { Icon, FeatureLabel, Section } from './ui'
import { PhoneVideo } from './Phone'
import { CountUp, Float, Reveal, RevealItem, Stagger } from './motion'

/* Mesmo resultado que o app mostra no vídeo: 50 convidados, 75% bebem, consumo moderado */
function ResultadoCard() {
  return (
    <div className="flex w-[268px] flex-col gap-4 rounded-[3px] bg-gold p-6">
      <span className="font-jb text-[9.5px] tracking-[1.4px] text-gold-ink">QUANTIDADE IDEAL</span>
      <div className="flex items-end gap-[10px]">
        <span className="text-[54px] leading-[54px] font-semibold tracking-[-2.6px] text-navy">
          ≈ <CountUp to={62} duration={1.8} />
        </span>
        <span className="pb-[6px] text-[18px] font-medium tracking-[-0.5px] text-navy">litros</span>
      </div>
      <span className="text-[12px] leading-[17px] text-gold-ink-2">50 convidados · 75% bebem · consumo moderado</span>
      <span className="h-px bg-navy/20" />
      {[
        ['1x Barril 50L', 'R$ 700,00'],
        ['1x Barril 30L', 'R$ 450,00'],
      ].map(([a, v]) => (
        <div key={a} className="flex items-center gap-3">
          <Icon name="keg" stroke={1.4} className="size-[17px] text-navy" />
          <span className="flex-1 text-[13.5px] font-medium text-navy">{a}</span>
          <span className="text-[13px] font-semibold text-navy">{v}</span>
        </div>
      ))}
      <div className="flex items-end justify-between pt-1">
        <span className="text-[12.5px] text-gold-ink-2">Total estimado</span>
        <span className="text-[18px] font-semibold tracking-[-0.5px] text-navy">R$ 1.150,00</span>
      </div>
    </div>
  )
}

export function Calculadora() {
  return (
    <Section id="calculadora" className="relative overflow-hidden bg-navy py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-10 xl:flex-row-reverse xl:items-center xl:gap-24">
        <Stagger className="flex flex-col gap-7 xl:w-[460px] xl:shrink-0 xl:gap-[26px]" stagger={0.1}>
          <RevealItem>
            <FeatureLabel n="04" dark>
              CALCULADORA DE CHOPP
            </FeatureLabel>
          </RevealItem>
          <RevealItem
            as="h2"
            className="text-[32px] leading-[36px] font-semibold tracking-[-1.3px] text-cream lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.6px]"
          >
            Seu cliente sabe quantos litros pedir antes de comprar.
          </RevealItem>
          <RevealItem as="p" className="text-[15.5px] leading-[26px] text-navy-mute lg:text-[17px] lg:leading-[29px]">
            Ele informa quantos convidados vêm e o perfil de consumo. A calculadora sugere os litros e a combinação de barris que evita sobra.
          </RevealItem>
          <RevealItem as="p" className="text-[13.5px] text-navy-mute">
            Disponível dentro da sua loja online.
          </RevealItem>
        </Stagger>

        <div className="relative mx-auto flex w-full max-w-[350px] shrink-0 flex-col items-center md:block md:h-[680px] md:w-[560px] md:max-w-none xl:mx-0 xl:flex-1">
          <Reveal y={60} className="md:absolute md:top-0 md:right-[60px] xl:right-auto xl:left-[280px]">
            <PhoneVideo
              name="app-calculadora"
              label="Gravação do app FlashChopp: calculadora sugere 62 litros, um barril de 50L e um de 30L"
            />
          </Reveal>
          <Float delay={0.6} className="relative z-10 -mt-24 self-start md:absolute md:bottom-6 md:left-[20px] md:mt-0 xl:bottom-12 xl:left-[60px]">
            <ResultadoCard />
          </Float>
        </div>
      </div>
    </Section>
  )
}

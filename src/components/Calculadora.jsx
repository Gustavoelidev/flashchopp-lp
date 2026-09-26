import { useMemo, useState } from 'react'
import { Icon, FeatureLabel, Section, CTA_HREF } from './ui'

const PERFIS = [
  ['Leve', 1, '~1L'],
  ['Moderado', 1.6, '~1,6L'],
  ['Alto', 2.2, '~2,2L'],
]

const BARRIS = [
  { litros: 50, preco: 690 },
  { litros: 30, preco: 420 },
]

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/* Litros: quem bebe × consumo do perfil, proporcional a um evento de 4h, com ~3% de margem */
function calcular(convidados, pct, horas, perfil) {
  const litros = Math.round(convidados * (pct / 100) * perfil * (horas / 4) * 1.03)
  let melhor = null
  const max50 = Math.ceil(litros / 50) + 1
  for (let a = 0; a <= max50; a++) {
    const resto = Math.max(0, litros - a * 50)
    const b = Math.ceil(resto / 30)
    const preco = a * 690 + b * 420
    const cap = a * 50 + b * 30
    if (!melhor || preco < melhor.preco || (preco === melhor.preco && cap < melhor.cap)) melhor = { a, b, preco, cap }
  }
  const itens = BARRIS.map((barril, i) => ({ ...barril, qtd: i === 0 ? melhor.a : melhor.b })).filter((x) => x.qtd > 0)
  return { litros, itens, total: melhor.preco }
}

function Slider({ label, value, display, min, max, step = 1, onChange }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="flex w-full flex-col gap-3">
      <span className="flex items-center justify-between">
        <span className="text-[14px] text-text-mute">{label}</span>
        <span className="font-jb text-[14px] font-medium text-navy">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="fc-range"
        style={{ '--fill': `${pct}%` }}
      />
    </label>
  )
}

export function Calculadora() {
  const [convidados, setConvidados] = useState(50)
  const [pct, setPct] = useState(75)
  const [horas, setHoras] = useState(4)
  const [perfil, setPerfil] = useState(1)

  const r = useMemo(() => calcular(convidados, pct, horas, PERFIS[perfil][1]), [convidados, pct, horas, perfil])
  const resumo = `${convidados} convidados · ${pct}% bebem · consumo ${PERFIS[perfil][0].toLowerCase()}`
  const horasLabel = `${horas} ${horas === 1 ? 'hora' : 'horas'}`

  return (
    <Section className="bg-navy py-[72px] lg:py-[120px]">
      <div className="flex flex-col gap-7 xl:flex-row-reverse xl:items-center xl:gap-24">
        <div className="flex flex-col gap-7 xl:w-[460px] xl:shrink-0 xl:gap-[26px]">
          <FeatureLabel n="04" dark>
            CALCULADORA DE CHOPP
          </FeatureLabel>
          <h2 className="text-[32px] leading-[36px] font-semibold tracking-[-1.3px] text-cream lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.6px]">
            Não sabe quanto chopp pedir? Seu cliente também não precisa saber.
          </h2>
          <p className="text-[15.5px] leading-[26px] text-navy-mute lg:text-[17px] lg:leading-[29px]">
            Uma ferramenta simples que ajuda o cliente a decidir quanto comprar — e reduz a dúvida antes do pedido.
          </p>
          <a
            href={CTA_HREF}
            className="hidden w-fit items-center gap-[11px] rounded-[2px] bg-gold px-7 py-4 text-navy transition-colors hover:bg-gold-soft md:flex"
          >
            <span className="text-[15.5px] font-semibold">Calcular quantidade ideal</span>
            <Icon name="arrow" stroke={1.8} className="size-4" />
          </a>
          <span className="hidden text-[13.5px] text-navy-mute md:block">Disponível dentro da sua loja online.</span>
        </div>

        <div className="flex flex-col gap-7 md:flex-row md:gap-0 md:overflow-hidden md:rounded-[3px] md:bg-white xl:min-h-[430px] xl:flex-1">
          {/* Mobile: resumo estático, como no design */}
          <div className="flex flex-col gap-4 rounded-[3px] bg-white p-[22px] md:hidden">
            {[
              ['Número de convidados', '50'],
              ['Quantos bebem chopp', '75%'],
              ['Perfil de consumo', 'Moderado'],
              ['Duração do evento', '4 horas'],
            ].map(([l, v], i) => (
              <div key={l} className="flex flex-col gap-4">
                {i > 0 && <span className="h-px bg-line-soft" />}
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] text-text-mute">{l}</span>
                  <span className="font-jb text-[13px] font-medium text-navy">{v}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: interativo */}
          <div className="hidden flex-1 flex-col justify-center gap-[26px] p-8 md:flex">
            <span className="text-[21px] font-semibold tracking-[-0.6px] text-navy">Quanto chopp você precisa?</span>
            <Slider label="Número de convidados" value={convidados} display={convidados} min={10} max={150} step={5} onChange={setConvidados} />
            <Slider label="Quantos bebem chopp" value={pct} display={`${pct}%`} min={10} max={100} step={5} onChange={setPct} />
            <Slider label="Duração do evento" value={horas} display={horasLabel} min={1} max={8} onChange={setHoras} />
            <div className="flex flex-col gap-3">
              <span className="text-[14px] text-text-mute">Perfil de consumo</span>
              <div className="flex gap-2">
                {PERFIS.map(([nome, , desc], i) => {
                  const active = i === perfil
                  return (
                    <button
                      key={nome}
                      type="button"
                      onClick={() => setPerfil(i)}
                      aria-pressed={active}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-[2px] border px-[10px] py-[11px] transition-colors ${
                        active ? 'border-navy bg-navy' : 'border-line-cream hover:border-navy-mute'
                      }`}
                    >
                      <span className={`text-[13px] font-semibold ${active ? 'text-cream' : 'text-navy'}`}>{nome}</span>
                      <span className={`text-[11px] ${active ? 'text-navy-mute' : 'text-text-mute'}`}>{desc}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-[18px] rounded-[3px] bg-gold p-8 md:w-[318px] md:shrink-0 md:rounded-none">
            <span className="font-jb text-[9.5px] tracking-[1.4px] text-gold-ink">QUANTIDADE IDEAL</span>
            <div className="flex items-end gap-[10px]">
              <span className="text-[62px] leading-[62px] font-semibold tracking-[-3px] text-navy">≈ {r.litros}</span>
              <span className="pb-2 text-[20px] font-medium tracking-[-0.5px] text-navy">litros</span>
            </div>
            <span className="text-[12px] leading-[17px] text-gold-ink-2">{resumo}</span>
            <span className="h-px bg-navy/20" />
            <span className="font-jb text-[9.5px] tracking-[1.4px] text-gold-ink">SUGESTÃO DE BARRIS</span>
            {r.itens.map((b) => (
              <div key={b.litros} className="flex items-center gap-3">
                <Icon name="keg" stroke={1.4} className="size-[17px] text-navy" />
                <span className="flex-1 text-[13.5px] font-medium text-navy">
                  {b.qtd}x Barril {b.litros}L
                </span>
                <span className="text-[13px] font-semibold text-navy">{brl(b.qtd * b.preco)}</span>
              </div>
            ))}
            <div className="flex items-end justify-between pt-1">
              <span className="text-[12.5px] text-gold-ink-2">Total estimado</span>
              <span className="text-[18px] font-semibold tracking-[-0.5px] text-navy">{brl(r.total)}</span>
            </div>
            <div className="flex items-center justify-center gap-[9px] rounded-[2px] bg-navy p-[13px]">
              <span className="text-[13.5px] font-semibold text-cream">Adicionar ao carrinho</span>
              <Icon name="arrow" className="size-[15px] text-cream" />
            </div>
          </div>

          <a href={CTA_HREF} className="flex items-center justify-center gap-[10px] rounded-[2px] bg-gold p-4 text-navy md:hidden">
            <span className="text-[15px] font-semibold">Calcular quantidade ideal</span>
            <Icon name="arrow" stroke={1.8} className="size-4" />
          </a>
        </div>
      </div>
    </Section>
  )
}

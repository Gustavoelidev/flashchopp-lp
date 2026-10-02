/* Prints reais do painel admin (public/painel), dentro de uma moldura de navegador */

/* w/h: tamanho do arquivo grande; recortes (agenda, modal) têm proporção própria */
export function PainelShot({ name, alt, w = 1920, h = 1200, sizes = '(min-width: 1440px) 1248px, 100vw', eager = false, className = '' }) {
  return (
    <img
      src={`/painel/${name}.webp`}
      srcSet={`/painel/${name}-960.webp 960w, /painel/${name}.webp ${w}w`}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`block h-auto w-full ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    />
  )
}

export function BrowserFrame({ url = 'suachoperia.flashchopp.com.br/admin', children }) {
  return (
    <div className="w-full overflow-hidden rounded-[6px] border border-line-soft bg-white shadow-[0_30px_80px_-40px_rgba(29,44,58,0.35)]">
      <div className="flex items-center gap-3 border-b border-line-soft bg-cream-bg px-3 py-[9px] lg:gap-4 lg:px-4 lg:py-3">
        <span className="flex gap-[6px]" aria-hidden="true">
          <span className="size-[7px] rounded-full bg-line-cream lg:size-[9px]" />
          <span className="size-[7px] rounded-full bg-line-cream lg:size-[9px]" />
          <span className="size-[7px] rounded-full bg-line-cream lg:size-[9px]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-[3px] bg-white px-3 py-[3px] text-center font-jb text-[9.5px] text-text-mute lg:mx-auto lg:max-w-[420px] lg:text-[11px]">
          {url}
        </span>
        <span className="hidden w-[39px] lg:block" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}

export function PainelLegenda({ titulo, className = '', children }) {
  return (
    <p className={`text-[13.5px] leading-[22px] text-text-mute lg:text-[14.5px] ${className}`}>
      <span className="font-semibold text-navy">{titulo}:</span> {children}.
    </p>
  )
}

import { useEffect, useRef } from 'react'

/* Moldura de celular (proporção 390×844 do app) com gravação real do FlashChopp */
export function PhoneVideo({ name, label, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Só baixa e toca o vídeo quando o celular aparece na tela
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== 'auto') {
            video.preload = 'auto'
            video.load()
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`relative w-[296px] shrink-0 rounded-[38px] bg-navy-deep p-[7px] ${className}`}>
      <div className="relative h-[610px] w-[282px] overflow-hidden rounded-[31px] bg-black">
        <video
          ref={ref}
          className="size-full object-cover"
          poster={`/app/${name}.jpg`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
        >
          <source src={`/app/${name}.webm`} type="video/webm" />
          <source src={`/app/${name}.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/* Aparece subindo quando entra na tela */
export function Reveal({ as = 'div', delay = 0, y = 24, x = 0, className = '', children, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/* Container que revela os filhos (RevealItem) em sequência */
export function Stagger({ as = 'div', className = '', stagger = 0.08, delay = 0, amount = 0.15, children, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </M>
  )
}

export const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export function RevealItem({ as = 'div', className = '', children, ...rest }) {
  const M = motion[as]
  return (
    <M className={className} variants={itemVariants} {...rest}>
      {children}
    </M>
  )
}

/* Barra que cresce (scaleX/scaleY) ao entrar na tela */
export function Grow({ axis = 'x', delay = 0, className = '', style, ...rest }) {
  const scale = axis === 'x' ? 'scaleX' : 'scaleY'
  return (
    <motion.span
      className={className}
      style={{ originX: 0, originY: 1, ...style }}
      initial={{ [scale]: 0 }}
      whileInView={{ [scale]: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    />
  )
}

/* Número que conta de 0 até o valor quando aparece */
export function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const format = (v) =>
    prefix + v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix
  const [text, setText] = useState(format(reduce ? to : 0))

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setText(format(v)) })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </span>
  )
}

/* Entrada dos cards que ficam sobre os celulares */
export function Float({ className = '', delay = 0, children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Avança um índice em loop enquanto o elemento está visível */
export function useCycle(length, ms, ref) {
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [inView, reduce, length, ms])
  return i
}

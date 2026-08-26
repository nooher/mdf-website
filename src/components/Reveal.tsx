import { useEffect, useRef, useState } from 'react'

/** Fades content up as it scrolls into view (respects reduced-motion via CSS). */
export default function Reveal({ children, as: Tag = 'div', delay = 0, style, className = '' }: {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  delay?: number
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  const Comp = Tag as any
  return (
    <Comp
      ref={ref}
      className={`reveal-in ${seen ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Comp>
  )
}

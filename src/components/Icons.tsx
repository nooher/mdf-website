/* Inline line-icons in the emblem's stroke style. currentColor stroke. */
type P = { size?: number; className?: string; style?: React.CSSProperties }
const base = (size = 24): React.SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true, focusable: false,
})

// ── programme icons ──────────────────────────────────────────────────────
// Plain, well-proportioned single-glyph icons — no decorative flourishes.
export function IconPoverty({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  )
}
export function IconEducation({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <path d="M3 4h5a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H3V4Z" />
      <path d="M21 4h-5a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H21V4Z" />
    </svg>
  )
}
export function IconYouth({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <path d="M22 7 13 16l-4-4-7 7" />
      <path d="M16 7h6v6" />
    </svg>
  )
}
export function IconIslamic({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <path d="M20 13.2A8 8 0 1 1 10.8 4a6.3 6.3 0 0 0 9.2 9.2Z" />
    </svg>
  )
}

export const PROGRAMME_ICON: Record<string, (p: P) => JSX.Element> = {
  'poverty-relief': IconPoverty,
  education: IconEducation,
  'youth-development': IconYouth,
  'islamic-education': IconIslamic,
}

// ── process icons ("How we work" steps) ────────────────────────────────
export function IconCompass({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <circle cx="12" cy="12" r="8" />
      <path d="M14.5 9.5 13 13l-3.5 1.5L11 11l3.5-1.5Z" />
    </svg>
  )
}
export function IconPartnership({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <circle cx="9.5" cy="12" r="6" />
      <circle cx="15.2" cy="12" r="6" />
    </svg>
  )
}
export function IconPackage({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  )
}
export function IconReport({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
      <rect x="9" y="3" width="6" height="3" rx="1" />
      <path d="M9 13.3 11 15.3l4.2-4.4" />
    </svg>
  )
}

export const WORK_STEP_ICON = [IconCompass, IconPartnership, IconPackage, IconReport]

// ── UI icons ─────────────────────────────────────────────────────────────
export function IconLock({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  )
}
export function IconCheck({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.2 2.3 2.3 4.7-4.9" />
    </svg>
  )
}
export function IconMenu({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  )
}
export function IconClose({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}><path d="M6 6l12 12M18 6 6 18" /></svg>
  )
}
export function IconShield({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}><path d="M12 3.5 5 6v5c0 4 3 7.5 7 9.5 4-2 7-5.5 7-9.5V6l-7-2.5Z" /><path d="m9 12 2 2 4-4" /></svg>
  )
}
export function IconLeaf({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}><path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14-1 0-2-.2-2-2Z" /><path d="M9 15c2-3 4-4.5 7-5.5" /></svg>
  )
}
export function IconCrescent({ size, ...r }: P) {
  return (
    <svg {...base(size)} {...r}><path d="M15.5 4.5a7.5 7.5 0 1 0 0 15 6 6 0 0 1 0-15Z" /></svg>
  )
}

// ── social icons (filled, currentColor) ──────────────────────────────────
const fill = (size = 20): React.SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, focusable: false,
})
export function IconFacebook({ size }: P) {
  return <svg {...fill(size)}><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.8v3h2.7v8h3Z" /></svg>
}
export function IconInstagram({ size }: P) {
  return <svg {...fill(size)}><path d="M12 2.7c3 0 3.4 0 4.6.1 3.1.1 4.5 1.6 4.6 4.6.1 1.2.1 1.6.1 4.6s0 3.4-.1 4.6c-.1 3-1.5 4.5-4.6 4.6-1.2.1-1.6.1-4.6.1s-3.4 0-4.6-.1c-3.1-.1-4.5-1.6-4.6-4.6C2.7 15.4 2.7 15 2.7 12s0-3.4.1-4.6C2.9 4.4 4.3 2.9 7.4 2.8 8.6 2.7 9 2.7 12 2.7Zm0 4.6a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" /></svg>
}
export function IconX({ size }: P) {
  return <svg {...fill(size)}><path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21h-3l7-8L2.5 3h6.1l4.2 5.6L17.5 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5Z" /></svg>
}
export function IconLinkedIn({ size }: P) {
  return <svg {...fill(size)}><path d="M6.9 8.8v11.4H3.5V8.8h3.4ZM5.2 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4.3 5.3h3.3v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.6 0 4.2 2.3 4.2 5.3v6.3h-3.4v-5.6c0-1.3 0-3-1.9-3-1.8 0-2.1 1.5-2.1 2.9v5.7H9.5V8.8Z" /></svg>
}
export function IconWhatsApp({ size }: P) {
  return <svg {...fill(size)}><path d="M12 3a8.9 8.9 0 0 0-7.6 13.6L3 21l4.5-1.3A8.9 8.9 0 1 0 12 3Zm0 16a7 7 0 0 1-3.6-1l-.3-.2-2.7.7.7-2.6-.2-.3A7 7 0 1 1 12 19Zm3.9-5.2c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1a5.7 5.7 0 0 1-2.8-2.5c-.2-.4.2-.3.5-1 .1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.2 2.9a9 9 0 0 0 3.4 3c2 .9 2 .6 2.4.6.4 0 1.3-.5 1.5-1 .2-.6.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" /></svg>
}

export function IconTikTok({ size }: P) {
  return <svg {...fill(size)}><path d="M16.6 3h-2.7v12.5a2.4 2.4 0 1 1-2.4-2.4c.2 0 .5 0 .7.1v-2.8a5.2 5.2 0 1 0 4.4 5.1V9a6.4 6.4 0 0 0 3.6 1.1V7.4a3.7 3.7 0 0 1-3.6-3.7V3Z" /></svg>
}
export function IconYouTube({ size }: P) {
  return <svg {...fill(size)}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1L10 15.1Z" /></svg>
}

export const SOCIAL_ICON: Record<string, (p: P) => JSX.Element> = {
  Facebook: IconFacebook, Instagram: IconInstagram, LinkedIn: IconLinkedIn,
  TikTok: IconTikTok, YouTube: IconYouTube, X: IconX, WhatsApp: IconWhatsApp,
}

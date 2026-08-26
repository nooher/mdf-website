import { Link } from 'react-router-dom'
import { CHARITY, SOCIALS } from '../data'
import { IconShield, IconLeaf, IconCrescent, SOCIAL_ICON } from './Icons'

/** Social icons — active handles render as links; empty ones show disabled. */
export function SocialLinks({ variant = 'dark', size = 20 }: { variant?: 'dark' | 'light'; size?: number }) {
  const light = variant === 'light'
  const ring = light ? 'rgba(255,255,255,.22)' : 'var(--hair)'
  const fg = light ? 'rgba(255,255,255,.85)' : 'var(--emerald)'
  const muted = light ? 'rgba(255,255,255,.3)' : 'var(--hair)'
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {SOCIALS.map(s => {
        const Icon = SOCIAL_ICON[s.name]
        const active = s.url.trim().length > 0
        const box: React.CSSProperties = {
          width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center',
          border: `1px solid ${active ? ring : muted}`, color: active ? fg : muted,
          transition: 'background .2s, color .2s, border-color .2s',
        }
        return active ? (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="social-link" style={box}>
            {Icon && <Icon size={size} />}
          </a>
        ) : (
          <span key={s.name} aria-hidden style={box} title={`${s.name} — coming soon`}>{Icon && <Icon size={size} />}</span>
        )
      })}
    </div>
  )
}

/** Brand lockup: emblem + typeset wordmark (renders "MUFT", not the old draft). */
export function Wordmark({ variant = 'dark', compact = false }: { variant?: 'dark' | 'light'; compact?: boolean }) {
  const primary = variant === 'light' ? '#ffffff' : 'var(--emerald)'
  const sub = variant === 'light' ? 'rgba(255,255,255,.72)' : 'var(--gold-d)'
  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }} aria-label={`${CHARITY.name} home`}>
      <img src="/emblem.png" alt="" width={compact ? 28 : 34} height={compact ? 38 : 46} style={{ height: compact ? 38 : 46, width: 'auto' }} />
      <span style={{ lineHeight: 1 }}>
        <span style={{ display: 'block', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: compact ? 20 : 23, letterSpacing: '.14em', color: primary }}>
          MUFT
        </span>
        <span style={{ display: 'block', fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 9.5, letterSpacing: '.28em', textTransform: 'uppercase', color: sub, marginTop: 3 }}>
          Development Foundation
        </span>
      </span>
    </Link>
  )
}

export function TrustBar({ light = false }: { light?: boolean }) {
  const items: [string, (p: { size?: number }) => JSX.Element][] = [
    ['Registered UK Charity', IconShield],
    ['Trustee-led charity', IconLeaf],
    ['Zakat Eligible', IconCrescent],
  ]
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map(([t, Icon]) => (
        <span key={t} className="chip" style={light ? { background: 'rgba(255,255,255,.12)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' } : undefined}>
          <Icon size={14} /> {t}
        </span>
      ))}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, sub, center }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? 'center' : undefined} style={{ maxWidth: center ? 720 : undefined, margin: center ? '0 auto' : undefined, marginBottom: 40 }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
      <h2>{title}</h2>
      <hr className={`divider${center ? ' center' : ''}`} />
      {sub && <p className="lead" style={{ marginBottom: 0 }}>{sub}</p>}
    </div>
  )
}

export function DonateButton({ className = 'btn btn-gold' }: { className?: string }) {
  return <Link to="/donate" className={className}>Donate Now</Link>
}

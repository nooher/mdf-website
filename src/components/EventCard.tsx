import { Link } from 'react-router-dom'
import { type SiteEvent, dateParts, formatDate, formatTimes, isPast, registrationOpen } from '../events'

/** Opens the event's registration form, or says why it can't. */
export function RegisterButton({ e, now, label = 'Register now', className = 'btn btn-gold' }:
  { e: SiteEvent; now: number; label?: string; className?: string }) {
  if (registrationOpen(e, now)) {
    return (
      <a href={e.registrationUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {label}<span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}> (opens in a new tab)</span>
      </a>
    )
  }
  if (!e.registrationUrl || isPast(e, now)) return null
  return <span className={className} aria-disabled="true" style={{ opacity: .55, cursor: 'not-allowed' }}>Registration closed</span>
}

export function DateBadge({ start }: { start: string }) {
  const p = dateParts(start)
  return (
    <div aria-hidden style={{ width: 84, flexShrink: 0, borderRadius: 12, background: 'var(--emerald)', color: '#fff', textAlign: 'center', padding: '12px 6px' }}>
      <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-lt)' }}>{p.weekday.slice(0, 3)}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 700, lineHeight: 1.05 }}>{p.day}</div>
      <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '.06em' }}>{p.month.slice(0, 3)} {p.year}</div>
    </div>
  )
}

export default function EventCard({ e, now }: { e: SiteEvent; now: number }) {
  const times = formatTimes(e)
  const past = isPast(e, now)
  return (
    <article className="card event-card" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <DateBadge start={e.start} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{formatDate(e.start)}{times && ` · ${times}`}</div>
        <h3 style={{ fontSize: 24 }}><Link to={`/events/${e.slug}`}>{e.title}</Link></h3>
        {e.theme && <p style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--gold-d)', margin: '4px 0 0' }}>{e.theme}</p>}
        <p style={{ color: 'var(--slate)', fontSize: 14.5, margin: '10px 0 0' }}>
          <strong style={{ color: 'var(--ink)' }}>{e.venue}</strong>{e.address && `, ${e.address}`}
        </p>
        <p style={{ color: 'var(--slate)', fontSize: 15, margin: '10px 0 0' }}>{e.summary}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
          {!past && <RegisterButton e={e} now={now} />}
          <Link to={`/events/${e.slug}`} className="btn btn-outline">{past ? 'Read more' : 'Event details'}</Link>
        </div>
      </div>
      {e.poster && (
        <Link to={`/events/${e.slug}`} className="event-card-poster" tabIndex={-1} aria-hidden style={{ flexShrink: 0 }}>
          <img src={e.poster} alt="" width={150} height={188} loading="lazy"
            style={{ width: 150, height: 'auto', borderRadius: 10, border: '1px solid var(--hair)' }} />
        </Link>
      )}
    </article>
  )
}

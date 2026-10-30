import { useParams, Link } from 'react-router-dom'
import { PROGRAMMES } from '../data'
import PageHero from '../components/PageHero'
import { RegisterButton } from '../components/EventCard'
import { PROGRAMME_ICON } from '../components/Icons'
import { EVENTS, formatDate, formatTimes, isPast, registrationOpen, useNow } from '../events'
import { PageMeta } from '../PageMeta'

export default function EventDetail() {
  const { slug } = useParams()
  const now = useNow()
  const e = EVENTS.find(x => x.slug === slug)
  if (!e) return (
    <div className="wrap section center">
      <PageMeta title="Event not found" />
      <h1>Event not found</h1>
      <Link to="/events" className="btn btn-outline">All events</Link>
    </div>
  )

  const times = formatTimes(e)
  const past = isPast(e, now)
  const open = registrationOpen(e, now)
  const pillars = e.programmes.map(s => PROGRAMMES.find(p => p.slug === s)).filter(p => p !== undefined)
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([e.venue, e.address].filter(Boolean).join(', '))}`

  return (
    <>
      <PageMeta title={e.title} description={e.summary} image={e.poster} />
      <PageHero eyebrow={past ? 'Past event' : 'Upcoming event'} title={e.title}
        sub={[e.theme, e.tagline].filter(Boolean).join(': ')} />

      <section className="section">
        <div className="wrap event-grid">
          <div>
            <div className="md" dangerouslySetInnerHTML={{ __html: e.html }} />

            {e.guests.length > 0 && (
              <>
                <h2 style={{ marginTop: 40, fontSize: 26 }}>Guests</h2>
                <hr className="divider" />
                <div className="grid g2">
                  {e.guests.map(g => (
                    <div key={g.name} className="card" style={{ padding: 22 }}>
                      <div className="eyebrow" style={{ marginBottom: 6 }}>{g.role}</div>
                      <h3 style={{ fontSize: 20 }}>{g.name}</h3>
                      {g.title && <p style={{ color: 'var(--slate)', fontSize: 14.5, margin: '4px 0 0' }}>{g.title}</p>}
                    </div>
                  ))}
                </div>
                {e.guestsNote && <p style={{ color: 'var(--slate)', marginTop: 16 }}>{e.guestsNote}</p>}
              </>
            )}

            {pillars.length > 0 && (
              <>
                <h2 style={{ marginTop: 40, fontSize: 26 }}>{pillars.length === 4 ? 'Four pillars' : 'Themes'}</h2>
                <hr className="divider" />
                <div className="grid g2">
                  {pillars.map(p => {
                    const Icon = PROGRAMME_ICON[p.slug]
                    return (
                      <Link key={p.slug} to={`/our-work/${p.slug}`} className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 18 }}>
                        <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(27,94,32,.07)', color: 'var(--emerald)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          {Icon && <Icon size={24} />}
                        </span>
                        <span style={{ fontWeight: 600 }}>{p.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}

            {e.poster && (
              <>
                <h2 style={{ marginTop: 40, fontSize: 26 }}>Poster</h2>
                <hr className="divider" />
                <a href={e.poster} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                  <img src={e.poster} alt={e.posterAlt ?? `Poster for ${e.title}`} loading="lazy"
                    style={{ width: 420, maxWidth: '100%', height: 'auto', borderRadius: 12, border: '1px solid var(--hair)', boxShadow: 'var(--shadow-sm)' }} />
                </a>
                <p style={{ fontSize: 13.5, color: 'var(--slate)', marginTop: 10 }}>Tap the poster to open it full size and share it.</p>
              </>
            )}
          </div>

          <aside className="card event-aside" style={{ background: 'var(--ivory)' }}>
            <h3 style={{ fontSize: 19 }}>{past ? 'This event has taken place' : 'Event details'}</h3>
            <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
            <dl style={{ display: 'grid', gap: 14, margin: 0, fontSize: 14.5 }}>
              <Detail label="Date">{formatDate(e.start)}</Detail>
              {times && <Detail label="Time">{times}</Detail>}
              <Detail label="Venue">
                {e.venue}{e.address && <><br />{e.address}</>}
                <br /><a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5 }}>Open in Google Maps →</a>
              </Detail>
              {e.price && <Detail label="Entry">{e.price}{e.registrationUrl && ' · registration required'}</Detail>}
            </dl>
            {!past && (
              <div style={{ marginTop: 22, display: 'grid' }}>
                <RegisterButton e={e} now={now} className="btn btn-gold" />
                {open && <p style={{ fontSize: 12.5, color: 'var(--slate)', margin: '10px 0 0' }}>The form opens in a new tab and takes a couple of minutes.</p>}
              </div>
            )}
            {(e.contactName || e.contactPhone || e.contactEmail) && (
              <div style={{ marginTop: 22, borderTop: '1px solid var(--hair)', paddingTop: 16, fontSize: 14 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Questions?</div>
                {e.contactName && <div style={{ color: 'var(--ink)', fontWeight: 600 }}>{e.contactName}</div>}
                {e.contactPhone && <div><a href={`tel:${e.contactPhone.replace(/\s/g, '')}`}>{e.contactPhone}</a></div>}
                {e.contactEmail && <div><a href={`mailto:${e.contactEmail}`} style={{ wordBreak: 'break-all' }}>{e.contactEmail}</a></div>}
              </div>
            )}
          </aside>
        </div>
      </section>

      {!past && open && (
        <section className="section emerald center on-emerald">
          <div className="wrap" style={{ maxWidth: 640 }}>
            <h2 style={{ color: '#fff' }}>Book your place</h2>
            <hr className="divider center" />
            <p style={{ color: 'rgba(255,255,255,.85)' }}>
              {[e.price, 'Registration required', 'All welcome'].filter(Boolean).join(' · ')}
            </p>
            <RegisterButton e={e} now={now} />
          </div>
        </section>
      )}
    </>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt style={{ fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--slate)', fontWeight: 600 }}>{label}</dt>
      <dd style={{ margin: '2px 0 0', color: 'var(--ink)' }}>{children}</dd>
    </div>
  )
}

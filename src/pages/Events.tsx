import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import EventCard from '../components/EventCard'
import { SectionHeading } from '../components/ui'
import { upcomingEvents, pastEvents, useNow } from '../events'
import { PageMeta } from '../PageMeta'

export default function Events() {
  const now = useNow()
  const upcoming = upcomingEvents(now)
  const past = pastEvents(now)
  return (
    <>
      <PageMeta title="Events" description="Conferences and community events run by Muft Development Foundation, with dates, venues and how to register." />
      <PageHero eyebrow="Events" title="Events & conferences"
        sub="Conferences and gatherings we run or take part in. Most are free, but places usually need to be booked." />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Upcoming" title="What is coming up" />
          {upcoming.length > 0 ? (
            <div style={{ display: 'grid', gap: 22 }}>
              {upcoming.map(e => <EventCard key={e.slug} e={e} now={now} />)}
            </div>
          ) : (
            <div className="card" style={{ background: 'var(--ivory)' }}>
              <strong style={{ color: 'var(--emerald)', fontFamily: 'var(--serif)', fontSize: 20 }}>Nothing is scheduled right now.</strong>
              <p style={{ color: 'var(--slate)', margin: '8px 0 0' }}>
                New events are announced here and to our mailing list. <Link to="/news">Join the list</Link> to hear first.
              </p>
            </div>
          )}

          {past.length > 0 && (
            <div style={{ marginTop: 72 }}>
              <SectionHeading eyebrow="Archive" title="Past events" />
              <div style={{ display: 'grid', gap: 22 }}>
                {past.map(e => <EventCard key={e.slug} e={e} now={now} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

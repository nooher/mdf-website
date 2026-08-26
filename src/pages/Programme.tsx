import { useParams, Link } from 'react-router-dom'
import { PROGRAMMES } from '../data'
import { DonateButton } from '../components/ui'
import PageHero from '../components/PageHero'
import { PROGRAMME_ICON } from '../components/Icons'
import { PageMeta } from '../PageMeta'

export default function Programme() {
  const { slug } = useParams()
  const p = PROGRAMMES.find(x => x.slug === slug)
  if (!p) return (
    <div className="wrap section center">
      <PageMeta title="Programme not found" />
      <h1>Programme not found</h1>
      <Link to="/our-work" className="btn btn-outline">Back to Our Work</Link>
    </div>
  )
  const Icon = PROGRAMME_ICON[p.slug]
  return (
    <>
      <PageMeta title={p.title} description={p.summary} />
      <PageHero eyebrow="Our Work" title={p.title} sub={p.tagline} />
      <section className="section tight">
        <div className="wrap">
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', aspectRatio: '2.5 / 1', maxHeight: 420, background: 'var(--ivory)' }}>
            <img src={p.photo} alt={p.photoAlt} width={1400} height={560}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 18, left: 18, width: 60, height: 60, borderRadius: '50%', background: 'var(--emerald)', color: 'var(--gold-lt)', display: 'grid', placeItems: 'center', boxShadow: '0 10px 24px -10px rgba(0,0,0,.45)' }}>
              {Icon && <Icon size={30} />}
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap prog-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'start' }} >
          <div className="prog-main">
            <p className="lead" style={{ color: 'var(--slate)', margin: 0 }}>{p.summary}</p>

            <h2 style={{ marginTop: 34, fontSize: 26 }}>Our approach</h2>
            <hr className="divider" />
            <p style={{ color: 'var(--slate)', maxWidth: '68ch' }}>{p.approach}</p>

            <h2 style={{ marginTop: 34, fontSize: 26 }}>What this looks like</h2>
            <hr className="divider" />
            <ul style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              {p.points.map(pt => (
                <li key={pt} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--slate)' }}>
                  <span style={{ color: 'var(--gold-d)', fontWeight: 700, marginTop: 1 }}>◆</span>{pt}
                </li>
              ))}
            </ul>

            <h2 style={{ marginTop: 34, fontSize: 26 }}>Who we help</h2>
            <hr className="divider" />
            <div className="grid g2" style={{ marginTop: 8 }}>
              {p.who.map(w => (
                <div key={w} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--slate)', fontSize: 15 }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 700, marginTop: 1 }}>›</span>{w}
                </div>
              ))}
            </div>

            <div className="card" style={{ background: 'var(--emerald)', color: '#fff', marginTop: 34 }}>
              <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.5, color: '#fff' }}>
                We would rather do a small amount of this properly than a great deal of it badly. Every gift
                is recorded against the purpose it was given for.
              </p>
            </div>
          </div>

          <aside className="card prog-aside" style={{ background: 'var(--ivory)', position: 'sticky', top: 94 }}>
            <h3 style={{ fontSize: 19 }}>Support this work</h3>
            <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
            <p style={{ color: 'var(--slate)', fontSize: 14.5 }}>Mark your transfer for {p.title.toLowerCase()} and it will be held and spent against that purpose alone.</p>
            <DonateButton className="btn btn-gold" />
            <div style={{ marginTop: 20, borderTop: '1px solid var(--hair)', paddingTop: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Other programmes</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {PROGRAMMES.filter(x => x.slug !== p.slug).map(x => (
                  <Link key={x.slug} to={`/our-work/${x.slug}`} style={{ fontSize: 14.5, fontWeight: 500 }}>{x.title} →</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <style>{`@media (max-width: 820px){ .prog-grid { grid-template-columns: 1fr !important; } .prog-aside { position: static !important; } }`}</style>
    </>
  )
}

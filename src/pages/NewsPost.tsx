import { useParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { NEWS, formatNewsDate } from '../news'
import { PageMeta } from '../PageMeta'

export default function NewsPost() {
  const { slug } = useParams()
  const p = NEWS.find(x => x.slug === slug)
  if (!p) return (
    <div className="wrap section center">
      <PageMeta title="Post not found" />
      <h1>Post not found</h1>
      <Link to="/news" className="btn btn-outline">All news</Link>
    </div>
  )

  const internal = p.link?.startsWith('/')
  const label = p.linkLabel ?? 'Find out more'
  return (
    <>
      <PageMeta title={p.title} description={p.summary} image={p.image} />
      <PageHero eyebrow={`News · ${formatNewsDate(p.date)}`} title={p.title} />
      <section className="section">
        <div className="wrap prose" style={{ margin: '0 auto' }}>
          {p.image && (
            <img src={p.image} alt={p.imageAlt ?? ''}
              style={{ width: '100%', height: 'auto', maxHeight: 560, objectFit: 'contain', borderRadius: 14, border: '1px solid var(--hair)', background: 'var(--ivory)', marginBottom: 30 }} />
          )}
          <p className="lead" style={{ color: 'var(--slate)' }}>{p.summary}</p>
          {p.html.trim() && <div className="md" style={{ marginTop: 22 }} dangerouslySetInnerHTML={{ __html: p.html }} />}
          {p.link && (
            <div style={{ marginTop: 26 }}>
              {internal
                ? <Link to={p.link} className="btn btn-gold">{label}</Link>
                : <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-gold">{label}</a>}
            </div>
          )}
          <div style={{ marginTop: 40, borderTop: '1px solid var(--hair)', paddingTop: 20 }}>
            <Link to="/news" style={{ fontWeight: 600 }}>← All news</Link>
          </div>
        </div>
      </section>
    </>
  )
}

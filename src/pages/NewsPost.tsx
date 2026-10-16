import { useParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { DonateButton } from '../components/ui'
import { PageMeta } from '../PageMeta'
import { NEWS } from '../content/news.generated'

export default function NewsPost() {
  const { slug } = useParams()
  const post = NEWS.find(p => p.slug === slug)

  if (!post) return (
    <div className="wrap section center">
      <PageMeta title="Story not found" />
      <h1>Story not found</h1>
      <p style={{ color: 'var(--slate)' }}>That link may be out of date.</p>
      <Link to="/news" className="btn btn-outline">Back to News</Link>
    </div>
  )

  const others = NEWS.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <PageMeta title={post.title} description={post.summary} />
      <PageHero eyebrow={post.dateLabel} title={post.title} sub={post.summary} />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 760 }}>
          {post.image && (
            <img src={post.image} alt="" width={1400} height={760}
              style={{ width: '100%', height: 'auto', borderRadius: 16, marginBottom: 32, boxShadow: 'var(--shadow)' }} />
          )}

          {/* Body HTML is rendered from markdown at build time by scripts/build-content.mjs.
              It comes from this repository, and the site's CSP blocks inline scripts. */}
          <article className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          <hr className="divider" style={{ margin: '40px 0 24px' }} />
          <Link to="/news" className="btn btn-outline">← All stories</Link>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <h2 style={{ fontSize: 22 }}>More from MDF</h2>
            <hr className="divider" />
            <div className="grid g2" style={{ marginTop: 18 }}>
              {others.map(p => (
                <Link key={p.slug} to={`/news/${p.slug}`} className="card" style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{p.dateLabel}</div>
                  <h3 style={{ fontSize: 17 }}>{p.title}</h3>
                  <p style={{ color: 'var(--slate)', fontSize: 14.5, marginTop: 8 }}>{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section emerald center on-emerald">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h2 style={{ color: '#fff' }}>Support this work</h2>
          <hr className="divider center" />
          <p style={{ color: 'rgba(255,255,255,.85)' }}>Every gift is recorded, and what it funds is reported here.</p>
          <DonateButton className="btn btn-gold" />
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { PROGRAMMES, HOW_WE_WORK } from '../data'
import { DonateButton } from '../components/ui'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { PROGRAMME_ICON, WORK_STEP_ICON } from '../components/Icons'
import { PageMeta } from '../PageMeta'

export default function Work() {
  return (
    <>
      <PageMeta title="Our Work" description="The four programmes Muft Development Foundation runs, and how a donation moves from our account to the person it was meant for." />
      <PageHero eyebrow="Our Work" title="How we serve"
        sub="Four programmes, taken word for word from our registered charitable objects." />

      {/* ── How we work ── */}
      <section className="section tight ivory">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Our approach</div>
            <h2>What happens to your money</h2>
            <hr className="divider center" />
          </div>
          <div className="grid g4">
            {HOW_WE_WORK.map((step, i) => {
              const Icon = WORK_STEP_ICON[i]
              return (
                <Reveal key={step.title} delay={i * 60}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--white)', color: 'var(--emerald)', display: 'grid', placeItems: 'center', margin: '0 auto 16px', border: '1px solid var(--hair)', boxShadow: 'var(--shadow-sm)' }}>
                      <Icon size={26} />
                    </div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: 'var(--gold-d)', marginBottom: 4 }}>{String(i + 1).padStart(2, '0')}</div>
                    <h3 style={{ fontSize: 17.5 }}>{step.title}</h3>
                    <p style={{ color: 'var(--slate)', fontSize: 14, marginTop: 8 }}>{step.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Programmes ── */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gap: 64 }}>
          {PROGRAMMES.map((p, i) => {
            const Icon = PROGRAMME_ICON[p.slug]
            const flip = i % 2 === 1
            return (
              <Reveal key={p.slug} delay={i * 40}>
                <article className="work-block" style={{ display: 'grid', gridTemplateColumns: flip ? '1fr 1.05fr' : '1.05fr 1fr', gap: 44, alignItems: 'center', direction: flip ? 'rtl' : 'ltr' }}>
                  <div className="work-photo" style={{ direction: 'ltr', position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', aspectRatio: '4 / 3' }}>
                    <img src={p.photo} alt={p.photoAlt} loading="lazy" width={700} height={525}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, width: 56, height: 56, borderRadius: '50%', background: 'var(--emerald)', color: 'var(--gold-lt)', display: 'grid', placeItems: 'center', boxShadow: '0 10px 24px -10px rgba(0,0,0,.45)' }}>
                      {Icon && <Icon size={28} />}
                    </div>
                  </div>
                  <div style={{ direction: 'ltr' }}>
                    <div className="eyebrow" style={{ marginBottom: 8 }}>{p.tagline}</div>
                    <h2 style={{ fontSize: 30 }}>{p.title}</h2>
                    <hr className="divider" />
                    <p style={{ color: 'var(--slate)', fontSize: 16 }}>{p.summary}</p>
                    <ul style={{ display: 'grid', gap: 9, margin: '16px 0 22px' }}>
                      {p.points.slice(0, 3).map(pt => (
                        <li key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--ink)', fontSize: 14.5 }}>
                          <span style={{ color: 'var(--gold-d)', fontWeight: 700, marginTop: 1 }}>◆</span>{pt}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/our-work/${p.slug}`} className="btn btn-outline">Read more</Link>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
        <div className="wrap center" style={{ marginTop: 60 }}><DonateButton /></div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .work-block { grid-template-columns: 1fr !important; direction: ltr !important; }
          .work-photo { aspect-ratio: 16 / 10 !important; }
        }
      `}</style>
    </>
  )
}

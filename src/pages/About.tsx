import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CHARITY, TRUSTEES, type Trustee } from '../data'
import { SectionHeading } from '../components/ui'
import PageHero from '../components/PageHero'
import { PageMeta } from '../PageMeta'

/** First + last name initial, ignoring honorifics (Mrs./Mr./Ms./Miss.). */
function initials(name: string): string {
  const parts = name.split(' ').filter(w => !w.endsWith('.') && w.length > 0)
  if (parts.length === 0) return '·'
  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export default function About() {
  return (
    <>
      <PageMeta title="About Us" description="Who we are: the purpose, the trustees, and the governing documents of Muft Development Foundation, a charity registered in England and Wales (no. 1218194)." />
      <PageHero eyebrow="About Us" title="Who we are"
        sub="A charity registered in England and Wales, run by six trustees, with its constitution and registration certificate published on this page." />

      {/* Story */}
      <section className="section">
        <div className="wrap split-grid" style={{ gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Our Story</div>
            <h2>Why the Foundation exists</h2>
            <hr className="divider" />
            <p style={{ color: 'var(--slate)' }}>
              There is a particular kind of hardship that money solves quickly and nothing else solves at all.
              A month’s rent. A term’s school fees. A hospital bill that a family has no way of meeting. The
              Foundation was set up to be the thing that answers in those situations, for people in the United
              Kingdom and overseas, whatever their background or belief.
            </p>
            <p style={{ color: 'var(--slate)' }}>
              We were registered with the Charity Commission for England and Wales on 22 May 2026 by six
              founder trustees. None of us is paid by the charity. We are deliberately small at this stage,
              because a new organisation that promises too much too early usually ends up explaining itself
              rather than doing the work.
            </p>
            <h3 style={{ marginTop: 26 }}>Our Mission</h3>
            <p style={{ color: 'var(--slate)' }}>To relieve poverty, advance education, support young people, and advance Islamic education, in the United Kingdom and overseas. These are our registered charitable objects. They are also the limit of what we may lawfully spend your money on.</p>
            <h3 style={{ marginTop: 18 }}>Our Vision</h3>
            <p style={{ color: 'var(--slate)' }}>That the families we help stop needing us.</p>
          </div>
          <aside className="card" style={{ background: 'var(--ivory)' }}>
            <h3 style={{ fontSize: 18 }}>Charity details</h3>
            <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
            <Detail k="Registered name" v={CHARITY.name} />
            <Detail k="Charity number" v={CHARITY.number} />
            <Detail k="Structure" v={CHARITY.structure} />
            <Detail k="Regulator" v={CHARITY.regulator} />
            <Detail k="Registered" v={CHARITY.regDate} />
            <Detail k="Office" v={CHARITY.office} />
            <p style={{ fontSize: 13, color: 'var(--slate)', margin: '12px 0 0' }}>
              Verify us directly on the{' '}
              <a href={CHARITY.registerUrl} target="_blank" rel="noopener noreferrer">
                Charity Commission register
              </a>{' '}
              — search charity number {CHARITY.number}.
            </p>
            <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
              <a className="btn btn-outline" href="/MDF-Constitution.pdf" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>Download Constitution (PDF)</a>
              <a className="btn btn-outline" href="/MDF-Registration-Certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>Registration Certificate (PDF)</a>
            </div>
          </aside>
        </div>
      </section>

      {/* Story photo */}
      <section className="section tight ivory">
        <div className="wrap split-grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }} id="story-photo">
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', aspectRatio: '4 / 3' }}>
            <img src="/photos/about-story.jpg" alt="Two people in a warm, supportive conversation" loading="lazy" width={700} height={525}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Why we exist</div>
            <h2 style={{ fontSize: 28 }}>Dignity is not an extra</h2>
            <hr className="divider" />
            <p style={{ color: 'var(--slate)' }}>
              It is easy to give in a way that leaves the person receiving feeling smaller than before. We try
              not to. In practice that means asking people what they need instead of deciding for them, keeping
              the process private, and never using somebody’s hardship as material for our fundraising.
            </p>
          </div>
        </div>
      </section>

      {/* Trustees */}
      <section className="section">
        <div className="wrap">
          <SectionHeading center eyebrow="Governance" title="Our Founder Trustees"
            sub="Six founder trustees, each serving a nine-year term. The long terms were deliberate: we did not want a board that changes faster than the work does." />
          <div className="grid g3">
            {TRUSTEES.map(t => <TrusteeCard key={t.name} trustee={t} />)}
          </div>
          <p className="center" style={{ marginTop: 24, color: 'var(--slate)', fontSize: 14 }}>
            Funders and partners can request the full{' '}
            <Link to="/grants" style={{ fontWeight: 600 }}>governance pack</Link>.
          </p>
        </div>
      </section>
    </>
  )
}

function TrusteeCard({ trustee: t }: { trustee: Trustee }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      {t.photo ? (
        <img src={t.photo} alt={t.name} width={92} height={115}
          style={{ width: 92, height: 115, borderRadius: '50%', margin: '0 auto 14px', objectFit: 'cover', boxShadow: '0 0 0 3px var(--ivory), 0 0 0 4px var(--gold)' }} />
      ) : (
        <div aria-hidden="true" style={{ width: 92, height: 115, borderRadius: '50%', margin: '0 auto 14px', background: 'var(--emerald)', boxShadow: '0 0 0 3px var(--ivory), 0 0 0 4px var(--gold)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontSize: 27, fontWeight: 700, color: 'var(--gold-lt)' }}>
          {initials(t.name)}
        </div>
      )}
      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{t.name}</div>
      <div style={{ fontSize: 13.5, color: 'var(--gold-d)', marginTop: 2 }}>{t.role}</div>
      <div style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 2 }}>{t.term}</div>
      {t.bio && (
        <>
          {open && (
            <div style={{ marginTop: 14, textAlign: 'left' }}>
              {t.bio.split('\n\n').map((para, i) => (
                <p key={i} style={{ color: 'var(--slate)', fontSize: 13.5, margin: i === 0 ? 0 : '10px 0 0' }}>{para}</p>
              ))}
            </div>
          )}
          <button type="button" onClick={() => setOpen(o => !o)}
            style={{ marginTop: 14, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--emerald)' }}>
            {open ? 'Show less' : 'Read full bio'}
          </button>
        </>
      )}
    </div>
  )
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '7px 0', borderBottom: '1px solid var(--hair)', fontSize: 14 }}>
      <span style={{ color: 'var(--slate)' }}>{k}</span>
      <span style={{ fontWeight: 600, color: 'var(--ink)', textAlign: 'right' }}>{v}</span>
    </div>
  )
}

import PageHero from '../components/PageHero'
import { SectionHeading } from '../components/ui'
import { PageMeta } from '../PageMeta'

const PACK = [
  'CIO Constitution',
  'Charity Commission registration certificate (No. 1218194)',
  'Trustee register and governance statement',
  'Annual report & accounts (once first year completed)',
  'Safeguarding policy',
  'Due-diligence summary',
]

export default function Grants() {
  return (
    <>
      <PageMeta title="Grants & Partnerships" description="Working with Muft Development Foundation: our governance pack, what a funder can verify, and the ways we can partner." />
      <PageHero eyebrow="Grants & Partnerships" title="Partner with us"
        sub="What a funder can check about us before committing anything, and the ways we are able to work together." />

      <section className="section">
        <div className="wrap split-grid" style={{ gridTemplateColumns: '1.3fr 1fr', gap: 44, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>For institutional funders</div>
            <h2>What you can verify before you fund us</h2>
            <hr className="divider" />
            <p style={{ color: 'var(--slate)' }}>
              We are a Charitable Incorporated Organisation regulated by the Charity Commission for England and
              Wales, with six trustees, a written constitution, and a safeguarding policy adopted before we
              began. We have no track record yet and will not pretend otherwise. What we can offer at this
              stage is a clean set of documents and trustees willing to answer questions in person.
            </p>
            <p style={{ color: 'var(--slate)' }}>
              For the full pack, or to talk about a specific programme, write to
              <a href="mailto:info@muftdevelopmentfoundation.org.uk?subject=Grants%20%26%20partnerships%20enquiry"> info@muftdevelopmentfoundation.org.uk</a>. A trustee will reply.
            </p>

            <h3 style={{ marginTop: 26 }}>Ways to work with us</h3>
            <hr className="divider" />
            <div className="grid g2" style={{ marginTop: 8 }}>
              {[
                ['Restricted grants', 'Fund one programme, with reporting agreed in writing before we start.'],
                ['Core funding', 'The least glamorous and most useful money a small charity can receive.'],
                ['Delivery partnerships', 'You have the presence on the ground; we bring funding and governance.'],
                ['In-kind support', 'Goods, premises, professional time, or an introduction that opens a door.'],
              ].map(([t, d]) => (
                <div key={t} className="card" style={{ padding: 20 }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{t}</div>
                  <p style={{ color: 'var(--slate)', fontSize: 14, margin: '6px 0 0' }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="card sticky-aside" style={{ background: 'var(--ivory)', top: 96 }}>
            <h3 style={{ fontSize: 19 }}>Governance pack</h3>
            <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
            <ul style={{ display: 'grid', gap: 10 }}>
              {PACK.map(p => (
                <li key={p} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--slate)' }}>
                  <span style={{ color: 'var(--gold-d)', fontWeight: 700 }}>◆</span>{p}
                </li>
              ))}
            </ul>
            <a className="btn btn-emerald" href="/contact" style={{ marginTop: 16, justifyContent: 'center', width: '100%' }}>Request the pack</a>
          </aside>
        </div>
      </section>

      <section className="section ivory">
        <div className="wrap">
          <SectionHeading center eyebrow="Funders we're built to work with"
            title="Ready for due diligence" />
          <div className="grid g4">
            {['DCMS Community Grants', 'Local Authority grants', 'Trusts & foundations', 'Government departments'].map(f => (
              <div key={f} className="card center" style={{ fontWeight: 600, color: 'var(--emerald)' }}>{f}</div>
            ))}
          </div>
          <p className="center" style={{ marginTop: 20, fontSize: 13, color: 'var(--slate)', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            We are set up to meet the standards these funders expect. Naming them says what we are ready for.
            It does not imply that any of them funds us, endorses us, or has heard of us.
          </p>
        </div>
      </section>
    </>
  )
}

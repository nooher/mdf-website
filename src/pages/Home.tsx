import { Link } from 'react-router-dom'
import { PROGRAMMES, VALUES, AT_A_GLANCE, CHARITY, BANK } from '../data'
import { SectionHeading, TrustBar, DonateButton } from '../components/ui'
import { PROGRAMME_ICON } from '../components/Icons'
import { PageMeta } from '../PageMeta'

export default function Home() {
  return (
    <>
      <PageMeta description="Muft Development Foundation is a charity registered in England and Wales (no. 1218194). We work on poverty, education, young people and Islamic learning, in the UK and overseas." />
      {/* ── Hero ── */}
      <section style={{ background: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ padding: '84px 24px 76px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <img src="/emblem.png" alt="" width={88} height={120} className="reveal" style={{ height: 120, width: 'auto', margin: '0 auto 26px' }} />
          <div className="eyebrow reveal" style={{ marginBottom: 14 }}>Registered Charity No. {CHARITY.number} · England &amp; Wales</div>
          <h1 className="reveal" style={{ maxWidth: 900, margin: '0 auto', animationDelay: '.05s' }}>
            Help for families who have<br />run out of options
          </h1>
          <p className="lead reveal" style={{ maxWidth: 660, margin: '22px auto 30px', animationDelay: '.1s' }}>
            We are a charity registered in England and Wales, working on poverty, education, young
            people and Islamic learning, here and overseas. We registered in May 2026. This is the beginning.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', animationDelay: '.15s' }}>
            <DonateButton />
            <Link to="/about" className="btn btn-outline">Learn more</Link>
          </div>
          <div className="reveal" style={{ marginTop: 34, animationDelay: '.2s' }}><TrustBar /></div>
        </div>
      </section>

      {/* ── Impact numbers ── */}
      <section className="section emerald tight">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div className="eyebrow" style={{ color: 'var(--gold-lt)' }}>At a glance</div>
          </div>
          <div className="grid g4" style={{ textAlign: 'center' }}>
            {AT_A_GLANCE.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 52, fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ marginTop: 8, fontSize: 14, letterSpacing: '.04em', color: 'rgba(255,255,255,.85)' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p className="center" style={{ marginTop: 26, marginBottom: 0, fontSize: 13.5, color: 'rgba(255,255,255,.8)' }}>
            We registered in May 2026 and have not yet spent a donor’s pound. What we can show you today is how we are set up to handle one.
          </p>
        </div>
      </section>

      {/* ── Programme pillars ── */}
      <section className="section">
        <div className="wrap">
          <SectionHeading center eyebrow="Our Work" title="What we are allowed to spend money on"
            sub="These four purposes are written into our constitution. A charity cannot lawfully spend outside its objects, so this list is also a limit." />
          <div className="grid g4">
            {PROGRAMMES.map(p => {
              const Icon = PROGRAMME_ICON[p.slug]
              return (
                <Link key={p.slug} to={`/our-work/${p.slug}`} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(27,94,32,.07)', color: 'var(--emerald)', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                    {Icon && <Icon size={28} />}
                  </div>
                  <h3 style={{ fontSize: 20 }}>{p.title}</h3>
                  <p style={{ color: 'var(--slate)', fontSize: 15, marginTop: 8, flex: 1 }}>{p.tagline}.</p>
                  <span style={{ color: 'var(--gold-d)', fontWeight: 600, fontSize: 14, marginTop: 10 }}>Explore →</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Photo band ── */}
      <section style={{ position: 'relative', minHeight: 380, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        <img src="/photos/community-hands.jpg" alt="" aria-hidden="true" loading="lazy" width={1600} height={900}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,44,18,.74)' }} />
        <div className="wrap center" style={{ position: 'relative', zIndex: 1, padding: '64px 24px', color: '#fff' }}>
          <h2 style={{ color: '#fff', maxWidth: 640, margin: '0 auto' }}>Nobody should have to prove they deserve help</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.88)', maxWidth: 580, margin: '16px auto 0' }}>
            We do not ask people to tell us their worst story in order to qualify. If a family cannot buy food
            or a child is about to lose a school place, that is enough for us to look into it.
          </p>
        </div>
      </section>

      {/* ── How to give ── */}
      <section className="section ivory">
        <div className="wrap split-grid" style={{ gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>How to give</div>
            <h2>A bank transfer, and nothing taken out</h2>
            <hr className="divider" />
            <p style={{ color: 'var(--slate)' }}>
              We take donations straight into the charity's own account. There are no card fees and no
              platform taking a share, so the amount you send is the amount we receive. Use your surname as
              the reference and we will know who to thank.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
              <DonateButton />
              <Link to="/faq" className="btn btn-outline">Common questions</Link>
            </div>
          </div>
          <div className="card" style={{ background: '#fff' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Muft Development Foundation</div>
            <div className="bank-details" style={{ marginTop: 0 }}>
              <div className="bank-row"><span className="bank-label">Bank</span><span className="bank-value">{BANK.bank}</span></div>
              <div className="bank-row"><span className="bank-label">Sort code</span><span className="bank-value mono">{BANK.sortCode}</span></div>
              <div className="bank-row"><span className="bank-label">Account</span><span className="bank-value mono">{BANK.accountNumber}</span></div>
            </div>
            <span className="chip" style={{ marginTop: 14 }}><span className="dot" /> Zakat eligible</span>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section">
        <div className="wrap">
          <SectionHeading center eyebrow="What guides us" title="What we stand on" />
          <div className="grid g4">
            {VALUES.map(v => (
              <div key={v.title} className="card">
                <h3 style={{ fontSize: 19 }}>{v.title}</h3>
                <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
                <p style={{ color: 'var(--slate)', fontSize: 15, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="section emerald center">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h2 style={{ color: '#fff' }}>The work starts with the first gift</h2>
          <hr className="divider center" />
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 18 }}>
            A bank transfer takes about two minutes and costs the charity nothing in fees. If you would rather
            help another way, our trustees will be glad to talk it through with you.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
            <DonateButton />
            <Link to="/grants" className="btn btn-ghost" style={{ color: '#fff' }}>Partner with us</Link>
          </div>
        </div>
      </section>
    </>
  )
}

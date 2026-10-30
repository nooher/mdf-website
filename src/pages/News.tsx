import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { DonateButton } from '../components/ui'
import { IconShield, IconEducation, IconLeaf, IconYouth } from '../components/Icons'
import { PageMeta } from '../PageMeta'

type Post = { title: string; date: string; excerpt: string; icon: (p: { size?: number }) => JSX.Element; tint: string; to?: string }

const POSTS: Post[] = [
  { title: 'Youth Leadership Conference 2026: registration is open', date: 'October 2026', excerpt: 'Saturday 28 November at London Central Mosque. A free one-day conference for youth, parents and supporters, open to all faiths and backgrounds.', icon: IconYouth, tint: 'rgba(27,94,32,.06)', to: '/events/youth-leadership-conference-2026' },
  { title: 'Muft Development Foundation is now a registered UK charity', date: '22 May 2026', excerpt: 'Registration with the Charity Commission for England and Wales came through under number 1218194, which means the Foundation can now receive donations and is answerable for what it does with them.', icon: IconShield, tint: 'var(--ivory-d)' },
  { title: 'Our four programmes: how we make a difference', date: 'May 2026', excerpt: 'Poverty relief, education, youth development and Islamic education. What each one covers in practice, and what it does not.', icon: IconEducation, tint: 'rgba(27,94,32,.06)' },
  { title: 'How to give, and what happens next', date: 'May 2026', excerpt: 'Bank transfer, standing order, Zakat, or a larger gift. How each one reaches us and how it gets recorded.', icon: IconLeaf, tint: 'rgba(201,168,76,.10)' },
]

const NEWSLETTER_ENDPOINT = 'https://formsubmit.co/ajax/info@muftdevelopmentfoundation.org.uk'

export default function News() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'sent' | 'error'>('idle')

  async function subscribe(e: React.FormEvent) {
    e.preventDefault()
    setState('busy')
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email, _subject: 'MDF website — newsletter signup', _template: 'table', _honey: '',
        }),
      })
      if (res.ok) setState('sent')
      else setState('error')
    } catch { setState('error') }
  }

  return (
    <>
      <PageMeta title="News & Impact" description="Updates from Muft Development Foundation. We are new, and this page will fill up as the work does." />
      <PageHero eyebrow="News & Impact" title="Stories & updates"
        sub="An honest page. There is not much here yet, and we would rather leave it thin than pad it out." />

      <section className="section">
        <div className="wrap">
          <div className="card" style={{ background: 'var(--ivory)', marginBottom: 26, borderColor: 'var(--hair)' }}>
            <strong style={{ color: 'var(--emerald)', fontFamily: 'var(--serif)', fontSize: 20 }}>Nothing has happened yet.</strong>
            <p style={{ color: 'var(--slate)', margin: '8px 0 0' }}>
              We registered in May 2026. When the first project is funded and delivered, the report on it will
              appear here, including what it cost and what it did not achieve. Leave your email if you want to
              read that when it comes.
            </p>
          </div>

          <div className="grid g3">
            {POSTS.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} as="article" delay={i * 40} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 150, borderRadius: 10, background: p.tint, marginBottom: 18, display: 'grid', placeItems: 'center', border: '1px solid var(--hair)' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--white)', color: 'var(--emerald)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                      <Icon size={26} />
                    </div>
                  </div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{p.date}</div>
                  <h3 style={{ fontSize: 19 }}>{p.title}</h3>
                  <p style={{ color: 'var(--slate)', fontSize: 14.5, marginTop: 8, flex: 1 }}>{p.excerpt}</p>
                  {p.to && <Link to={p.to} style={{ color: 'var(--gold-d)', fontWeight: 600, fontSize: 14, marginTop: 4 }}>Read more and register →</Link>}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section emerald center on-emerald">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h2 style={{ color: '#fff' }}>Stay connected</h2>
          <hr className="divider center" />
          {state === 'sent' ? (
            <p role="status" style={{ color: 'rgba(255,255,255,.9)', fontSize: 17 }}>
              You are on the list. We will write when there is something worth sending.
            </p>
          ) : (
            <>
              <p style={{ color: 'rgba(255,255,255,.85)' }}>We will write when there is something worth reading. Not more often than that.</p>
              <form onSubmit={subscribe}
                style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '10px auto 16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <label htmlFor="nl-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Your email address</label>
                <input id="nl-email" required type="email" placeholder="Your email address" value={email}
                  onChange={e => setEmail(e.target.value)} disabled={state === 'busy'}
                  style={{ flex: '1 1 240px', padding: '13px 16px', borderRadius: 999, border: 'none', fontSize: 15 }} />
                <button className="btn btn-gold" type="submit" disabled={state === 'busy'}>
                  {state === 'busy' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
              {state === 'error' && (
                <p role="alert" style={{ color: 'var(--gold-lt)', fontSize: 14 }}>
                  Something went wrong — please try again, or email {`info@muftdevelopmentfoundation.org.uk`} directly.
                </p>
              )}
            </>
          )}
          <DonateButton className="btn btn-ghost" />
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { CHARITY, NAV } from '../data'
import { Wordmark, SocialLinks } from './ui'

const LEGAL = [
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
  { label: 'Safeguarding Policy', to: '/legal/safeguarding' },
  { label: 'Terms of Use', to: '/legal/terms' },
  { label: 'Accessibility', to: '/legal/accessibility' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--emerald-dd)', color: 'rgba(255,255,255,.8)' }}>
      <div className="wrap" style={{ padding: '64px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 40 }} className="foot-grid">
          <div>
            <Wordmark variant="light" />
            <p style={{ marginTop: 16, fontSize: 14.5, maxWidth: 300, color: 'rgba(255,255,255,.7)' }}>
              A charity registered in England and Wales, working on poverty, education and young people,
              here and overseas.
            </p>
            <Link to="/donate" className="btn btn-gold" style={{ marginTop: 8 }}>Donate Now</Link>
            <div style={{ marginTop: 20 }}><SocialLinks variant="light" size={18} /></div>
          </div>

          <FootCol title="Explore" links={NAV} />
          <FootCol title="Legal" links={LEGAL} />

          <div>
            <h4 style={{ color: '#fff', fontSize: 15, fontFamily: 'var(--sans)', fontWeight: 600, letterSpacing: '.04em', marginBottom: 14 }}>Contact</h4>
            <p style={{ fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              {CHARITY.office}<br />
              <a href={`mailto:${CHARITY.email}`} style={{ color: 'var(--gold)' }}>{CHARITY.email}</a>
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.14)', marginTop: 48, padding: '26px 0 34px',
          display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', alignItems: 'center',
          fontSize: 12.5, color: 'rgba(255,255,255,.6)' }}>
          <div style={{ maxWidth: 520 }}>
            © {new Date().getFullYear()} {CHARITY.name} · A Charitable Incorporated Organisation registered
            in England &amp; Wales, No. {CHARITY.number}.
          </div>

          {/* Donated-by credit — a gift from Laetoli */}
          <a href="https://laetoli.tz" target="_blank" rel="noopener noreferrer" className="laetoli-credit"
            aria-label="This website was donated by Laetoli — visit laetoli.tz">
            <span className="lc-kicker">This website is a gift, donated by</span>
            <span className="lc-mark">laetoli</span>
            <span className="lc-tag">Sovereign digital public infrastructure for East Africa — government, health &amp; education.</span>
          </a>
        </div>

        <style>{`
          .laetoli-credit {
            display: inline-flex; flex-direction: column; align-items: flex-end; text-align: right;
            text-decoration: none; transition: opacity .2s;
          }
          .laetoli-credit:hover { opacity: .85; }
          .lc-kicker { font-size: 9.5px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.45); }
          .lc-mark { font-family: var(--sans); font-weight: 700; font-size: 15px; letter-spacing: .18em; color: var(--gold); line-height: 1.5; }
          .lc-tag { font-size: 10.5px; color: rgba(255,255,255,.45); max-width: 300px; margin-top: 1px; }
          @media (max-width: 640px) {
            .laetoli-credit { align-items: flex-start; text-align: left; }
          }
        `}</style>
      </div>

      <style>{`@media (max-width: 900px){ .foot-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px){ .foot-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  )
}

function FootCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 style={{ color: '#fff', fontSize: 15, fontFamily: 'var(--sans)', fontWeight: 600, letterSpacing: '.04em', marginBottom: 14 }}>{title}</h4>
      <ul style={{ display: 'grid', gap: 9 }}>
        {links.map(l => (
          <li key={l.to}><Link to={l.to} style={{ color: 'rgba(255,255,255,.78)', fontSize: 14 }}>{l.label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { NAV } from '../data'
import { Wordmark } from './ui'
import { IconMenu, IconClose } from './Icons'

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,.92)',
      backdropFilter: 'saturate(1.4) blur(8px)', borderBottom: '1px solid var(--hair)',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 78 }}>
        <Wordmark compact />

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {NAV.slice(1).map(n => (
            <NavLink key={n.to} to={n.to} style={({ isActive }) => ({
              fontSize: 14.5, fontWeight: 500, color: isActive ? 'var(--emerald)' : 'var(--slate)',
              borderBottom: isActive ? '2px solid var(--gold-d)' : '2px solid transparent', paddingBottom: 4,
            })}>{n.label}</NavLink>
          ))}
          <Link to="/donate" className="btn btn-gold" style={{ padding: '10px 22px' }}>Donate</Link>
        </nav>

        <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(o => !o)}
          style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 44, height: 44,
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--emerald)' }}>
          {open ? <IconClose size={26} /> : <IconMenu size={26} />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="wrap" style={{ paddingBottom: 18, display: 'grid', gap: 6 }}>
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              style={{ padding: '10px 4px', fontSize: 16, fontWeight: 500, borderBottom: '1px solid var(--ivory-d)',
                color: loc.pathname === n.to ? 'var(--emerald)' : 'var(--slate)' }}>{n.label}</Link>
          ))}
          <Link to="/donate" className="btn btn-gold" onClick={() => setOpen(false)} style={{ marginTop: 8, justifyContent: 'center' }}>Donate Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

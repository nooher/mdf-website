import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'mdf.cookies.ack'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true) } catch { setShow(true) }
  }, [])
  function ack() {
    try { localStorage.setItem(KEY, '1') } catch { /* ignore */ }
    setShow(false)
  }
  if (!show) return null
  return (
    <div role="region" aria-label="Cookie notice" style={{
      position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 60, margin: '0 auto', maxWidth: 720,
      background: 'var(--emerald-dd)', color: 'rgba(255,255,255,.9)', border: '1px solid rgba(201,168,76,.3)',
      borderRadius: 14, padding: '16px 18px', boxShadow: '0 20px 60px -20px rgba(0,0,0,.5)',
      display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
    }}>
      <p style={{ margin: 0, fontSize: 13.5, flex: '1 1 320px', lineHeight: 1.5 }}>
        We set only the cookies this site needs in order to work. We do not track you or sell your
        data. See our <Link to="/legal/cookies" style={{ color: 'var(--gold)', fontWeight: 600 }}>Cookie Policy</Link>.
      </p>
      <button onClick={ack} className="btn btn-gold" style={{ padding: '10px 22px', fontSize: 14 }}>Got it</button>
    </div>
  )
}

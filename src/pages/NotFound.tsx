import { Link } from 'react-router-dom'
import { PageMeta } from '../PageMeta'

export default function NotFound() {
  return (
    <section className="section center" style={{ padding: '120px 0' }}>
      <PageMeta title="Page not found" />
      <div className="wrap" style={{ maxWidth: 520 }}>
        <img src="/emblem.png" alt="Muft Development Foundation" width={80} height={109} style={{ height: 80, width: 'auto', margin: '0 auto 20px', opacity: .8 }} />
        <h1 style={{ fontSize: '3rem' }}>404</h1>
        <p className="lead" style={{ color: 'var(--slate)' }}>We couldn’t find that page.</p>
        <Link to="/" className="btn btn-emerald">Return home</Link>
      </div>
    </section>
  )
}

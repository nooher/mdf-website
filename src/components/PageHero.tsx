export default function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="on-emerald" style={{ background: 'var(--emerald)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* faint emblem watermark for depth (no photography needed) */}
      <img src="/emblem.png" alt="" width={300} height={409} aria-hidden="true"
        style={{ position: 'absolute', right: -36, bottom: -60, width: 300, height: 'auto', opacity: 0.06, pointerEvents: 'none' }} />
      <div className="wrap reveal" style={{ padding: '66px 24px 60px', textAlign: 'center', position: 'relative' }}>
        <div className="eyebrow" style={{ color: 'var(--gold-lt)', marginBottom: 12 }}>{eyebrow}</div>
        <h1 style={{ color: '#fff', fontSize: 'clamp(2.1rem, 4.4vw, 3.3rem)' }}>{title}</h1>
        {sub && <p className="lead" style={{ color: 'rgba(255,255,255,.85)', maxWidth: 680, margin: '18px auto 0' }}>{sub}</p>}
      </div>
    </section>
  )
}

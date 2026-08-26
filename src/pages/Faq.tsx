import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQS } from '../data'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { PageMeta } from '../PageMeta'

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <>
      <PageMeta title="Frequently Asked Questions" description="Common questions about Muft Development Foundation: how to give, Zakat, who we help, and how to check up on us." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <PageHero eyebrow="Questions & answers" title="Frequently asked questions"
        sub="Everything you might want to know before you give, partner, or get involved." />
      <section className="section">
        <div className="wrap prose" style={{ margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: 12 }}>
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal key={f.q} as="div" delay={i * 25}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                        padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                        fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--emerald)' }}>
                      {f.q}
                      <span aria-hidden style={{ color: 'var(--gold-d)', fontSize: 22, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'none', lineHeight: 1 }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 22px 20px', color: 'var(--slate)', fontSize: 15, lineHeight: 1.6 }}>{f.a}</div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
          <p className="center" style={{ marginTop: 30, color: 'var(--slate)' }}>
            Not answered here? <Link to="/contact" style={{ fontWeight: 600 }}>Ask us directly</Link>. A trustee will reply.
          </p>
        </div>
      </section>
    </>
  )
}

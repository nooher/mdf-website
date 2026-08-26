import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DONATE_AMOUNTS, CHARITY, BANK } from '../data'
import PageHero from '../components/PageHero'
import { IconLock } from '../components/Icons'
import { PageMeta } from '../PageMeta'

function CopyRow({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  const [done, setDone] = useState(false)
  return (
    <div className="bank-row">
      <span className="bank-label">{label}</span>
      <span className={mono ? 'bank-value mono' : 'bank-value'}>{value}</span>
      <button type="button" className="bank-copy" aria-label={`Copy ${label}`}
        onClick={() => {
          navigator.clipboard?.writeText(value.replace(/\s/g, ''))
          setDone(true); setTimeout(() => setDone(false), 1600)
        }}>
        {done ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export default function Donate() {
  const [amount, setAmount] = useState<number>(50)
  const [custom, setCustom] = useState('')
  const [monthly, setMonthly] = useState(false)

  const value = custom ? Math.max(0, Number(custom) || 0) : amount

  function tellUs() {
    if (value <= 0) return
    const subject = encodeURIComponent(`Donation — £${value.toFixed(2)}${monthly ? ' / month' : ''}`)
    const body = encodeURIComponent(
      `I am sending ${monthly ? 'a monthly gift' : 'a gift'} of £${value.toFixed(2)} to Muft Development Foundation by bank transfer.` +
      `\n\nReference used:\nName:\nPhone:\n\nIf this gift is for a particular purpose (Zakat, Sadaqah, Lillah, or one of your four programmes), please note it here:`
    )
    window.location.href = `mailto:${CHARITY.donationsEmail}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <PageMeta title="Donate" description="Support Muft Development Foundation by bank transfer. Registered charity 1218194." />
      <PageHero eyebrow="Donate" title="Give with confidence"
        sub="Give straight into the charity’s own account. No card fees, no platform taking a share." />

      <section className="section">
        <div className="wrap split-grid" style={{ gridTemplateColumns: '1.15fr 1fr', gap: 44, alignItems: 'start' }}>

          <div style={{ display: 'grid', gap: 20 }}>
            {/* ── Bank transfer: the primary way to give ── */}
            <div className="card" style={{ padding: 30 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Give by bank transfer</div>
              <h2 style={{ fontSize: 26, marginTop: 0 }}>Nothing is taken out along the way</h2>
              <p style={{ color: 'var(--slate)', fontSize: 15 }}>
                Card payments cost a charity roughly 1.5% and a fixed fee on every gift. A transfer costs
                nothing. Use your surname as the payment reference and we will know who to thank.
              </p>

              <div className="bank-details">
                <CopyRow label="Account name" value={BANK.accountName} mono={false} />
                <CopyRow label="Bank" value={`${BANK.bank} · ${BANK.accountType}`} mono={false} />
                <CopyRow label="Sort code" value={BANK.sortCode} />
                <CopyRow label="Account number" value={BANK.accountNumber} />
                <CopyRow label="IBAN (from outside the UK)" value={BANK.iban} />
              </div>

              <p style={{ fontSize: 13.5, color: 'var(--slate)' }}>
                <strong style={{ color: 'var(--ink)' }}>Reference:</strong> your surname. If your gift is for a
                particular purpose, add <em>ZAKAT</em>, <em>SADAQAH</em> or <em>LILLAH</em> after it.
              </p>

              <hr className="divider" style={{ margin: '18px 0' }} />

              <h3 style={{ fontSize: 18, marginBottom: 8 }}>Giving every month</h3>
              <p style={{ color: 'var(--slate)', fontSize: 14.5, margin: 0 }}>
                Regular gifts let us plan ahead and commit to families for longer than a single donation allows.
                Set up a standing order with your own bank using the details above. Any amount, on any date that suits you.
              </p>

              <p style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 18, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <IconLock size={14} style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong style={{ color: 'var(--ink)' }}>These details will never change by email.</strong>{' '}
                  Fraudsters impersonate charities, usually by copying a real appeal and substituting their own
                  account. The details above are the only ones we publish. If a message tells you they have
                  changed, it did not come from us: check this page again before sending anything, and tell us
                  at <a href="mailto:info@muftdevelopmentfoundation.org.uk">info@muftdevelopmentfoundation.org.uk</a>.
                </span>
              </p>
            </div>

            {/* ── Optional: let the trustees know ── */}
            <div className="card" style={{ padding: 30 }}>
              <h3 style={{ fontSize: 19, marginTop: 0 }}>Let us know your gift is coming</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <p style={{ color: 'var(--slate)', fontSize: 14.5 }}>
                This step is optional, but it helps. It lets our treasurer match your transfer, allocate it to
                the purpose you intended, and write back to thank you.
              </p>

              <div style={{ display: 'flex', gap: 8, background: 'var(--ivory)', padding: 5, borderRadius: 999, margin: '18px 0' }}>
                {[['One-time', false], ['Monthly', true]].map(([label, m]) => (
                  <button key={String(label)} onClick={() => setMonthly(m as boolean)}
                    style={{ flex: 1, padding: '11px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14.5,
                      background: monthly === m ? 'var(--emerald)' : 'transparent', color: monthly === m ? '#fff' : 'var(--slate)' }}>
                    {label}
                  </button>
                ))}
              </div>

              <label className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>Amount</label>
              <div className="amount-grid">
                {DONATE_AMOUNTS.map(a => (
                  <button key={a} onClick={() => { setAmount(a); setCustom('') }}
                    style={{ padding: '16px 0', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 22,
                      border: `1.5px solid ${!custom && amount === a ? 'var(--emerald)' : 'var(--hair)'}`,
                      background: !custom && amount === a ? 'rgba(27,94,32,.06)' : '#fff', color: 'var(--ink)' }}>
                    £{a}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative', marginTop: 12 }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontWeight: 600 }}>£</span>
                <input inputMode="decimal" placeholder="Other amount" aria-label="Other amount in pounds" value={custom}
                  onChange={e => setCustom(e.target.value.replace(/[^0-9.]/g, ''))}
                  style={{ width: '100%', padding: '14px 14px 14px 30px', borderRadius: 12, border: '1.5px solid var(--hair)', fontSize: 16, fontFamily: 'var(--sans)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, padding: '16px 0', borderTop: '1px dashed var(--hair)' }}>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--slate)' }}>{monthly ? 'Monthly' : 'One-time'}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 700, color: 'var(--emerald)' }}>£{value.toFixed(2)}</div>
                </div>
                <button onClick={tellUs} className="btn btn-gold" style={{ padding: '15px 30px', fontSize: 16 }} disabled={value <= 0}>
                  Tell our treasurer
                </button>
              </div>

              <p style={{ fontSize: 11.5, color: 'var(--slate)', margin: 0, lineHeight: 1.5 }}>
                {CHARITY.name} is committed to fundraising honestly, respectfully, and transparently, in line
                with the Code of Fundraising Practice. Registered charity No. {CHARITY.number}.
              </p>
            </div>
          </div>

          {/* ── Side info ── */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="card">
              <h3 style={{ fontSize: 19 }}>Zakat eligible</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <p style={{ color: 'var(--slate)', fontSize: 14.5, margin: 0 }}>
                Our work in poverty relief, education, and support for those in need qualifies for Zakat.
                Mark your transfer <em>ZAKAT</em> and it will only be spent on eligible recipients.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: 19 }}>Major &amp; institutional gifts</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <p style={{ color: 'var(--slate)', fontSize: 14.5, marginBottom: 12 }}>
                For corporate partnerships, grant funding, or a larger gift, our trustees will be glad to help
                you give in the way that suits you best.
              </p>
              <a href={`mailto:${CHARITY.donationsEmail}`} className="btn btn-outline" style={{ justifyContent: 'center', width: '100%' }}>
                Contact our donations team
              </a>
            </div>
            <div className="card" style={{ background: 'var(--emerald)', color: '#fff' }}>
              <h3 style={{ color: '#fff', fontSize: 19 }}>Where your money goes</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 14.5, margin: 0 }}>
                Donations are spent on our four charitable objects: poverty relief, education, youth
                development and Islamic education. No trustee is paid. Our first annual report to the Charity
                Commission will set out what came in and what went out, line by line.
              </p>
              <Link to="/our-work" className="btn btn-ghost" style={{ color: '#fff', marginTop: 14 }}>See our work</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

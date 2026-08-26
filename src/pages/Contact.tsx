import { useRef, useState } from 'react'
import { CHARITY, ACTIVE_SOCIALS } from '../data'
import PageHero from '../components/PageHero'
import { SocialLinks } from '../components/ui'
import { PageMeta } from '../PageMeta'

const DEPARTMENTS = ['General enquiry', 'Donations', 'Volunteering', 'Grants & partnerships', 'Safeguarding']
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@muftdevelopmentfoundation.org.uk'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: DEPARTMENTS[0], message: '' })
  const [state, setState] = useState<'idle' | 'busy' | 'sent' | 'error'>('idle')
  const doneRef = useRef<HTMLHeadingElement | null>(null)

  function set<K extends keyof typeof form>(k: K, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('busy')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          department: form.department, message: form.message,
          _subject: `MDF website enquiry — ${form.department}`, _template: 'table', _honey: '',
        }),
      })
      if (res.ok) { setState('sent'); setTimeout(() => doneRef.current?.focus(), 60) }
      else setState('error')
    } catch { setState('error') }
  }

  return (
    <>
      <PageMeta title="Contact" description="Contact Muft Development Foundation. A trustee reads every message sent through this page." />
      <PageHero eyebrow="Contact" title="Get in touch"
        sub="Whether you want to give, offer a skill, raise a concern, or ask something awkward, this reaches a trustee." />

      <section className="section">
        <div className="wrap split-grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 44, alignItems: 'start' }}>
          {/* form */}
          <div className="card contact-form" style={{ padding: 30 }}>
            {state === 'sent' ? (
              <div role="status" style={{ textAlign: 'center', padding: '30px 0' }}>
                <div aria-hidden style={{ fontSize: 40, color: 'var(--emerald)' }}>✓</div>
                <h3 ref={doneRef} tabIndex={-1} style={{ outline: 'none' }}>Thank you</h3>
                <p style={{ color: 'var(--slate)' }}>Your message has arrived with our trustees. We read everything ourselves, so a reply usually takes a few days rather than a few minutes.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
                <Field label="Full name" req><input required value={form.name} onChange={e => set('name', e.target.value)} style={inp} aria-required="true" /></Field>
                <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Email" req><input required type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inp} aria-required="true" /></Field>
                  <Field label="Phone (optional)"><input value={form.phone} onChange={e => set('phone', e.target.value)} style={inp} /></Field>
                </div>
                <Field label="Department">
                  <select value={form.department} onChange={e => set('department', e.target.value)} style={inp}>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Message" req><textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)} style={{ ...inp, resize: 'vertical' }} aria-required="true" /></Field>
                {state === 'error' && (
                  <div role="alert" style={{ color: 'var(--critical, #b91c1c)', fontSize: 13.5 }}>
                    Sorry — something went wrong. Please email us directly at{' '}
                    <a href={`mailto:${CHARITY.email}`}>{CHARITY.email}</a>.
                  </div>
                )}
                <button className="btn btn-gold" type="submit" disabled={state === 'busy'} style={{ justifyContent: 'center' }}>
                  {state === 'busy' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          {/* details */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="card">
              <h3 style={{ fontSize: 19 }}>Reach us</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <div style={{ color: 'var(--slate)', fontSize: 14.5, lineHeight: 1.7 }}>
                <div style={{ marginBottom: 14 }}>
                  <strong style={{ color: 'var(--ink)' }}>Registered office</strong><br />{CHARITY.office}
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <MailRow label="General enquiries" email={CHARITY.email} />
                  <MailRow label="Donations" email={CHARITY.donationsEmail} />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 19 }}>Volunteer with us</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <p style={{ color: 'var(--slate)', fontSize: 14.5, margin: 0 }}>
                At this stage a volunteer does not slot into an existing rota; they help decide what the rota
                becomes. If you have time, a professional skill, or knowledge of a place we hope to work,
                choose “Volunteering” in the form and tell us about yourself.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 19 }}>Comments &amp; complaints</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <p style={{ color: 'var(--slate)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                If we have got something wrong, we would rather hear it from you than not hear it. Write to{' '}
                <a href={`mailto:${CHARITY.email}`}>{CHARITY.email}</a> and a trustee will respond within ten
                working days. Unresolved fundraising concerns may be raised with the Fundraising Regulator;
                matters about the running of the charity with the Charity Commission for England &amp; Wales.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 19 }}>Follow us</h3>
              <hr className="divider" style={{ width: 40, margin: '12px 0' }} />
              <SocialLinks variant="dark" />
              {ACTIVE_SOCIALS.length === 0 && (
                <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 12, marginBottom: 0 }}>Social channels are added as they launch.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 560px){ .two-col { grid-template-columns: 1fr !important; } }`}</style>
    </>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--hair)', fontSize: 15, fontFamily: 'var(--sans)' }
function Field({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
        {label}{req && <span style={{ color: 'var(--gold-d)' }} aria-hidden> *</span>}
      </span>
      {children}
    </label>
  )
}
function MailRow({ label, email }: { label: string; email: string }) {
  return (
    <div>
      <span style={{ fontSize: 12.5, color: 'var(--slate)', fontWeight: 600 }}>{label}</span><br />
      <a href={`mailto:${email}`} style={{ fontSize: 14, wordBreak: 'break-all' }}>{email}</a>
    </div>
  )
}

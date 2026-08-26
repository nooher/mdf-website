import { useParams, Link } from 'react-router-dom'
import { CHARITY } from '../data'
import PageHero from '../components/PageHero'
import { PageMeta } from '../PageMeta'

type Doc = { title: string; intro: string; sections: { h: string; p: string }[] }

const DOCS: Record<string, Doc> = {
  privacy: {
    title: 'Privacy Policy',
    intro: `${CHARITY.name} (registered charity no. ${CHARITY.number}) is the data controller for this website and is committed to protecting your privacy and handling your personal data in line with the UK GDPR and the Data Protection Act 2018.`,
    sections: [
      { h: 'What we collect', p: 'We collect information you provide when you donate, subscribe, contact us, or express interest in volunteering — such as your name, email, phone number, department of enquiry, and message.' },
      { h: 'How we use it', p: 'To respond to enquiries, process and acknowledge donations, keep you updated only where you have opted in, and to meet our legal and regulatory obligations.' },
      { h: 'Lawful basis', p: 'We process your data on the basis of your consent (for marketing/updates), to take steps at your request or fulfil a request (to answer an enquiry or process a donation), and to comply with legal obligations (such as charity and financial record-keeping).' },
      { h: 'The contact form', p: 'Our contact form is delivered by Formsubmit (formsubmit.co), which acts as a processor and forwards your submission to our charity email. Your data may be transmitted through, and stored on, servers outside the UK; we only share what you enter in the form, and we do not use it for any purpose other than responding to you.' },
      { h: 'Payments', p: 'We do not currently take card payments on this website. When online card payments are enabled, they will be processed securely by regulated payment providers (such as Stripe and PayPal); we will not store card details on our servers, and this policy will be updated accordingly.' },
      { h: 'Your rights', p: 'You may request access to, correction of, or deletion of your data, object to or restrict processing, and withdraw consent to marketing at any time by contacting us.' },
      { h: 'Complaints', p: `If you are unhappy with how we have handled your data, please contact us first at ${CHARITY.email}. You also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk.` },
      { h: 'Contact', p: `For any data-protection request, email ${CHARITY.email}.` },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'This website uses the minimum storage necessary to function, in line with ICO guidance and the Privacy and Electronic Communications Regulations (PECR).',
    sections: [
      { h: 'Essential storage only', p: 'We store a single small item in your browser to remember that you have seen our cookie notice. This is required for the site to work and does not track you or identify you.' },
      { h: 'No tracking or advertising', p: 'We do not use advertising cookies and we do not sell or share your data.' },
      { h: 'Analytics', p: 'We use Vercel Web Analytics and Speed Insights to understand which pages are useful and to catch technical problems. These are cookieless — they do not store anything in your browser, do not track you across other websites, and cannot identify you personally.' },
      { h: 'Managing your choices', p: 'You can clear the stored notice at any time through your browser settings; the notice will simply appear again on your next visit.' },
    ],
  },
  safeguarding: {
    title: 'Safeguarding Policy',
    intro: 'The safety and wellbeing of the children, young people, and vulnerable adults we work with is our highest priority. This policy is required by the Charity Commission.',
    sections: [
      { h: 'Our commitment', p: 'We are committed to safeguarding everyone who comes into contact with our work, to creating a safe and respectful environment, and to acting swiftly and appropriately on any concern.' },
      { h: 'Designated Safeguarding Lead', p: `Our designated Safeguarding Lead is a named Founder Trustee (Ms. Ruriko Mohamed Mubago). Concerns can be raised confidentially at ${CHARITY.email} and will be treated with the utmost care and discretion.` },
      { h: 'Reporting a concern', p: 'Any safeguarding concern is taken seriously, recorded, and — where appropriate — reported without delay to the relevant statutory authorities: your local authority safeguarding team (or the Local Authority Designated Officer), the police (101, or 999 in an emergency), or the NSPCC helpline on 0808 800 5000.' },
      { h: 'Safer practice', p: 'We adopt safer-recruitment practice, including appropriate DBS checks for roles that require them, and induct everyone who works or volunteers with us on this policy.' },
      { h: 'Review', p: 'This policy is reviewed by the trustees at least annually and updated as our activities grow.' },
    ],
  },
  terms: {
    title: 'Terms of Use',
    intro: `By using this website you agree to these terms. ${CHARITY.name} is a Charitable Incorporated Organisation registered in England and Wales (no. ${CHARITY.number}).`,
    sections: [
      { h: 'Use of the site', p: 'You may use this website for lawful purposes only. Content is provided for information and may be updated at any time.' },
      { h: 'Donations', p: 'Donations are voluntary and, save where required by law, non-refundable. Please contact us promptly about any error in a donation.' },
      { h: 'Intellectual property', p: 'The MDF name, logo, and content are the property of the Foundation and may not be reproduced without permission.' },
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    intro: 'We want everyone to be able to use this website, whatever their ability or the technology they use. We have built it with accessibility in mind and are committed to improving it continually.',
    sections: [
      { h: 'Our approach', p: 'This site is built with semantic HTML, a logical heading structure, a skip-to-content link, keyboard-operable navigation and forms, visible focus outlines, and a colour palette chosen to meet WCAG contrast requirements for text. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.' },
      { h: 'Known limitations', p: 'We are a small, newly registered charity and this site is actively evolving, so not every page has been formally audited yet. If something does not work well with a screen reader, keyboard, voice control, or magnification, we want to know.' },
      { h: 'Reporting a problem', p: `If you find an accessibility barrier on this site, please contact ${CHARITY.email} with the page and the issue — we will respond and aim to fix genuine barriers within a reasonable time.` },
      { h: 'Enforcement', p: 'If you are not happy with how we respond to your complaint, you can contact the Equality Advisory and Support Service (EASS).' },
    ],
  },
}

export default function Legal() {
  const { page } = useParams()
  const doc = page ? DOCS[page] : undefined
  if (!doc) return (
    <div className="wrap section center">
      <PageMeta title="Legal" />
      <h1>Policy not found</h1><Link to="/" className="btn btn-outline">Home</Link>
    </div>
  )
  return (
    <>
      <PageMeta title={doc.title} description={doc.intro} />
      <PageHero eyebrow="Legal" title={doc.title} />
      <section className="section">
        <div className="wrap prose" style={{ margin: '0 auto' }}>
          <p className="lead" style={{ color: 'var(--slate)' }}>{doc.intro}</p>
          {doc.sections.map(s => (
            <div key={s.h} style={{ marginTop: 26 }}>
              <h3 style={{ fontSize: 20 }}>{s.h}</h3>
              <hr className="divider" />
              <p style={{ color: 'var(--slate)' }}>{s.p}</p>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 34 }}>
            {Object.entries(DOCS).map(([k, d]) => (
              <Link key={k} to={`/legal/${k}`} className="chip">{d.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const BASE = 'Muft Development Foundation'
const SUFFIX = 'Registered Charity 1218194'
const SITE = 'https://muftdevelopmentfoundation.org.uk'

/** Sets a per-route title, description, canonical URL, and Open Graph tags (SPA + SSG SEO / WCAG 2.4.2). */
export function PageMeta({ title, description }: { title?: string; description?: string }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} — ${BASE}` : `${BASE} — ${SUFFIX}`
  const url = `${SITE}${pathname}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:title" content={fullTitle} />
    </Helmet>
  )
}

import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const BASE = 'Muft Development Foundation'
const SUFFIX = 'Registered Charity 1218194'
const SITE = 'https://muftdevelopmentfoundation.org.uk'

/** Sets a per-route title, description, canonical URL, and Open Graph tags (SPA + SSG SEO / WCAG 2.4.2).
 *  `image` is a site path, e.g. an event poster; it defaults to the 1200×630 share card. */
export function PageMeta({ title, description, image }: { title?: string; description?: string; image?: string }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} — ${BASE}` : `${BASE} — ${SUFFIX}`
  const url = `${SITE}${pathname}`
  const img = `${SITE}${image ?? '/og.png'}`
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
      <meta property="og:image" content={img} />
      <meta name="twitter:image" content={img} />
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
    </Helmet>
  )
}

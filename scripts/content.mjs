// Single source of truth for site routes and for news posts authored in content/news/.
// Used by build-content.mjs (generates typed data for the app), prerender.mjs and the
// sitemap writer, so the three can never disagree about which pages exist.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const root = path.resolve(__dirname, '..')
const newsDir = path.join(root, 'content', 'news')

// Hand-maintained pages. News articles are appended to this list at build time.
export const STATIC_ROUTES = [
  '/',
  '/about',
  '/our-work',
  '/our-work/poverty-relief',
  '/our-work/education',
  '/our-work/youth-development',
  '/our-work/islamic-education',
  '/donate',
  '/grants',
  '/news',
  '/faq',
  '/contact',
  '/legal/privacy',
  '/legal/cookies',
  '/legal/safeguarding',
  '/legal/terms',
  '/legal/accessibility',
]

// Filenames are YYYY-MM-DD-some-slug.md; the date prefix orders the folder and is
// stripped from the URL so the published link stays readable.
function slugFromFilename(file) {
  return file.replace(/\.md$/i, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

function formatDate(iso) {
  // Formatted in UTC: a plain YYYY-MM-DD parses as UTC midnight, which a negative
  // local offset would otherwise render as the previous day.
  const d = new Date(iso + 'T00:00:00Z')
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function loadNews() {
  if (!fs.existsSync(newsDir)) return []
  return fs.readdirSync(newsDir)
    .filter(f => f.toLowerCase().endsWith('.md'))
    .map(file => {
      const raw = fs.readFileSync(path.join(newsDir, file), 'utf8')
      const { data, content } = matter(raw)
      if (!data.title) throw new Error(`content/news/${file} is missing a title.`)
      if (!data.date) throw new Error(`content/news/${file} is missing a date.`)
      const iso = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
      return {
        slug: String(data.slug || slugFromFilename(file)),
        title: String(data.title),
        date: iso,
        // Authors can override the shown date with e.g. "May 2026" when the exact day is not known.
        dateLabel: String(data.dateLabel || formatDate(iso)),
        summary: String(data.summary || ''),
        image: String(data.image || ''),
        html: marked.parse(content.trim(), { async: false }),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function allRoutes() {
  return [...STATIC_ROUTES, ...loadNews().map(p => `/news/${p.slug}`)]
}

export const SITE = 'https://muftdevelopmentfoundation.org.uk'

// Priorities carried over from the hand-written sitemap this replaced.
const PRIORITY = {
  '/': '1.0',
  '/donate': '0.9',
  '/about': '0.8',
  '/our-work': '0.8',
  '/grants': '0.7',
  '/contact': '0.7',
}

function priorityFor(route) {
  if (PRIORITY[route]) return PRIORITY[route]
  if (route.startsWith('/legal/')) return '0.3'
  if (route.startsWith('/news/')) return '0.5'
  return '0.6'
}

export function buildSitemap() {
  const news = loadNews()
  const lastmod = new Map(news.map(p => [`/news/${p.slug}`, p.date]))
  // The index page's freshness follows the most recent article.
  if (news.length) lastmod.set('/news', news[0].date)

  const urls = allRoutes().map(route => {
    const loc = route === '/' ? SITE + '/' : SITE + route
    const mod = lastmod.get(route)
    return `  <url><loc>${loc}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}<priority>${priorityFor(route)}</priority></url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

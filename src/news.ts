/* News posts are read from content/news/*.md, the files the /admin CMS edits.
 * The file name is the URL slug. Newest first. */
import { type ContentFile, dateParts, wallClock } from './events'

export type NewsPost = {
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  summary: string
  image?: string
  imageAlt?: string
  /** Optional button: a form, an external page, or a path on this site. */
  link?: string
  linkLabel?: string
  html: string
}

const files = import.meta.glob('../content/news/*.md', { import: 'default', eager: true }) as Record<string, ContentFile>

function load(path: string, { data: d, html }: ContentFile): NewsPost {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const str = (v: unknown) => (v == null || v === '' ? undefined : String(v))
  for (const k of ['title', 'date', 'summary']) {
    if (!str(d[k])) throw new Error(`content/news/${slug}.md is missing "${k}"`)
  }
  return {
    slug,
    title: String(d.title),
    date: String(d.date).slice(0, 10),
    summary: String(d.summary),
    image: str(d.image),
    imageAlt: str(d.imageAlt),
    link: str(d.link),
    linkLabel: str(d.linkLabel),
    html,
  }
}

export const NEWS: NewsPost[] = Object.entries(files)
  .map(([path, file]) => load(path, file))
  .sort((a, b) => wallClock(b.date) - wallClock(a.date) || a.title.localeCompare(b.title))

/** "30 October 2026" */
export function formatNewsDate(date: string) {
  const p = dateParts(date)
  return `${p.day} ${p.month} ${p.year}`
}

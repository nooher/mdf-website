/* Events are read from content/events/*.md — one file per event, YAML front
 * matter for the fields and Markdown for the description. The file name is the
 * URL slug. These are the files a CMS edits, so keep the field names stable. */
import { useEffect, useState } from 'react'

export type EventGuest = { role: string; name: string; title?: string }

export type SiteEvent = {
  slug: string
  title: string
  theme?: string
  tagline?: string
  summary: string
  /** Local London wall-clock time, e.g. 2026-11-28T10:00 (or a bare date). */
  start: string
  end?: string
  venue: string
  address?: string
  price?: string
  registrationUrl?: string
  /** Defaults to the end of the event when left out. */
  registrationCloses?: string
  poster?: string
  posterAlt?: string
  programmes: string[]
  guests: EventGuest[]
  guestsNote?: string
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  html: string
}

// Parsed into { data, html } at build time by the markdown plugin in vite.config.ts.
type ContentFile = { data: Record<string, any>; html: string }
const files = import.meta.glob('../content/events/*.md', { import: 'default', eager: true }) as Record<string, ContentFile>

function load(path: string, { data: d, html }: ContentFile): SiteEvent {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const str = (v: unknown) => (v == null || v === '' ? undefined : String(v))
  for (const k of ['title', 'summary', 'start', 'venue']) {
    if (!str(d[k])) throw new Error(`content/events/${slug}.md is missing "${k}"`)
  }
  return {
    slug,
    title: String(d.title),
    theme: str(d.theme),
    tagline: str(d.tagline),
    summary: String(d.summary),
    start: String(d.start),
    end: str(d.end),
    venue: String(d.venue),
    address: str(d.address),
    price: str(d.price),
    registrationUrl: str(d.registrationUrl),
    registrationCloses: str(d.registrationCloses),
    poster: str(d.poster),
    posterAlt: str(d.posterAlt),
    programmes: Array.isArray(d.programmes) ? d.programmes.map(String) : [],
    guests: Array.isArray(d.guests) ? d.guests : [],
    guestsNote: str(d.guestsNote),
    contactName: str(d.contactName),
    contactPhone: str(d.contactPhone),
    contactEmail: str(d.contactEmail),
    html,
  }
}

export const EVENTS: SiteEvent[] = Object.entries(files)
  .map(([path, file]) => load(path, file))
  .sort((a, b) => wallClock(a.start) - wallClock(b.start))

/* Times are read as wall-clock values and compared against UTC, so they can be
 * an hour out during British Summer Time. That is close enough for deciding
 * when registration closes and when an event moves to "past". */
function wallClock(s: string, endOfDay = false) {
  const t = /^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T${endOfDay ? '23:59' : '00:00'}` : s
  return Date.parse(`${t}Z`)
}

export const isPast = (e: SiteEvent, now: number) => now > wallClock(e.end ?? e.start, true)

export const registrationOpen = (e: SiteEvent, now: number) =>
  !!e.registrationUrl && now <= wallClock(e.registrationCloses ?? e.end ?? e.start, true)

export const upcomingEvents = (now: number) => EVENTS.filter(e => !isPast(e, now))
export const pastEvents = (now: number) => EVENTS.filter(e => isPast(e, now)).reverse()

/* Formatted by hand rather than with Intl so the server-rendered HTML matches
 * what the browser renders (Node and browsers disagree on commas). */
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function dateParts(s: string) {
  const d = new Date(wallClock(s))
  return { weekday: DAYS[d.getUTCDay()], day: d.getUTCDate(), month: MONTHS[d.getUTCMonth()], year: d.getUTCFullYear() }
}

export function formatDate(s: string) {
  const p = dateParts(s)
  return `${p.weekday} ${p.day} ${p.month} ${p.year}`
}

function formatTime(s: string) {
  const d = new Date(wallClock(s))
  const h = d.getUTCHours(), m = d.getUTCMinutes()
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`
}

/** "10am – 4:30pm", or undefined when the event has no time of day. */
export function formatTimes(e: SiteEvent) {
  if (!e.start.includes('T')) return undefined
  return e.end?.includes('T') ? `${formatTime(e.start)} – ${formatTime(e.end)}` : formatTime(e.start)
}

declare const __BUILD_TIME__: number

/** The build time on first render (so prerendered HTML hydrates cleanly), then the real time. */
export function useNow() {
  const [now, setNow] = useState(__BUILD_TIME__)
  useEffect(() => setNow(Date.now()), [])
  return now
}

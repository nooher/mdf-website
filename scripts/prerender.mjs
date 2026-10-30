// Prerenders every route to static HTML using the SSR bundle built from src/entry-server.tsx,
// then writes sitemap.xml from the same route list.
// Run after `vite build` (client) and `vite build --ssr` (server) have both completed.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

// Fixed routes and their sitemap priority. Event and news pages are added from
// the content files below, so publishing through /admin needs no change here.
const ROUTES = [
  ['/', '1.0'],
  ['/about', '0.8'],
  ['/our-work', '0.8'],
  ['/our-work/poverty-relief', '0.6'],
  ['/our-work/education', '0.6'],
  ['/our-work/youth-development', '0.6'],
  ['/our-work/islamic-education', '0.6'],
  ['/donate', '0.9'],
  ['/grants', '0.7'],
  ['/events', '0.8'],
  ['/news', '0.6'],
  ['/faq', '0.6'],
  ['/contact', '0.7'],
  ['/legal/privacy', '0.3'],
  ['/legal/cookies', '0.3'],
  ['/legal/safeguarding', '0.3'],
  ['/legal/terms', '0.3'],
  ['/legal/accessibility', '0.3'],
]

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render, EVENTS, NEWS } = await import(pathToFileURL(ssrEntry).href)
const routes = [
  ...ROUTES,
  ...EVENTS.map(e => [`/events/${e.slug}`, '0.7']),
  ...NEWS.map(n => [`/news/${n.slug}`, '0.5']),
]

function headTagsFromHelmet(helmet) {
  return [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
  ].filter(Boolean).join('\n    ')
}

let count = 0
for (const [route] of routes) {
  const { html, helmet } = render(route)
  const headTags = headTagsFromHelmet(helmet)

  let page = template.replace(
    /<!--app-head-start-->[\s\S]*?<!--app-head-end-->/,
    headTags,
  )
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const outPath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html')

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, page)
  count++
}

const SITE = 'https://muftdevelopmentfoundation.org.uk'
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(([route, priority]) => `  <url><loc>${SITE}${route}</loc><priority>${priority}</priority></url>`),
  '</urlset>',
  '',
].join('\n')
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)

// Point the /admin editor at the repository this deployment was built from, so
// moving the repository to another GitHub account needs no edit to config.yml.
const { VERCEL_GIT_REPO_OWNER: owner, VERCEL_GIT_REPO_SLUG: slug } = process.env
if (owner && slug) {
  const cmsConfig = path.join(distDir, 'admin', 'config.yml')
  const yml = fs.readFileSync(cmsConfig, 'utf-8')
  if (!/^  repo: .*$/m.test(yml)) throw new Error('admin/config.yml has no backend repo line to rewrite')
  fs.writeFileSync(cmsConfig, yml.replace(/^  repo: .*$/m, `  repo: ${owner}/${slug}`))
  console.log(`Admin editor points at ${owner}/${slug}.`)
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Prerendered ${count} routes.`)

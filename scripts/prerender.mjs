// Prerenders every route to static HTML using the SSR bundle built from src/entry-server.tsx.
// Run after `vite build` (client) and `vite build --ssr` (server) have both completed.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const ROUTES = [
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

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render } = await import(pathToFileURL(ssrEntry).href)

function headTagsFromHelmet(helmet) {
  return [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
  ].filter(Boolean).join('\n    ')
}

let count = 0
for (const route of ROUTES) {
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

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Prerendered ${count} routes.`)

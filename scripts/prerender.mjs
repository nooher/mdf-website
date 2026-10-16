// Prerenders every route to static HTML using the SSR bundle built from src/entry-server.tsx,
// then writes the sitemap. Routes come from scripts/content.mjs, so a news post added in
// content/news/ is prerendered and listed in the sitemap without anyone editing this file.
// Run after `vite build` (client) and `vite build --ssr` (server) have both completed.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { allRoutes, buildSitemap, repoFromEnv, root } from './content.mjs'

const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

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
for (const route of allRoutes()) {
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

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap())

// Point the editor at whichever repository this deployment was built from, so the
// site keeps working after the repository moves to another owner without anyone
// having to remember to edit public/admin/config.yml.
const repo = repoFromEnv()
const cfgPath = path.join(distDir, 'admin', 'config.yml')
if (repo && fs.existsSync(cfgPath)) {
  const cfg = fs.readFileSync(cfgPath, 'utf8')
  const updated = cfg
    .split('\n')
    .map(line => (line.trimStart().startsWith('repo:') ? `${line.slice(0, line.indexOf('repo:'))}repo: ${repo}` : line))
    .join('\n')
  if (updated !== cfg) {
    fs.writeFileSync(cfgPath, updated)
    console.log(`Editor will commit to ${repo}.`)
  }
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Prerendered ${count} routes. Sitemap written.`)

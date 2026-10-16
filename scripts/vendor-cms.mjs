// Refreshes the copy of Decap CMS served from public/admin/.
// Run with: npm run update-cms   (then review the diff and commit)
//
// The editor is served from our own domain rather than a CDN so the site's
// Content-Security-Policy can keep script-src locked to 'self'. That means the
// built files live in this repository and have to be refreshed deliberately.
//
// Note the package: `decap-cms` is the browser build, with React bundled in, meant
// to be loaded with a <script> tag. `decap-cms-app` is the one for bundlers; it
// expects React to be supplied and fails at runtime when loaded directly.
//
// index.html and config.yml in public/admin/ are ours — this script never touches them.
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { root } from './content.mjs'

const PACKAGE = 'decap-cms'
const ENTRY = 'decap-cms.js'
const adminDir = path.join(root, 'public', 'admin')
const KEEP = new Set(['index.html', 'config.yml'])

// The package also ships a legacy `cms.*` copy of every file. Taking only the
// decap-cms-named set halves what we commit, and the entry bundle asks for its
// chunks by those names anyway.
function wanted(name) {
  if (name.endsWith('.map')) return false
  return name === ENTRY
    || name === `${ENTRY}.LICENSE.txt`
    || name.endsWith(`.${ENTRY}`)
    || name.endsWith('.wasm')
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'decap-'))
// Run through a shell: Node on Windows refuses to spawn npm.cmd directly. Every
// command here is a constant or a filename npm itself printed.
const run = line => execSync(line, { cwd: tmp, encoding: 'utf8' })

try {
  console.log(`Fetching ${PACKAGE} from npm…`)
  const packed = run(`npm pack ${PACKAGE} --quiet`).trim()
  const tgz = packed.split(/\r?\n/).pop()
  run(`tar -xzf "${tgz}"`)

  const dist = path.join(tmp, 'package', 'dist')
  if (!fs.existsSync(path.join(dist, ENTRY))) throw new Error(`${PACKAGE} has no dist/${ENTRY}.`)
  const version = JSON.parse(fs.readFileSync(path.join(tmp, 'package', 'package.json'), 'utf8')).version

  for (const f of fs.readdirSync(adminDir)) {
    if (!KEEP.has(f)) fs.rmSync(path.join(adminDir, f))
  }

  let n = 0
  for (const f of fs.readdirSync(dist, { withFileTypes: true })) {
    if (!f.isFile() || !wanted(f.name)) continue
    fs.copyFileSync(path.join(dist, f.name), path.join(adminDir, f.name))
    n++
  }

  console.log(`Vendored ${PACKAGE} ${version} — ${n} files into public/admin/.`)
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}

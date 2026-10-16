// Refreshes the copy of Decap CMS served from public/admin/.
// Run with: npm run update-cms   (then commit the changed files)
//
// The editor is served from our own domain rather than a CDN so the site's
// Content-Security-Policy can keep script-src locked to 'self'. That means the
// built files live in this repository and have to be refreshed deliberately.
//
// index.html and config.yml in public/admin/ are ours — this script never touches them.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { root } from './content.mjs'

const PACKAGE = 'decap-cms-app'
const adminDir = path.join(root, 'public', 'admin')
const KEEP = new Set(['index.html', 'config.yml'])
const VENDORED = new Set(['.js', '.wasm', '.txt'])

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'decap-'))
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

try {
  console.log(`Fetching ${PACKAGE} from npm…`)
  const tgz = execFileSync(npm, ['pack', PACKAGE, '--quiet'], { cwd: tmp, encoding: 'utf8' }).trim().split('\n').pop()
  execFileSync('tar', ['-xzf', tgz], { cwd: tmp })

  const dist = path.join(tmp, 'package', 'dist')
  if (!fs.existsSync(dist)) throw new Error(`No dist/ in ${PACKAGE}.`)

  const version = JSON.parse(fs.readFileSync(path.join(tmp, 'package', 'package.json'), 'utf8')).version

  for (const f of fs.readdirSync(adminDir)) {
    if (!KEEP.has(f) && VENDORED.has(path.extname(f))) fs.rmSync(path.join(adminDir, f))
  }

  let n = 0
  for (const f of fs.readdirSync(dist, { withFileTypes: true })) {
    // Source maps are ~22 MB and are not needed to run the editor.
    if (!f.isFile() || f.name.endsWith('.map') || !VENDORED.has(path.extname(f.name))) continue
    fs.copyFileSync(path.join(dist, f.name), path.join(adminDir, f.name))
    n++
  }

  console.log(`Vendored ${PACKAGE} ${version} — ${n} files into public/admin/.`)
  console.log('Review the diff, then commit.')
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}

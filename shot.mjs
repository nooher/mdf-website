import { chromium } from 'playwright'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const p = await b.newPage({ viewport: { width: 1280, height: 1000 } })
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await p.evaluate(() => { try { localStorage.setItem('mdf-cookie-ack','1') } catch {} })
for (const [route, name] of [['/','home'],['/about/','about'],['/our-work/','work'],['/donate/','donate']]) {
  await p.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1000)
  await p.screenshot({ path: `/home/claude/v2-${name}.png`, fullPage: true })
  console.log('shot', name)
}
await b.close()

// GitHub sign-in for the /admin CMS, step 2 of 2: swap GitHub's code for a
// token and hand it to the CMS window that opened this popup, using the
// message handshake Decap and Sveltia CMS expect.
import { randomBytes } from 'node:crypto'
import { SITE_URL } from './auth.js'

export default async function handler(req, res) {
  const { code, state } = req.query
  let status = 'error'
  let content

  if (!code || !state || state !== req.cookies?.mdf_oauth_state) {
    content = { provider: 'github', error: 'Sign-in expired or was tampered with. Close this window and try again.' }
  } else {
    try {
      const r = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${SITE_URL}/api/callback`,
        }),
      })
      const data = await r.json()
      if (data.access_token) {
        status = 'success'
        content = { provider: 'github', token: data.access_token }
      } else {
        content = { provider: 'github', error: data.error_description || data.error || 'GitHub did not return a token.' }
      }
    } catch {
      content = { provider: 'github', error: 'Could not reach GitHub. Try again in a minute.' }
    }
  }

  // JSON in a <script> must not be able to close the tag.
  const js = v => JSON.stringify(v).replace(/</g, '\\u003c')
  const message = `authorization:github:${status}:${JSON.stringify(content)}`
  const origin = new URL(SITE_URL).origin
  const nonce = randomBytes(16).toString('base64')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Content-Security-Policy', `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'`)
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Set-Cookie', 'mdf_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0')
  res.status(200).send(`<!doctype html><meta charset="utf-8"><title>Signing in…</title>
<p>${status === 'success' ? 'Signed in. This window will close.' : 'Sign-in failed. You can close this window.'}</p>
<script nonce="${nonce}">
  (() => {
    const message = ${js(message)}
    const origin = ${js(origin)}
    if (!window.opener) return
    window.addEventListener('message', e => {
      if (e.origin === origin && e.data === 'authorizing:github') window.opener.postMessage(message, origin)
    })
    window.opener.postMessage('authorizing:github', origin)
  })()
</script>`)
}

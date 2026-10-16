// Step 1 of GitHub sign-in for the editor at /admin.
// Decap opens this in a popup; we hand the user on to GitHub to approve, carrying a
// random `state` that callback.js checks, so another site cannot replay the exchange.
import crypto from 'node:crypto'

export default function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  if (!clientId) {
    res.status(500).send('GITHUB_OAUTH_CLIENT_ID is not set on this deployment.')
    return
  }

  const state = crypto.randomBytes(16).toString('hex')
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const redirectUri = `${proto}://${host}/api/oauth/callback`

  res.setHeader(
    'Set-Cookie',
    `mdf_oauth_state=${state}; Path=/api/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  )

  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('scope', 'repo,user')
  url.searchParams.set('state', state)

  res.writeHead(302, { Location: url.toString() })
  res.end()
}

// GitHub sign-in for the /admin CMS, step 1 of 2: send the editor to GitHub.
// Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (a GitHub OAuth App whose
// callback URL is SITE_URL/api/callback) in the Vercel project's settings.
import { randomBytes } from 'node:crypto'

export const SITE_URL = process.env.SITE_URL || 'https://muftdevelopmentfoundation.org.uk'

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).send('Sign-in is not set up yet: GITHUB_CLIENT_ID is missing in Vercel.')
    return
  }
  // The CMS asks for `repo`; `public_repo` is enough once the repository is public.
  const scope = req.query.scope === 'public_repo' ? 'public_repo' : 'repo'
  const state = randomBytes(16).toString('hex')

  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', `${SITE_URL}/api/callback`)
  url.searchParams.set('scope', scope)
  url.searchParams.set('state', state)

  res.setHeader('Set-Cookie', `mdf_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`)
  res.setHeader('Cache-Control', 'no-store')
  res.redirect(302, url.toString())
}

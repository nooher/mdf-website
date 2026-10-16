// Step 2 of GitHub sign-in for the editor at /admin.
// GitHub sends the user back here with a short-lived code. We swap it for a token
// using the client secret (which never leaves the server), then hand the token to the
// Decap window that opened this popup and close it.

function page(message) {
  // Decap listens for this exact handshake on the window that opened the popup.
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Signing in…</title></head>
<body><p>Completing sign-in…</p>
<script>
  (function () {
    var msg = ${JSON.stringify(message)};
    function send(e) {
      if (e.data !== 'authorizing:github') return;
      window.removeEventListener('message', send, false);
      window.opener.postMessage(msg, e.origin);
    }
    window.addEventListener('message', send, false);
    if (window.opener) window.opener.postMessage('authorizing:github', '*');
    else document.body.textContent = 'Open the editor at /admin and sign in from there.';
  })();
</script>
</body></html>`
}

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    res.status(500).send('GitHub OAuth is not configured on this deployment.')
    return
  }

  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const url = new URL(req.url, `${proto}://${host}`)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  const cookie = /mdf_oauth_state=([a-f0-9]+)/.exec(req.headers.cookie || '')
  res.setHeader('Set-Cookie', 'mdf_oauth_state=; Path=/api/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=0')

  if (!code || !state || !cookie || cookie[1] !== state) {
    res.status(400).setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(page('authorization:github:error:{"message":"Sign-in could not be verified. Please try again."}'))
    return
  }

  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })
    const data = await r.json()
    if (!data.access_token) throw new Error(data.error_description || 'No token returned')

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(page(`authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`))
  } catch (err) {
    res.status(502).setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(page(`authorization:github:error:${JSON.stringify({ message: String(err.message || err) })}`))
  }
}

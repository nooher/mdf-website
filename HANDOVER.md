# Running the MDF website

This is the website for Muft Development Foundation, registered charity 1218194
(Charity Commission for England and Wales). It is a React site that is built into
plain HTML files and served by Vercel at **muftdevelopmentfoundation.org.uk**.

Two audiences for this file: **trustees**, who need the first section only, and
whoever looks after the technical side, who needs the rest.

---

## Publishing a story (trustees)

1. Go to **https://muftdevelopmentfoundation.org.uk/admin**
2. Click **Login with GitHub** and approve.
3. **News & stories → New Story**. Fill in the title, the date, a one or two
   sentence summary, and the story itself. An image is optional.
4. Click **Publish**.

The site rebuilds itself and the story is live in about a minute. The story also
appears on the news page and in the sitemap automatically — nobody has to add it
anywhere else.

**Before you publish, please check:**

- Only describe things that have actually happened. No fundraising totals, no
  numbers of people helped, and no results we cannot evidence.
- Never mention Gift Aid or any tax relief. MDF is registered with the Charity
  Commission but is **not** recognised for tax purposes by HMRC, so it cannot
  claim it.
- Do not publish photographs of children without written consent from a parent
  or guardian.
- Bank details are **not** edited here, and must never be changed by email
  request. See "Bank details" below.

If something looks wrong after publishing, open the story again, fix it and
publish again. If the site does not change at all, see "If a change does not
appear" at the end.

---

## Who owns what

The site depends on four accounts. At handover each should belong to MDF, not to
an individual.

| Thing | What it does | Check |
|---|---|---|
| GitHub repository | Holds the site's source and every story | Should be owned by an MDF organisation, not a personal account |
| Vercel project `mdf` | Builds and serves the site | Should be in an MDF team; the domain is attached here |
| Domain registrar | Owns muftdevelopmentfoundation.org.uk | Should be an MDF account |
| Google Workspace | The charity's email | Separate from the above; see the warning on DNS |

**Do not change DNS or MX records** while moving anything. The domain's email and
the website use the same DNS. Moving the Vercel project between accounts carries
the domain with it and does not require DNS changes.

### Transfer checklist

1. Create a GitHub organisation for MDF. Add trustees who will publish, and the
   person looking after the technical side as an owner.
2. In the repository: **Settings → General → Transfer ownership** to that
   organisation.
3. In `public/admin/config.yml`, change `repo:` to the new `owner/name`, commit.
4. In the GitHub OAuth App (below), update the callback URL if the domain changes.
   If it does not change, nothing to do.
5. In Vercel: **Project → Settings → General → Transfer project** to the MDF team.
   Check afterwards that muftdevelopmentfoundation.org.uk still resolves.
6. Re-add the two environment variables (below) if the transfer did not carry them.
7. Turn on two-factor authentication for the GitHub organisation and the Vercel team.

---

## Making /admin work

The editor signs people in with their own GitHub account. That needs a GitHub
OAuth App and two environment variables. **Until these are set, /admin will load
but sign-in will fail.**

1. GitHub → the MDF organisation → **Settings → Developer settings → OAuth Apps
   → New OAuth App**
   - Application name: `MDF website editor`
   - Homepage URL: `https://muftdevelopmentfoundation.org.uk`
   - Authorization callback URL:
     `https://muftdevelopmentfoundation.org.uk/api/oauth/callback`
2. Generate a client secret. You only see it once.
3. Vercel → project `mdf` → **Settings → Environment Variables**, for
   Production *and* Preview:
   - `GITHUB_OAUTH_CLIENT_ID` — the client ID
   - `GITHUB_OAUTH_CLIENT_SECRET` — the secret
4. Redeploy.

Anyone who can sign in must also have write access to the repository. Giving
someone publishing rights means adding them to the repository, nothing else.

---

## Bank details

`src/data.ts` holds the account name, sort code, account number and IBAN shown on
the Donate page. **These are the details donors pay into.** A change there changes
where money goes.

`CODEOWNERS` marks that file, along with the deployment and build files, as
needing review. For that to be enforced rather than advisory:

GitHub → repository → **Settings → Rules → Rulesets → New branch ruleset**
- Target branch: `main`
- **Require a pull request before merging**
- **Require review from Code Owners**
- Under **Bypass list**, add the organisation's admin role so routine news
  publishing is not blocked — or leave it empty and switch the editor to review
  mode instead (see below).

If you would rather every story was reviewed before it goes live, change
`publish_mode: simple` to `publish_mode: editorial_workflow` in
`public/admin/config.yml`. Stories then arrive as pull requests for someone to
approve.

Bank details change only when MDF publishes a change on the site. Any email or
message claiming the account has changed should be treated as fraud.

---

## Working on the site itself

Requires Node.js 24.

```
npm ci
npm run dev        # http://localhost:5173
npm run build      # type-checks, builds, prerenders, writes the sitemap
npm run preview    # serves the built site
```

### How content becomes pages

- Stories are markdown files in `content/news/`, named `YYYY-MM-DD-slug.md`. The
  date prefix orders the folder and is stripped from the URL.
- `scripts/build-content.mjs` renders them to `src/content/news.generated.ts`,
  which the app imports. That file is generated — do not edit it, and it is not
  in git.
- `scripts/content.mjs` is the single list of routes. `scripts/prerender.mjs`
  prerenders each one to static HTML and writes `dist/sitemap.xml` from the same
  list, so the two can never disagree.
- Everything else — charity details, programmes, trustees, FAQs — is in
  `src/data.ts`.

### The editor

`public/admin/` holds Decap CMS, served from our own domain rather than a CDN so
the site's Content-Security-Policy can keep `script-src 'self'`. The built files
are committed. To update them:

```
npm run update-cms
```

Then review the diff and commit. `public/admin/index.html` and
`public/admin/config.yml` are ours and are never overwritten.

### Security headers

`vercel.json` sets a strict policy for the public site. `/admin` and
`/api/oauth/` have their own narrower policies because the editor needs
WebAssembly and talks to the GitHub API, and because the sign-in popup cannot
report back under `Cross-Origin-Opener-Policy: same-origin`. If you change these,
check the headers on `/`, `/admin` and a story page afterwards.

---

## If a change does not appear

The build type-checks before it deploys. If anything is broken, **the deploy
fails and the live site stays exactly as it was** — a mistake cannot take the
site down, it just means the change does not appear.

1. Vercel → project `mdf` → **Deployments**. The newest one will be marked
   *Error*.
2. Open it and read the build log; the failure is usually named on the last few
   lines.
3. Fix it and push again, or use **Rollback** on the last good deployment.

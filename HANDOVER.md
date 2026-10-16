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

The site depends on five accounts. At handover each should belong to MDF, not to
an individual.

| Account | What it does | Why it matters |
|---|---|---|
| **Domain registrar** | Owns the name muftdevelopmentfoundation.org.uk | Delegates the name to Cloudflare, and does nothing else |
| **Cloudflare** | Answers all DNS for the domain | Holds the website records and the email records together |
| **GitHub** | The site's source and every story | Publishing rights are repository access |
| **Vercel** | Builds and serves the site | The custom domain is attached to the project here |
| **Google Workspace** | The charity's email | The MX records in Cloudflare point to it |

### How the domain actually works

```
Registrar  - holds the name, delegates it to:
Cloudflare - answers every DNS query for the domain:
               A / CNAME  send the website to Vercel
               MX         send email to Google Workspace
               TXT        SPF, DKIM and DMARC for that email
Vercel     - builds and serves the site. It does NOT hold this domain's DNS.
```

Cloudflare is the account that matters most: losing it loses the website **and**
the charity's email at the same time. Vercel could be replaced in an afternoon.

**Do not change the MX, SPF, DKIM or DMARC records.** They are the charity's
email. Nothing in this handover requires touching them: moving the Vercel project
does not change DNS, because Vercel does not host this domain's DNS. If Vercel
asks you to verify the domain it will ask for a **TXT** record, which is unrelated
to MX and safe to add.

### Transfer checklist

1. MDF creates a **GitHub organisation** and a **Vercel account**, and adds the
   current owner to both so the transfers are possible.
2. GitHub: **Settings → General → Transfer ownership** to the MDF organisation.
   Branches, pull requests and history all move, and the old links redirect.
3. Vercel: **Project → Settings → General → Transfer project** to MDF's account.
   Afterwards check that muftdevelopmentfoundation.org.uk still loads; if Vercel
   asks for domain verification, add the TXT record it names in Cloudflare.
4. Cloudflare and the registrar: see "Moving the DNS" below — it is the one step
   that can take the charity's email down, so it is not a one-liner.
5. Set up the GitHub OAuth App and the two environment variables (next section).
6. Turn on two-factor authentication for the GitHub organisation and the Vercel
   account.
7. Remove the previous owner from GitHub, Vercel, Cloudflare and the registrar.

GitHub and Vercel have no "accept ownership" action: the current owner has to be
present to press Transfer. That is the only reason they appear in this list, and
it is a few minutes, not an ongoing role.

The editor's `repo:` setting does **not** need editing after the move. The build
takes it from the deployment, so it follows the repository automatically.

### Moving the DNS

The Cloudflare account that serves this domain holds **this domain and nothing
else**. That makes this the easy case, and none of the DNS records have to move:

1. Cloudflare → **Manage account → Members**: invite an MDF address as **Super
   Administrator**. (Changing the account's email to an MDF address works too.)
2. MDF accept, confirm they can see the domain and its DNS records.
3. Remove the previous owner from the members list.

Nothing in DNS changes, the nameservers stay as they are, and there is no window
in which the website or the email can break.

**If another domain is ever added to that Cloudflare account, this stops being
true** — inviting someone would then hand them that domain as well. In that case
export the zone file, import it into a separate Cloudflare account, compare the MX,
SPF, DKIM and DMARC records line by line against the export, and only then change
the nameservers at the registrar.

The registrar account moves separately, by whatever process that registrar uses.
Before starting, confirm who holds it — it is not necessarily the same person or
the same email as Cloudflare.

### Where the previous owner still appears

After step 7 the answer should be nowhere. Worth checking each of these, because
each one is a way back in that outlives a handover:

- GitHub: organisation members, and any personal access tokens or deploy keys.
- Vercel: team members.
- Cloudflare: account members, and API tokens.
- Registrar: account contacts.
- The GitHub OAuth App: it must live in the MDF organisation, not on a personal
  account, or sign-in to `/admin` depends on someone who has left.

---

## Making /admin work

The editor signs people in with their own GitHub account. That needs a GitHub
OAuth App and two environment variables. **Until these are set, /admin will load
but sign-in will fail.** Create the OAuth App inside the MDF organisation, so that
MDF owns it rather than an individual.

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

> **One trap, and it will bite you.** The editor commits straight to `main`. The
> moment you require pull requests from everyone, publishing a story starts
> failing. Do one of these two things at the same time, not neither:
>
> - add the organisation's admin role to the ruleset's **Bypass list**, so
>   trustees keep publishing in one click; or
> - change `publish_mode: simple` to `publish_mode: editorial_workflow` in
>   `public/admin/config.yml`, so every story arrives as a pull request for
>   someone to approve before it goes live.

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
  list, so the two can never disagree. It also fails the build, by name, if two
  stories would publish at the same URL, and rewrites the editor's `repo:` to
  whichever repository the deployment was built from.
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
`public/admin/config.yml` are ours and are never overwritten. Note the package
name: `decap-cms` is the browser build and is the one we want; `decap-cms-app` is
the one for bundlers and fails when loaded directly from a script tag.

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

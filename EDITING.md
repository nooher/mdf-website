# Editing the MDF website

News and events are edited at **https://muftdevelopmentfoundation.org.uk/admin**.
You need a GitHub account that has been given access to the website's repository.

## Signing in

1. Open the admin page and click **Sign In with GitHub**.
2. The first time, GitHub asks you to approve access. Click **Authorize**.

## Adding an event

1. **Events → New Event**.
2. Fill in the name, start and end time, venue and a short summary. The summary
   is what people see on WhatsApp or Facebook when the link is shared.
3. **Registration form link**: paste the link to the Google Form. Before pasting,
   check that the form opens for someone who is not signed in (try it in a
   private window) and that it is owned by the charity's Google account.
4. Add the poster if there is one. Large photos are shrunk automatically.
5. Click **Save**.

The site rebuilds and the event is live in a minute or two. It appears on the
Events page and on the home page. When the event ends, registration closes and the
event moves to "Past events" by itself.

## Adding news

**News → New News post**, fill it in and **Save**. The newest post shows first.
Use **Button link** to send readers to a form or a page, for example an event.

## Before you publish

- Only describe things that have actually happened. No fundraising totals,
  numbers of people helped, or results we cannot evidence.
- Never mention Gift Aid or any tax relief. MDF is registered with the Charity
  Commission but is not recognised by HMRC for tax purposes.
- Do not publish photographs of children without written consent from a parent
  or guardian.
- Bank details are not edited here and must never be changed because of an email.

## If something goes wrong

- A mistake: open the entry, correct it and save again.
- The site has not changed after five minutes: the build may have failed. Ask
  whoever looks after the technical side to check the Vercel deployments.

## Technical notes

- Entries are Markdown files in `content/events/` and `content/news/`. Uploads go
  to `public/uploads/`. Saving in the admin commits to `main`, and Vercel deploys it.
- The admin is Sveltia CMS, pinned in `public/admin/index.html`. Its settings are in
  `public/admin/config.yml`. The build points it at whichever repository it was
  built from, so moving the repository needs no edit.
- Sign-in uses `api/auth.js` and `api/callback.js`. They need a GitHub OAuth App
  whose callback URL is `https://muftdevelopmentfoundation.org.uk/api/callback`,
  with `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` set in the Vercel project.
- Editors need **Write** access to the repository. Keep the repository public, or
  Vercel's free plan may refuse to deploy commits made by editors.

# Deploy the Sovereign Classroom — step-by-step

The app is built, tested, and git-committed. You just need to (1) create a GitHub repo and push, then (2) click "Import" on Vercel. This takes about 3 minutes.

---

## Step 1 — Put this on GitHub

### Option A — with the GitHub CLI (fastest)

Open a terminal on your Mac/PC, `cd` into this folder, then:

```bash
gh auth login           # once, if you've never used gh
gh repo create sovereign-classroom --public --source=. --remote=origin --push
```

That's it — the repo is live at https://github.com/rohanjowallah/sovereign-classroom.

### Option B — without the CLI

1. Go to <https://github.com/new>
2. Repository name: **sovereign-classroom** · Visibility: **Public** · Do **not** add README/license/.gitignore (we already have them).
3. Click "Create repository".
4. Copy the commands GitHub shows you under *"…or push an existing repository from the command line"*. They'll look like:

```bash
git remote add origin https://github.com/rohanjowallah/sovereign-classroom.git
git branch -M main
git push -u origin main
```

Run them from this folder.

---

## Step 2 — Deploy on Vercel

1. Go to <https://vercel.com/new>.
2. Click **Import** next to your new `sovereign-classroom` repo.
3. Vercel auto-detects Next.js. **Leave every setting on defaults.**
4. Click **Deploy**.

Your live URL will be ready in ~60 seconds — typically `https://sovereign-classroom.vercel.app`.

### Re-deploys are automatic

After this, every `git push` to `main` redeploys production. For a quick content tweak:

```bash
# edit a page, e.g. app/acre/page.tsx
git add -A && git commit -m "tweak ACRE prompts" && git push
```

Vercel will redeploy within a minute.

---

## Optional — local preview before pushing

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

## What's deployed

Eight pages, all static, ~90KB first-load JS:

| Route | Purpose |
|---|---|
| `/` | Landing — hero, framework grid, invitation |
| `/about` | Argument, traps, principles, attribution |
| `/salf` | SALF policy check (5 questions, scored reading) |
| `/care` | CARE thinking diagnostic (AI-replaceability reading) |
| `/craft` | CRAFT assessment designer (5-step wizard) |
| `/acre` | ACRE equity audit (with redesign suggestions) |

No login, no database, no API keys, no tracking. Every session lives in the user's browser and is cleared on reload. Ready to hand to a department.

---

*Lead from here. Lead from who you are. Lead from what you know.*

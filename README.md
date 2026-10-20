# lucietherapy.com

The website for Lucie Ramet's practice.

The text of the site lives in the `content/` folder as ordinary text files.
When you change one and save it to GitHub, the website rebuilds and updates
itself within a couple of minutes. You never edit HTML.

---

# Part 1 — Writing and editing

*No technical knowledge needed for this part.*

## Where the text lives

```
content/
  site.yaml          fees, address, opening days, professional memberships
  en/                everything in English
    home/            the three blocks of text on the homepage
    pages/           the main pages (Brighton, online therapy, supervision)
    blog/            the articles
  fr/                everything in French — same structure
```

Each article is one file. The file
`content/en/blog/understanding-anxiety.md` becomes the page
`lucietherapy.com/blog/understanding-anxiety/`.

## Adding a new article

**Yes — you just add one new file.** Nothing else needs changing. The article
then appears automatically on the homepage, in the article list, in the
"related articles" boxes, and in the sitemap that Google reads.

The easiest way, with no software to install:

1. Go to the repository on **github.com**.
2. Open the folder `content`, then `en`, then `blog`.
3. Click **Add file → Create new file** (button near the top right).
4. In the filename box, type a name ending in `.md` — for example
   `therapy-for-teenagers.md`.
   *Lowercase letters, no accents, hyphens instead of spaces.*
5. Paste the template below into the big box and fill it in.
6. Scroll down and click **Commit changes**.

Wait two or three minutes, then reload the site. Your article is live.

### The template to paste

```markdown
---
key: "therapy-for-teenagers"
slug: "therapy-for-teenagers"
title: "Therapy for Teenagers"
meta_title: "Therapy for Teenagers in Brighton and Online"
description: "How therapy helps adolescents from 16 with anxiety, school pressure and low mood, in person in Hove or online."
keywords:
  - "therapy for teenagers"
  - "adolescent therapy Brighton"
image: "blog_anxiety.jpg"
date: "2026-09-15"
---

Write your article here, in normal sentences.

Leave a blank line between paragraphs, like this.

### This is a heading inside the article

Put two stars around words to make them **bold**.

- This is a bullet point
- And another one
```

Everything between the two `---` lines is information *about* the article.
Everything below the second `---` is the article itself.

### What each line means

| Line | What to put |
|---|---|
| `key` | A short nickname for the article. Only matters if you also write a French version — see below. |
| `slug` | The web address. `therapy-for-teenagers` gives `lucietherapy.com/blog/therapy-for-teenagers/`. Lowercase, no accents, hyphens for spaces. |
| `title` | The title shown at the top of the page. Normal punctuation is fine here. |
| `meta_title` | **The blue headline people see in Google.** Aim for about 60 characters. |
| `description` | **The grey summary underneath it in Google.** Aim for about 155 characters. |
| `keywords` | A few phrases someone might type into Google to find this. |
| `image` | The picture at the top. Must name a file in the `media` folder — see below. |
| `date` | The date, written year-month-day. Use `""` if you would rather not show one. |

`meta_title` and `description` never appear on the page itself. They are only
what Google shows in its search results — so write them as an invitation to
click, not as a summary for someone already reading.

### Writing the text

You only need four things:

| To get this | Type this |
|---|---|
| **bold text** | `**bold text**` |
| A heading | `### My heading` |
| A bullet list | `- one`, then `- two` on the next line |
| A link | `[the words to show](/cbt-supervision/)` |

Leave a blank line between paragraphs. That is the whole system.

### Writing the French version too

This is optional. An English-only or French-only article works perfectly well.

If you do want both, create the French file in `content/fr/blog/` and give it
**exactly the same `key`** as the English one. That is what tells Google the
two are translations of each other rather than duplicate pages, and it is what
makes the FR/EN buttons switch between them.

The `slug` should be different and in French — for example
`therapie-pour-adolescents`.

## Adding a picture

Put the image file in the `media` folder (**Add file → Upload files** on
GitHub), then write its filename on the `image:` line.

Don't worry about the file size. If it is a big photo straight from a phone or
camera, the site shrinks it automatically when publishing. Your original stays
untouched.

## Changing a fee, the address, or the opening days

Open `content/site.yaml`. It is a list of settings with explanations next to
each one. Change the value between the quote marks and save.

Changing the fee in that one file updates it on the page **and** in the
information Google reads about the practice, so the two cannot drift apart.

## Editing an existing article

Open the file, click the pencil icon, change the text, click **Commit
changes**.

One caution: **avoid changing the `slug` of an article that has been online for
a while.** The slug is its web address, and changing it means Google has to
start over with that page, losing whatever position it had built up. Changing
the `title` or the text itself is completely safe.

## If something looks wrong

Nothing you type in these files can break the website permanently — the
previous version stays online until the problem is fixed. The usual slips are:

- A missing `"` quote mark on one of the lines at the top
- A missing `---` line
- An `image:` naming a file that is not in the `media` folder

---

# Part 2 — Technical reference

*For whoever maintains the code.*

## How it works

`build.py` reads `content/` (YAML + Markdown) and `templates/` (Jinja2) and
writes a complete static site to `_site/`. GitHub Actions runs it on every push
to `main` and publishes the result to GitHub Pages.

`_site/` is never committed — it is regenerated from source each time.

## Building locally

```bash
pip install -r requirements.txt
```

```bash
python build.py --serve
```

Builds the site and serves it at http://localhost:8000. Re-run after each edit.

Build without serving:

```bash
python build.py
```

Verify every internal link, anchor and image resolves:

```bash
python check_links.py
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: install
dependencies, run `build.py`, run `check_links.py`, publish `_site/` to Pages.
A broken internal link fails the build and blocks the deploy.

> **One-time setting:** the repository's Pages source must be set to
> **GitHub Actions** (Settings → Pages → Build and deployment → Source).
> With the older "Deploy from a branch" setting the workflow runs but nothing
> is published, because the generated site is never committed to the branch.

## What the generator produces

| | |
|---|---|
| Pages | 26 — English at `/`, French under `/fr/` |
| Per page | unique `<title>`, meta description, canonical URL, Open Graph and Twitter cards |
| Structured data | JSON-LD: `Person`, `Psychologist` (address, geo, opening hours), `Article`, `Service`, `BreadcrumbList` |
| Multilingual | reciprocal `hreflang` pairs plus `x-default`, in both the `<head>` and the sitemap |
| Images | anything over 250KB is downscaled to WebP; sources in `media/` are never modified, and oversized originals are not shipped |
| Also generated | `sitemap.xml`, `robots.txt`, `404.html` |

All text is present in the HTML source. The site is fully readable and
navigable with JavaScript disabled; `script.js` only handles the scroll-spy
highlight and the two inquiry dialogs.

Legacy `/?post=<id>&lang=<xx>` links from the previous version of the site are
redirected to their new addresses by a small inline script on the homepage.

## Files

| Path | Purpose |
|---|---|
| `build.py` | the generator |
| `check_links.py` | internal link and asset checker |
| `content/` | all editable content |
| `templates/` | Jinja2 page templates |
| `style.css` | hand-written stylesheet; image URLs rewritten at build time |
| `script.js` | progressive enhancement only |
| `media/` | image sources |
| `_site/` | build output (git-ignored) |

## Adding a new landing page

Landing pages live in `content/<lang>/pages/` and take the same front matter as
articles, plus two extra fields:

- `nav: true` — include it in the sidebar and footer navigation
- `cta: "therapy"` or `cta: "supervision"` — which inquiry form its button opens

Navigation order is set by `nav_order` in `build.py`.

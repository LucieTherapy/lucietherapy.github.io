# lucietherapy.com

The website for Lucie Ramet's practice.

All the text of the site, in English and French, lives in one file:
[`content.js`](content.js). When you change it and save it to GitHub, the
website rebuilds and updates itself within a couple of minutes. You never edit
HTML.

---

# Part 1 — Writing and editing

## How `content.js` is organised

The file follows the order of the homepage: settings, the intro next to the
photo, "Where to find me", services and fees, "About Me", then the button and
form labels, and finally the articles. Every piece of text has its English and
French version next to each other:

```js
title: { en: "Where to find me", fr: "Où me trouver" },
```

Longer text goes between backticks and can span several lines:

```js
text: {
  en: `
    First paragraph, with a word in **bold**.

    ### A heading

    - A bullet point
    - Another one
  `,
  fr: `
    Premier paragraphe...
  `,
},
```

Inside backticks you can use:

| To get this | Type this |
|---|---|
| **bold text** | `**bold text**` |
| A heading | `### My heading` |
| A bullet list | `- one`, then `- two` on the next line |
| A link | `[the words to show](/blog/understanding-anxiety/)` |

Leave an empty line between paragraphs.

Three rules keep the file readable by the website:

- Short text goes between `"double quotes"`. To put a quote mark inside, write `\"`.
- Every item ends with a comma.
- Lines starting with `//` are notes for you; the website ignores them.

If you break one of these, the website keeps showing the previous version, and
the build log on GitHub (the **Actions** tab) says which line to fix.

## Editing on GitHub

1. Open [`content.js`](content.js) on github.com.
2. Click the pencil icon.
3. Make your change.
4. Click **Commit changes**.

Wait two or three minutes, then reload the site.

## Adding an article

Articles are at the end of the file, in the order they appear on the site.
Copy a whole article block, from its `{` to its `},`, paste it where the new
article should appear, and change it:

| Field | What to put |
|---|---|
| `id` | A unique name for the article. Don't change it once the article is online. |
| `image` | The picture at the top: a file in the `media` folder. |
| `date` | `"2026-09-15"` (year-month-day), or `""` to show no date. |
| `slug` | The web address: `therapy-for-teenagers` gives `lucietherapy.com/blog/therapy-for-teenagers/`. Lowercase, no accents, hyphens for spaces. Different for each language. Don't change it once the article is online. |
| `title` | The title shown on the page. |
| `seo.title` | **The blue headline people see in Google.** About 60 characters. |
| `seo.description` | **The grey summary under it in Google.** About 155 characters. |
| `seo.keywords` | A few phrases someone might type into Google to find it. |
| `text` | The article itself. |

To publish an article in one language only, leave the other language out of
its `text`.

A new article automatically appears on the homepage, on the blog page, and in
the sitemap Google reads. To link a service card to it, put its `id` in the
card's `article` field.

## Adding a picture

Put the image file in the `media` folder (**Add file → Upload files** on
GitHub), then write its filename where it is used, e.g. `image: "my-photo.jpg"`.

Don't worry about the file size: big photos are shrunk automatically when the
site is published. Your original stays untouched.

---

# Part 2 — Technical reference

## How it works

`build.py` reads `content.js` and `templates/` (Jinja2) and writes a complete
static site to `_site/`. GitHub Actions runs it on every push to `main` and
publishes the result to GitHub Pages. `_site/` is never committed.

`content.js` is read by a small parser in `build.py`, so no JavaScript engine
is needed. It accepts objects, arrays, `"…"`, `'…'` and `` `…` `` strings,
numbers, booleans, comments and trailing commas. Backtick text is dedented and
trimmed, then rendered as Markdown where the templates expect it (the intro,
education, experience and article texts). Any object whose keys are only
`en`/`fr` is resolved to the page's language, falling back to the other
language if one is missing.

## Building locally

```bash
pip install -r requirements.txt
```

```bash
python build.py --serve
```

That builds the site and serves it at http://localhost:8000. Re-run it after
each edit. To check that every internal link, anchor and image resolves:

```bash
python check_links.py
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: install
dependencies, run `build.py`, run `check_links.py`, publish `_site/` to Pages.
A mistake in `content.js` or a broken internal link fails the build and blocks
the deploy, so the live site stays as it was.

> **One-time setting:** the repository's Pages source must be set to
> **GitHub Actions** (Settings → Pages → Build and deployment → Source).

## What the generator produces

| | |
|---|---|
| Pages | homepage, blog page and one page per article, in English at `/` and French under `/fr/` |
| Per page | unique `<title>`, meta description, canonical URL, Open Graph and Twitter cards |
| Structured data | JSON-LD: `Person`, `Psychologist` (address, geo), `Article`, `BreadcrumbList` |
| Multilingual | reciprocal `hreflang` pairs plus `x-default`, in both the `<head>` and the sitemap |
| Images | anything over 250KB is downscaled to WebP; sources in `media/` are never modified |
| Also generated | `sitemap.xml`, `robots.txt`, `404.html` |

All text is in the HTML source, so the site is readable without JavaScript;
`script.js` only handles the mobile menu, the scroll-spy highlight and the two
inquiry dialogs. Legacy `/?post=<id>&lang=<xx>` links from the previous version
of the site are redirected to their new addresses by a small inline script on
the homepage.

## Files

| Path | Purpose |
|---|---|
| `content.js` | all the text, English and French |
| `build.py` | the generator |
| `check_links.py` | internal link and asset checker |
| `templates/` | Jinja2 page templates |
| `style.css` | stylesheet; image URLs rewritten at build time |
| `script.js` | progressive enhancement only |
| `media/` | images |
| `_site/` | build output (git-ignored) |

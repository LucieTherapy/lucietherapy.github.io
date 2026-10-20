#!/usr/bin/env python3
"""Static site generator for lucietherapy.com.

Reads content/ (YAML + Markdown) and templates/, writes a complete static
site to _site/ with one real URL per page per language, full metadata,
hreflang pairing, JSON-LD structured data, a sitemap, and size-optimised
images.

    python build.py            # build into _site/
    python build.py --serve    # build, then serve on http://localhost:8000

Content layout:
    content/site.yaml              structured data, labels, SEO defaults
    content/<lang>/home/*.md       homepage prose blocks
    content/<lang>/pages/*.md      standalone landing pages
    content/<lang>/blog/*.md       articles
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from datetime import date, datetime, timezone
from pathlib import Path

try:
    import markdown
    import yaml
    from jinja2 import Environment, FileSystemLoader, StrictUndefined
except ImportError as exc:  # pragma: no cover
    sys.exit(f"Missing dependency: {exc.name}. Run: pip install -r requirements.txt")

try:
    from PIL import Image
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parent
CONTENT = ROOT / "content"
TEMPLATES = ROOT / "templates"
OUT = ROOT / "_site"

# Static files copied verbatim to the site root
STATIC_FILES = ["style.css", "script.js", "CNAME"]

# Images larger than this are re-encoded on the way into _site/.
# Sources in media/ are never modified.
IMG_MAX_BYTES = 250_000
IMG_MAX_WIDTH = 1600
IMG_QUALITY = 82

MD = markdown.Markdown(extensions=["extra", "smarty"], output_format="html5")


# =========================================================================
#  Model
# =========================================================================
@dataclass
class Doc:
    """A single rendered document (home, landing page, or article)."""

    lang: str
    kind: str  # "home" | "page" | "post" | "blog_index"
    key: str  # stable identifier, shared across languages for hreflang
    slug: str
    url: str  # site-absolute, with leading and trailing slash
    title: str
    meta_title: str
    description: str
    keywords: list[str] = field(default_factory=list)
    image: str = ""
    date: str = ""
    body: str = ""
    cta: str = ""
    nav: bool = False
    source: Path | None = None


def parse_front_matter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    meta = yaml.safe_load(text[3:end]) or {}
    body = text[end + 4 :].lstrip("\n")
    return meta, body


def render_markdown(text: str) -> str:
    MD.reset()
    return MD.convert(text)


# =========================================================================
#  Loading
# =========================================================================
def load_site() -> dict:
    return yaml.safe_load((CONTENT / "site.yaml").read_text(encoding="utf-8"))


def lang_prefix(site: dict, lang: str) -> str:
    """'' for the default language, '/fr' otherwise."""
    return "" if lang == site["site"]["default_lang"] else f"/{lang}"


def load_docs(site: dict) -> list[Doc]:
    docs: list[Doc] = []
    langs = site["site"]["langs"]

    for lang in langs:
        pre = lang_prefix(site, lang)
        meta = site["home_meta"][lang]

        # ---- homepage ----
        home_dir = CONTENT / lang / "home"
        blocks = {}
        for block in ("summary", "education", "experience"):
            f = home_dir / f"{block}.md"
            blocks[block] = render_markdown(f.read_text(encoding="utf-8")) if f.exists() else ""
        home = Doc(
            lang=lang,
            kind="home",
            key="home",
            slug="",
            url=f"{pre}/",
            title=site["person"]["name"],
            meta_title=meta["meta_title"],
            description=meta["description"],
            keywords=meta.get("keywords", []),
            image=site["person"]["image"],
        )
        home.blocks = blocks  # type: ignore[attr-defined]
        docs.append(home)

        # ---- landing pages ----
        for f in sorted((CONTENT / lang / "pages").glob("*.md")):
            fm, body = parse_front_matter(f)
            docs.append(
                Doc(
                    lang=lang,
                    kind="page",
                    key=fm["key"],
                    slug=fm["slug"],
                    url=f"{pre}/{fm['slug']}/",
                    title=fm["title"],
                    meta_title=fm.get("meta_title", fm["title"]),
                    description=fm.get("description", ""),
                    keywords=fm.get("keywords", []),
                    image=fm.get("image", ""),
                    body=render_markdown(body),
                    cta=fm.get("cta", "therapy"),
                    nav=bool(fm.get("nav")),
                    source=f,
                )
            )

        # ---- articles ----
        for f in sorted((CONTENT / lang / "blog").glob("*.md")):
            fm, body = parse_front_matter(f)
            docs.append(
                Doc(
                    lang=lang,
                    kind="post",
                    key=fm["key"],
                    slug=fm["slug"],
                    url=f"{pre}/blog/{fm['slug']}/",
                    title=fm["title"],
                    meta_title=fm.get("meta_title", fm["title"]),
                    description=fm.get("description", ""),
                    keywords=fm.get("keywords", []),
                    image=fm.get("image", ""),
                    date=str(fm.get("date") or ""),
                    body=render_markdown(body),
                    source=f,
                )
            )

        # ---- article index ----
        docs.append(
            Doc(
                lang=lang,
                kind="blog_index",
                key="blog_index",
                slug="blog",
                url=f"{pre}/blog/",
                title={"en": "Articles", "fr": "Articles"}[lang],
                meta_title={
                    "en": "Articles on CBT, ACT, Anxiety and Therapy",
                    "fr": "Articles sur la TCC, l'ACT, l'anxiété et la thérapie",
                }[lang],
                description={
                    "en": "Articles by a chartered psychologist on cognitive behavioural therapy, "
                    "acceptance and commitment therapy, anxiety, mindfulness, online therapy, "
                    "life abroad and clinical supervision.",
                    "fr": "Articles d'une psychologue clinicienne sur la thérapie cognitivo-comportementale, "
                    "l'ACT, l'anxiété, la pleine conscience, la thérapie en ligne, "
                    "l'expatriation et la supervision clinique.",
                }[lang],
            )
        )

    return docs


# =========================================================================
#  Structured data
# =========================================================================
def practice_schema(site: dict, lang: str) -> dict:
    p = site["practice"]
    a = p["address"]
    base = site["site"]["url"]
    hours = [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [f"https://schema.org/{d}" for d in h["days"]],
            "opens": h["opens"],
            "closes": h["closes"],
        }
        for h in p.get("opening_hours", [])
    ]
    return {
        "@type": ["Psychologist", "ProfessionalService"],
        "@id": f"{base}/#practice",
        "name": f"{site['person']['display_name']} — {p['location_name']}",
        "description": p["online_desc"][lang],
        "image": f"{base}/{site['person']['image']}",
        "url": base + "/",
        "email": site["person"]["email"],
        "priceRange": "££",
        "currenciesAccepted": "GBP, EUR",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": a["street"],
            "addressLocality": a["locality"],
            "postalCode": a["postcode"],
            "addressRegion": a["region"],
            "addressCountry": a["country_code"],
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": p["geo"]["lat"],
            "longitude": p["geo"]["lng"],
        },
        "openingHoursSpecification": hours,
        "areaServed": [
            {"@type": "City", "name": "Brighton"},
            {"@type": "City", "name": "Hove"},
            {"@type": "AdministrativeArea", "name": "East Sussex"},
        ],
        "availableLanguage": [
            {"@type": "Language", "name": "English"},
            {"@type": "Language", "name": "French"},
        ],
        "provider": {"@id": f"{base}/#person"},
    }


def person_schema(site: dict, lang: str) -> dict:
    base = site["site"]["url"]
    creds = [
        {
            "@type": "EducationalOccupationalCredential",
            "name": f"{a['role'][lang]} — {a['org'][lang]}",
        }
        for a in site["affiliations"]["list"]
    ]
    return {
        "@type": "Person",
        "@id": f"{base}/#person",
        "name": site["person"]["display_name"],
        "jobTitle": site["person"]["job_title"][lang],
        "image": f"{base}/{site['person']['image']}",
        "email": site["person"]["email"],
        "url": base + lang_prefix(site, lang) + "/",
        "sameAs": site["person"]["social"],
        "knowsLanguage": ["en", "fr"],
        "alumniOf": {"@type": "CollegeOrUniversity", "name": "Université Paris Cité"},
        "hasCredential": creds,
        "memberOf": [
            {"@type": "Organization", "name": a["org"][lang]}
            for a in site["affiliations"]["list"]
        ],
        "worksFor": {"@id": f"{base}/#practice"},
    }


def build_jsonld(site: dict, doc: Doc) -> str:
    base = site["site"]["url"]
    graph: list[dict] = []

    if doc.kind == "home":
        graph.append(
            {
                "@type": "WebSite",
                "@id": f"{base}/#website",
                "url": base + "/",
                "name": site["person"]["display_name"],
                "inLanguage": doc.lang,
                "publisher": {"@id": f"{base}/#person"},
            }
        )
        graph.append(person_schema(site, doc.lang))
        graph.append(practice_schema(site, doc.lang))

    elif doc.kind == "post":
        article = {
            "@type": "Article",
            "@id": f"{base}{doc.url}#article",
            "headline": doc.title,
            "description": doc.description,
            "inLanguage": doc.lang,
            "mainEntityOfPage": f"{base}{doc.url}",
            "author": {"@id": f"{base}/#person"},
            "publisher": {"@id": f"{base}/#person"},
            "isAccessibleForFree": True,
        }
        if doc.image:
            article["image"] = f"{base}/media/{doc.image}"
        if doc.date:
            article["datePublished"] = doc.date
        graph.append(article)
        graph.append(person_schema(site, doc.lang))

    else:  # page, blog_index
        graph.append(
            {
                "@type": "WebPage",
                "@id": f"{base}{doc.url}#webpage",
                "url": f"{base}{doc.url}",
                "name": doc.meta_title,
                "description": doc.description,
                "inLanguage": doc.lang,
                "about": {"@id": f"{base}/#person"},
            }
        )
        if doc.kind == "page" and doc.key in ("brighton", "online-fr"):
            graph.append(practice_schema(site, doc.lang))
        if doc.kind == "page" and doc.key == "supervision":
            graph.append(
                {
                    "@type": "Service",
                    "@id": f"{base}{doc.url}#service",
                    "name": doc.title,
                    "description": doc.description,
                    "serviceType": "Clinical supervision",
                    "provider": {"@id": f"{base}/#person"},
                    "availableChannel": {
                        "@type": "ServiceChannel",
                        "serviceUrl": f"{base}{doc.url}",
                    },
                }
            )
        graph.append(person_schema(site, doc.lang))

    # Breadcrumbs for everything but the homepage
    if doc.kind != "home":
        home_url = base + lang_prefix(site, doc.lang) + "/"
        items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": home_url}]
        if doc.kind == "post":
            items.append(
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Articles",
                    "item": f"{base}{lang_prefix(site, doc.lang)}/blog/",
                }
            )
        items.append(
            {"@type": "ListItem", "position": len(items) + 1, "name": doc.title}
        )
        graph.append({"@type": "BreadcrumbList", "itemListElement": items})

    return json.dumps(
        {"@context": "https://schema.org", "@graph": graph},
        ensure_ascii=False,
        separators=(",", ":"),
    )


# =========================================================================
#  Output directory
# =========================================================================
def clean_output(attempts: int = 5) -> None:
    """Empty _site/, tolerating transient Windows file locks.

    This repository lives inside a Dropbox folder, whose indexer briefly
    holds handles on freshly written files; a plain rmtree fails with
    WinError 32 often enough to be worth retrying.
    """
    import time

    for i in range(attempts):
        if not OUT.exists():
            break
        try:
            shutil.rmtree(OUT)
            break
        except (PermissionError, OSError) as exc:
            if i == attempts - 1:
                sys.exit(
                    f"Could not clear {OUT}: {exc}\n"
                    "Close anything browsing that folder (or pause Dropbox syncing) "
                    "and try again."
                )
            time.sleep(0.4 * (i + 1))
    OUT.mkdir(parents=True, exist_ok=True)


# =========================================================================
#  Template helpers
# =========================================================================
MONTHS = {
    "en": ["January", "February", "March", "April", "May", "June", "July",
           "August", "September", "October", "November", "December"],
    "fr": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
           "août", "septembre", "octobre", "novembre", "décembre"],
}


def pretty_date(iso: str, lang: str) -> str:
    """Render an ISO date for humans; fall back to the raw string if malformed.

    Month names are hardcoded rather than taken from strftime, whose output
    depends on the machine locale and would differ between a local build and CI.
    """
    try:
        y, m, d = (int(part) for part in iso.split("-"))
        month = MONTHS[lang][m - 1]
    except (ValueError, IndexError, KeyError):
        return iso
    return f"{d} {month} {y}"


def home_url_for(site: dict, lang: str) -> str:
    return lang_prefix(site, lang) + "/"


def map_arrows(site: dict) -> list[str]:
    """Quadratic-bezier `d` attributes joining consecutive timeline pins.

    Previously computed in the browser; precomputing keeps the map visible
    without JavaScript.
    """
    tl = site["timeline"]
    out = []
    for a, b in zip(tl, tl[1:]):
        x1, y1, x2, y2 = a["left"], a["top"], b["left"], b["top"]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        dist = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        cy = my - dist * 0.3
        out.append(f"M {x1} {y1} Q {mx} {cy:.2f} {x2} {y2}")
    return out


def legacy_json(site: dict, docs: list[Doc]) -> str:
    """Map old ?post=<id> identifiers to their new URLs, per language.

    The pre-rebuild site addressed articles as `/?post=<id>&lang=<lang>`.
    Those URLs still resolve to the homepage, so the redirect has to happen
    client-side there.
    """
    out: dict[str, dict[str, str]] = {}
    for d in docs:
        if d.kind == "post":
            out.setdefault(d.key, {})[d.lang] = d.url
    return json.dumps(out, ensure_ascii=False, separators=(",", ":"))


# =========================================================================
#  Images
# =========================================================================
def image_dimensions(path: Path) -> tuple[int, int] | None:
    if Image is None or not path.exists():
        return None
    try:
        with Image.open(path) as im:
            return im.size
    except Exception:
        return None


def copy_media(report: list[str]) -> tuple[dict[str, tuple[int, int]], dict[str, str]]:
    """Copy media/ into _site/, replacing large images with optimised versions.

    Sources in media/ are never modified. For any raster image over
    IMG_MAX_BYTES a downscaled WebP is written and becomes the served version;
    the oversized original is then left out of the build, so the deployed site
    carries one copy of each image rather than two. Everything else is copied
    through untouched.

    Returns ({served_filename: (w, h)}, {original_filename: served_filename}).
    """
    src_dir = ROOT / "media"
    dst_dir = OUT / "media"
    dst_dir.mkdir(parents=True, exist_ok=True)
    dims: dict[str, tuple[int, int]] = {}
    served: dict[str, str] = {}
    saved = 0

    for src in sorted(src_dir.iterdir()):
        if not src.is_file():
            continue
        served[src.name] = src.name
        size = src.stat().st_size
        is_raster = src.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp")

        if Image is not None and is_raster and size > IMG_MAX_BYTES:
            # Keep the full source name: two files can share a stem
            # (foo.png / foo.webp) and must not derive the same output.
            alt_name = src.name + ".min.webp"
            alt = dst_dir / alt_name
            try:
                with Image.open(src) as im:
                    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
                    if im.width > IMG_MAX_WIDTH:
                        ratio = IMG_MAX_WIDTH / im.width
                        im = im.resize(
                            (IMG_MAX_WIDTH, round(im.height * ratio)), Image.LANCZOS
                        )
                    im.save(alt, "WEBP", quality=IMG_QUALITY, method=6)
                new = alt.stat().st_size
                if new < size * 0.9:
                    served[src.name] = alt_name
                    saved += size - new
                    report.append(
                        f"    {src.name}: {size // 1024}KB -> {alt_name} {new // 1024}KB"
                    )
                else:
                    alt.unlink()
            except Exception as exc:
                report.append(f"    ! {src.name}: {exc}; served as-is")
                if alt.exists():
                    alt.unlink()

        # Only ship the original when nothing replaced it
        if served[src.name] == src.name:
            shutil.copy2(src, dst_dir / src.name)

        d = image_dimensions(dst_dir / served[src.name])
        if d:
            dims[served[src.name]] = d

    if saved:
        report.insert(0, f"  images: {saved // 1024}KB saved; oversized originals not shipped")
    return dims, served


def copy_static(served: dict[str, str], report: list[str]) -> None:
    """Copy the root-level static files into _site/.

    style.css is rewritten as it goes: any url(media/...) pointing at an image
    that copy_media replaced is repointed at the optimised version, since the
    oversized original is no longer shipped.
    """
    pattern = re.compile(r"""url\((["']?)((?:\.{0,2}/)?media/[^"')]+)\1\)""")

    for name in STATIC_FILES:
        src = ROOT / name
        if not src.exists():
            continue
        if src.suffix != ".css":
            shutil.copy2(src, OUT / name)
            continue

        swapped: list[str] = []

        def repoint(m: re.Match) -> str:
            quote, path = m.group(1), m.group(2)
            filename = path.rsplit("/", 1)[-1]
            target = served.get(filename)
            if target and target != filename:
                swapped.append(f"{filename} -> {target}")
                return f"url({quote}/media/{target}{quote})"
            return m.group(0)

        (OUT / name).write_text(
            pattern.sub(repoint, src.read_text(encoding="utf-8")), encoding="utf-8"
        )
        for line in swapped:
            report.append(f"    {name}: {line}")


# =========================================================================
#  Build
# =========================================================================
def build(serve: bool = False) -> None:
    site = load_site()
    docs = load_docs(site)
    base = site["site"]["url"]
    default_lang = site["site"]["default_lang"]

    clean_output()

    report: list[str] = []
    dims, served = copy_media(report)

    copy_static(served, report)

    # ---- cross-language URL map for hreflang and the language switch ----
    alt_map: dict[str, dict[str, str]] = {}
    for d in docs:
        alt_map.setdefault(d.key, {})[d.lang] = d.url

    by_lang_kind: dict[tuple[str, str], list[Doc]] = {}
    for d in docs:
        by_lang_kind.setdefault((d.lang, d.kind), []).append(d)

    env = Environment(
        loader=FileSystemLoader(TEMPLATES),
        autoescape=True,
        undefined=StrictUndefined,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    def img_src(filename: str) -> str:
        """URL of the best available version of a media file."""
        return "/media/" + served.get(filename, filename)

    def img_attrs(filename: str) -> str:
        """Intrinsic width/height, so the browser reserves space (avoids CLS)."""
        d = dims.get(served.get(filename, filename))
        return f' width="{d[0]}" height="{d[1]}"' if d else ""

    env.globals["pretty_date"] = pretty_date
    env.globals["img_src"] = img_src
    env.globals["img_attrs"] = img_attrs

    built = 0
    for doc in docs:
        alternates = alt_map.get(doc.key, {})
        posts = sorted(
            by_lang_kind.get((doc.lang, "post"), []), key=lambda d: d.title
        )
        pages = [
            p for p in by_lang_kind.get((doc.lang, "page"), []) if p.nav
        ]
        # Stable nav order regardless of filename
        nav_order = {"brighton": 0, "online-fr": 1, "supervision": 2}
        pages.sort(key=lambda p: nav_order.get(p.key, 99))

        if doc.kind in ("post", "page"):
            related = [p for p in posts if p.key != doc.key][:3]
        else:
            related = []

        # key -> URL lookups scoped to this document's language
        lang_urls = {
            d.key: d.url for d in docs if d.lang == doc.lang and d.kind in ("page", "post")
        }

        ctx = {
            "page_url": lambda k: lang_urls.get(k, home_url_for(site, doc.lang)),
            "post_url": lambda k: lang_urls.get(k),
            "map_arrows": map_arrows(site),
            "legacy_map": legacy_json(site, docs),
            "site": site,
            "s": {k: v[doc.lang] for k, v in site["strings"].items()},
            "lang": doc.lang,
            "other_langs": [l for l in site["site"]["langs"] if l != doc.lang],
            "doc": doc,
            "posts": posts,
            "nav_pages": pages,
            "related": related,
            "alternates": alternates,
            "canonical": base + doc.url,
            "base_url": base,
            "home_url": lang_prefix(site, doc.lang) + "/",
            "blog_url": lang_prefix(site, doc.lang) + "/blog/",
            "default_lang": default_lang,
            "jsonld": build_jsonld(site, doc),
            "practice": site["practice"],
            "fees": site["fees"],
            "year": date.today().year,
        }

        template = {
            "home": "home.html",
            "page": "page.html",
            "post": "post.html",
            "blog_index": "blog_index.html",
        }[doc.kind]

        html = env.get_template(template).render(**ctx)
        dest = OUT / doc.url.strip("/") / "index.html" if doc.url != "/" else OUT / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html, encoding="utf-8")
        built += 1

    # ---- sitemap ----
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    priority = {"home": "1.0", "page": "0.9", "post": "0.7", "blog_index": "0.6"}
    for doc in docs:
        lastmod = now
        if doc.source and doc.source.exists():
            lastmod = datetime.fromtimestamp(
                doc.source.stat().st_mtime, timezone.utc
            ).strftime("%Y-%m-%d")
        lines.append("  <url>")
        lines.append(f"    <loc>{base}{doc.url}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append(f"    <priority>{priority[doc.kind]}</priority>")
        for lg, url in sorted(alt_map.get(doc.key, {}).items()):
            lines.append(
                f'    <xhtml:link rel="alternate" hreflang="{lg}" href="{base}{url}"/>'
            )
        if default_lang in alt_map.get(doc.key, {}):
            lines.append(
                '    <xhtml:link rel="alternate" hreflang="x-default" '
                f'href="{base}{alt_map[doc.key][default_lang]}"/>'
            )
        lines.append("  </url>")
    lines.append("</urlset>")
    (OUT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")

    # ---- robots.txt ----
    (OUT / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\n" f"Sitemap: {base}/sitemap.xml\n",
        encoding="utf-8",
    )

    # ---- 404 ----
    (OUT / "404.html").write_text(
        env.get_template("404.html").render(
            site=site,
            lang=default_lang,
            s={k: v[default_lang] for k, v in site["strings"].items()},
            base_url=base,
            home_url="/",
            blog_url="/blog/",
            year=date.today().year,
        ),
        encoding="utf-8",
    )

    print(f"Built {built} pages into {OUT.relative_to(ROOT)}/")
    for line in report:
        print(line)
    counts: dict[str, int] = {}
    for d in docs:
        counts[d.kind] = counts.get(d.kind, 0) + 1
    print("  " + ", ".join(f"{v} {k}" for k, v in sorted(counts.items())))
    print(f"  sitemap: {len(docs)} URLs")

    if serve:
        from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

        class Handler(SimpleHTTPRequestHandler):
            def __init__(self, *a, **kw):
                super().__init__(*a, directory=str(OUT), **kw)

            def end_headers(self):
                # Always revalidate, so edits show up on reload
                self.send_header("Cache-Control", "no-store")
                super().end_headers()

        with ThreadingHTTPServer(("127.0.0.1", 8000), Handler) as httpd:
            print("\nServing http://localhost:8000  (Ctrl+C to stop)")
            httpd.serve_forever()


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--serve", action="store_true", help="serve _site/ after building")
    build(**vars(ap.parse_args()))

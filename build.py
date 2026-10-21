#!/usr/bin/env python3
"""Static site generator for lucietherapy.com.

Reads content.js (all the text, English and French side by side) and
templates/, writes a complete static site to _site/ with one real URL per
page per language, full metadata, hreflang pairing, JSON-LD structured data,
a sitemap, and size-optimised images.

    python build.py            # build into _site/
    python build.py --serve    # build, then serve on http://localhost:8000
"""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sys
import textwrap
from dataclasses import dataclass, field
from datetime import date, datetime, timezone
from pathlib import Path
from typing import NoReturn

try:
    import markdown
    from jinja2 import Environment, FileSystemLoader, StrictUndefined
except ImportError as exc:  # pragma: no cover
    sys.exit(f"Missing dependency: {exc.name}. Run: pip install -r requirements.txt")

try:
    from PIL import Image
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parent
CONTENT_FILE = ROOT / "content.js"
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

# Fields of content.js written in Markdown (articles' `text` is handled separately)
MARKDOWN_FIELDS = [
    ("intro", "text"),
    ("about", "education", "text"),
    ("about", "experience", "text"),
]


# =========================================================================
#  Reading content.js
# =========================================================================
class ContentError(Exception):
    """A mistake in content.js, reported with its line number."""


class ContentReader:
    """Reads the object literal in content.js without a JavaScript engine.

    Supports what the file needs: objects, arrays, "double", 'single' and
    `backtick` strings, numbers, true/false/null, // and /* */ comments,
    unquoted keys and trailing commas. Backtick text is dedented and trimmed,
    so it can be indented to line up with the code around it.
    """

    ESCAPES = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}
    DECLARATION = re.compile(r"(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=")
    NAME = re.compile(r"[A-Za-z_$][\w$]*")
    NUMBER = re.compile(r"-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?")

    def __init__(self, text: str, name: str):
        self.s = text.replace("\r\n", "\n")
        self.i = 0
        self.name = name

    def fail(self, message: str, at: int | None = None) -> NoReturn:
        at = self.i if at is None else at
        line = self.s.count("\n", 0, at) + 1
        col = at - (self.s.rfind("\n", 0, at) + 1) + 1
        raise ContentError(f"{self.name}, line {line}, column {col}: {message}")

    def at_end(self) -> bool:
        return self.i >= len(self.s)

    def skip(self) -> None:
        """Move past whitespace and comments."""
        while not self.at_end():
            if self.s[self.i] in " \t\n﻿":
                self.i += 1
            elif self.s.startswith("//", self.i):
                end = self.s.find("\n", self.i)
                self.i = len(self.s) if end == -1 else end + 1
            elif self.s.startswith("/*", self.i):
                end = self.s.find("*/", self.i + 2)
                if end == -1:
                    self.fail("a note opened with /* is never closed with */")
                self.i = end + 2
            else:
                break

    def document(self):
        self.skip()
        m = self.DECLARATION.match(self.s, self.i)
        if m:
            self.i = m.end()
        value = self.value()
        self.skip()
        if self.s.startswith(";", self.i):
            self.i += 1
            self.skip()
        if not self.at_end():
            self.fail("unexpected text after the end of the content (an extra } or ] ?)")
        return value

    def value(self):
        self.skip()
        if self.at_end():
            self.fail("the file ends too early: a closing } or ] is missing")
        c = self.s[self.i]
        if c == "{":
            return self.obj()
        if c == "[":
            return self.arr()
        if c in "\"'":
            return self.string(c)
        if c == "`":
            return self.template()
        m = self.NUMBER.match(self.s, self.i)
        if m:
            self.i = m.end()
            t = m.group()
            return float(t) if any(ch in t for ch in ".eE") else int(t)
        m = self.NAME.match(self.s, self.i)
        if m and m.group() in ("true", "false", "null"):
            self.i = m.end()
            return {"true": True, "false": False, "null": None}[m.group()]
        self.fail(f"expected a value (text in quotes, a number, {{ or [) but found {c!r}")

    def obj(self) -> dict:
        start = self.i
        self.i += 1
        out: dict = {}
        while True:
            self.skip()
            if self.at_end():
                self.fail("this { is never closed with }", start)
            if self.s[self.i] == "}":
                self.i += 1
                return out
            key_at = self.i
            if self.s[self.i] in "\"'":
                key = self.string(self.s[self.i])
            else:
                m = self.NAME.match(self.s, self.i)
                if not m:
                    self.fail(f"expected a name such as `title:` but found {self.s[self.i]!r}")
                key = m.group()
                self.i = m.end()
            self.skip()
            if not self.s.startswith(":", self.i):
                self.fail(f"expected : after {key!r}")
            self.i += 1
            if key in out:
                self.fail(f"{key!r} appears twice in the same block", key_at)
            out[key] = self.value()
            self.skip()
            if self.s.startswith(",", self.i):
                self.i += 1
            elif not self.s.startswith("}", self.i):
                self.fail("expected a comma after the previous item (is a comma or a quote mark missing?)")

    def arr(self) -> list:
        start = self.i
        self.i += 1
        out: list = []
        while True:
            self.skip()
            if self.at_end():
                self.fail("this [ is never closed with ]", start)
            if self.s[self.i] == "]":
                self.i += 1
                return out
            out.append(self.value())
            self.skip()
            if self.s.startswith(",", self.i):
                self.i += 1
            elif not self.s.startswith("]", self.i):
                self.fail("expected a comma after the previous item (is a comma or a quote mark missing?)")

    def escape(self) -> str:
        """Decode the backslash escape at self.i."""
        self.i += 1
        if self.at_end():
            self.fail("the file ends after a \\")
        c = self.s[self.i]
        self.i += 1
        if c == "\n":  # line continuation
            return ""
        if c in "ux":
            if c == "u" and self.s.startswith("{", self.i):
                end = self.s.find("}", self.i)
                code, self.i = self.s[self.i + 1 : end], end + 1
            else:
                size = 4 if c == "u" else 2
                code, self.i = self.s[self.i : self.i + size], self.i + size
            try:
                return chr(int(code, 16))
            except ValueError:
                self.fail(f"invalid \\{c} escape")
        return self.ESCAPES.get(c, c)

    def string(self, quote: str) -> str:
        start = self.i
        self.i += 1
        out = []
        while True:
            if self.at_end():
                self.fail(f"this text is missing its closing {quote}", start)
            c = self.s[self.i]
            if c == quote:
                self.i += 1
                return "".join(out)
            if c == "\n":
                self.fail(
                    f"text between {quote} quotes cannot go over several lines; "
                    "use `backticks` for long text",
                    start,
                )
            if c == "\\":
                out.append(self.escape())
            else:
                out.append(c)
                self.i += 1

    def template(self) -> str:
        start = self.i
        self.i += 1
        out = []
        while True:
            if self.at_end():
                self.fail("this text is missing its closing `", start)
            c = self.s[self.i]
            if c == "`":
                self.i += 1
                return textwrap.dedent("".join(out)).strip()
            if c == "\\":
                out.append(self.escape())
            elif self.s.startswith("${", self.i):
                self.fail("${ is not supported here; write \\${ to show it as text")
            else:
                out.append(c)
                self.i += 1


def load_content() -> dict:
    return ContentReader(CONTENT_FILE.read_text(encoding="utf-8"), CONTENT_FILE.name).document()


def localize(value, lang: str, langs: list[str]):
    """Resolve every {en: ..., fr: ...} pair to its text in `lang`.

    A pair without that language falls back to the first one it has.
    """
    if isinstance(value, dict):
        if value and set(value) <= set(langs):
            return localize(value[lang] if lang in value else next(iter(value.values())), lang, langs)
        return {k: localize(v, lang, langs) for k, v in value.items()}
    if isinstance(value, list):
        return [localize(v, lang, langs) for v in value]
    return value


def render_markdown(text: str) -> str:
    MD.reset()
    return MD.convert(text)


def excerpt(body_html: str, length: int = 80) -> str:
    """Opening characters of an article as plain text, for listing cards."""
    text = html.unescape(re.sub(r"<[^>]+>", " ", body_html))
    text = re.sub(r"\s+", " ", text).strip()
    return text[:length] + "..."


def for_language(content: dict, lang: str) -> dict:
    """The whole content in one language, with Markdown fields rendered to HTML."""
    c = localize(content, lang, content["site"]["languages"])
    for path in MARKDOWN_FIELDS:
        parent = c
        for k in path[:-1]:
            parent = parent[k]
        parent[path[-1]] = render_markdown(parent[path[-1]])
    # Plain-text version of the role, for image descriptions and Google
    c["person"]["job_title"] = re.sub(r"\s*<br\s*/?>\s*", ", ", c["person"]["role"])
    return c


# =========================================================================
#  Model
# =========================================================================
@dataclass
class Doc:
    """A single rendered document (home, article, or article index)."""

    lang: str
    kind: str  # "home" | "post" | "blog_index"
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
    excerpt: str = ""


SLUG = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")


def lang_prefix(default_lang: str, lang: str) -> str:
    """'' for the default language, '/fr' otherwise."""
    return "" if lang == default_lang else f"/{lang}"


def load_docs(content: dict, by_lang: dict[str, dict]) -> list[Doc]:
    langs = content["site"]["languages"]
    articles = content.get("blog", [])

    ids = [a.get("id") for a in articles]
    for n, aid in enumerate(ids, 1):
        if not aid:
            raise ContentError(f"{CONTENT_FILE.name}: article number {n} has no id")
        if ids.count(aid) > 1:
            raise ContentError(f"{CONTENT_FILE.name}: two articles have the id {aid!r}")

    docs: list[Doc] = []
    for lang in langs:
        c = by_lang[lang]
        pre = lang_prefix(langs[0], lang)

        docs.append(
            Doc(
                lang=lang,
                kind="home",
                key="home",
                slug="",
                url=f"{pre}/",
                title=c["person"]["name"],
                meta_title=c["seo"]["home"]["title"],
                description=c["seo"]["home"]["description"],
                keywords=c["seo"]["home"].get("keywords", []),
                image=c["person"]["photo"],
            )
        )

        # Articles, in the order they are listed. One without text in this
        # language is simply not published in it.
        for raw in articles:
            if not raw.get("text", {}).get(lang):
                continue
            a = localize(raw, lang, langs)
            for name in ("slug", "title"):
                if not (raw.get(name) or {}).get(lang):
                    raise ContentError(
                        f"{CONTENT_FILE.name}: article {a['id']!r} has `text` in {lang!r} "
                        f"but no `{name}` in {lang!r}"
                    )
            if not SLUG.fullmatch(a["slug"]):
                raise ContentError(
                    f"{CONTENT_FILE.name}: article {a['id']!r} has slug {a['slug']!r}; "
                    "use lowercase letters, digits and hyphens only"
                )
            seo = a.get("seo", {})
            body = render_markdown(a["text"])
            docs.append(
                Doc(
                    lang=lang,
                    kind="post",
                    key=a["id"],
                    slug=a["slug"],
                    url=f"{pre}/blog/{a['slug']}/",
                    title=a["title"],
                    meta_title=seo.get("title") or a["title"],
                    description=seo.get("description", ""),
                    keywords=seo.get("keywords", []),
                    image=a.get("image", ""),
                    date=str(a.get("date") or ""),
                    body=body,
                    excerpt=excerpt(body),
                )
            )

        docs.append(
            Doc(
                lang=lang,
                kind="blog_index",
                key="blog_index",
                slug="blog",
                url=f"{pre}/blog/",
                title=c["labels"]["nav_blog"],
                meta_title=c["seo"]["blog"]["title"],
                description=c["seo"]["blog"]["description"],
            )
        )

    return docs


# =========================================================================
#  Structured data
# =========================================================================
def practice_schema(c: dict, base: str, img_src) -> dict:
    p = c["practice"]["in_person"]
    a = p["address"]
    return {
        "@type": ["Psychologist", "ProfessionalService"],
        "@id": f"{base}/#practice",
        "name": f"{c['person']['name']} — {p['place']}",
        "description": c["seo"]["home"]["description"],
        "image": base + img_src(c["person"]["photo"]),
        "url": base + "/",
        "email": c["person"]["email"],
        "priceRange": "££",
        "currenciesAccepted": "GBP, EUR",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": a["street"],
            "addressLocality": a["town"],
            "postalCode": a["postcode"],
            "addressRegion": a["region"],
            "addressCountry": a["country_code"],
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": p["geo"]["lat"],
            "longitude": p["geo"]["lng"],
        },
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


def person_schema(c: dict, base: str, lang: str, img_src) -> dict:
    affiliations = c["about"]["affiliations"]["list"]
    return {
        "@type": "Person",
        "@id": f"{base}/#person",
        "name": c["person"]["name"],
        "jobTitle": c["person"]["job_title"],
        "image": base + img_src(c["person"]["photo"]),
        "email": c["person"]["email"],
        "url": base + lang_prefix(c["site"]["languages"][0], lang) + "/",
        "sameAs": [c["person"]["instagram"], c["person"]["linkedin"]],
        "knowsLanguage": c["site"]["languages"],
        "alumniOf": {"@type": "CollegeOrUniversity", "name": "Université Paris Cité"},
        "hasCredential": [
            {"@type": "EducationalOccupationalCredential", "name": f"{a['role']} — {a['org']}"}
            for a in affiliations
        ],
        "memberOf": [{"@type": "Organization", "name": a["org"]} for a in affiliations],
        "worksFor": {"@id": f"{base}/#practice"},
    }


def build_jsonld(c: dict, doc: Doc, base: str, img_src) -> str:
    graph: list[dict] = []

    if doc.kind == "home":
        graph.append(
            {
                "@type": "WebSite",
                "@id": f"{base}/#website",
                "url": base + "/",
                "name": c["person"]["name"],
                "inLanguage": doc.lang,
                "publisher": {"@id": f"{base}/#person"},
            }
        )
        graph.append(person_schema(c, base, doc.lang, img_src))
        graph.append(practice_schema(c, base, img_src))

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
            article["image"] = base + img_src(doc.image)
        if doc.date:
            article["datePublished"] = doc.date
        graph.append(article)
        graph.append(person_schema(c, base, doc.lang, img_src))

    else:  # blog_index
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
        graph.append(person_schema(c, base, doc.lang, img_src))

    # Breadcrumbs for everything but the homepage
    if doc.kind != "home":
        prefix = lang_prefix(c["site"]["languages"][0], doc.lang)
        items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": f"{base}{prefix}/"}]
        if doc.kind == "post":
            items.append(
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": c["labels"]["nav_blog"],
                    "item": f"{base}{prefix}/blog/",
                }
            )
        items.append({"@type": "ListItem", "position": len(items) + 1, "name": doc.title})
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


def map_arrows(pins: list[dict]) -> list[str]:
    """Quadratic-bezier `d` attributes joining consecutive map pins.

    Previously computed in the browser; precomputing keeps the map visible
    without JavaScript.
    """
    out = []
    for a, b in zip(pins, pins[1:]):
        x1, y1, x2, y2 = a["left"], a["top"], b["left"], b["top"]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        dist = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        cy = my - dist * 0.3
        out.append(f"M {x1} {y1} Q {mx} {cy:.2f} {x2} {y2}")
    return out


def legacy_json(docs: list[Doc]) -> str:
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
    try:
        content = load_content()
        langs = content["site"]["languages"]
        by_lang = {lang: for_language(content, lang) for lang in langs}
        docs = load_docs(content, by_lang)
    except ContentError as exc:
        sys.exit(f"Problem in content.js — {exc}")

    base = content["site"]["url"].rstrip("/")
    default_lang = langs[0]

    clean_output()

    report: list[str] = []
    dims, served = copy_media(report)

    copy_static(served, report)

    # ---- cross-language URL map for hreflang and the language switch ----
    alt_map: dict[str, dict[str, str]] = {}
    for d in docs:
        alt_map.setdefault(d.key, {})[d.lang] = d.url

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

    legacy_map = legacy_json(docs)
    templates = {"home": "home.html", "post": "post.html", "blog_index": "blog_index.html"}

    built = 0
    for doc in docs:
        c = by_lang[doc.lang]
        posts = [d for d in docs if d.lang == doc.lang and d.kind == "post"]
        post_urls = {d.key: d.url for d in posts}
        prefix = lang_prefix(default_lang, doc.lang)

        ctx = {
            "c": c,
            "s": c["labels"],
            "lang": doc.lang,
            "other_langs": [l for l in langs if l != doc.lang],
            "doc": doc,
            "posts": posts,
            "post_url": post_urls.get,
            "map_arrows": map_arrows(c["about"]["map"]),
            "legacy_map": legacy_map,
            "alternates": alt_map.get(doc.key, {}),
            "canonical": base + doc.url,
            "base_url": base,
            "home_url": prefix + "/",
            "blog_url": prefix + "/blog/",
            "default_lang": default_lang,
            "jsonld": build_jsonld(c, doc, base, img_src),
            "year": date.today().year,
        }

        html_out = env.get_template(templates[doc.kind]).render(**ctx)
        dest = OUT / doc.url.strip("/") / "index.html" if doc.url != "/" else OUT / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html_out, encoding="utf-8")
        built += 1

    # ---- sitemap ----
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    priority = {"home": "1.0", "post": "0.7", "blog_index": "0.6"}
    for doc in docs:
        lines.append("  <url>")
        lines.append(f"    <loc>{base}{doc.url}</loc>")
        lines.append(f"    <lastmod>{now}</lastmod>")
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
            c=by_lang[default_lang],
            lang=default_lang,
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

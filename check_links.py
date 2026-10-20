#!/usr/bin/env python3
"""Verify every internal link and asset reference in _site/ resolves.

Run after build.py. Exits non-zero on the first set of failures so CI stops
before deploying a site with broken navigation.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

OUT = Path(__file__).resolve().parent / "_site"

HREF_RE = re.compile(r'(?:href|src)\s*=\s*"([^"]+)"', re.I)
ID_RE = re.compile(r'id\s*=\s*"([^"]+)"', re.I)
CSS_URL_RE = re.compile(r'''url\((["']?)([^"')]+)\1\)''')


def resolves(url_path: str) -> bool:
    p = unquote(url_path.lstrip("/"))
    candidate = OUT / p
    if candidate.is_file():
        return True
    if candidate.is_dir() and (candidate / "index.html").is_file():
        return True
    # Extensionless paths are served as directories with an index.html
    return (OUT / p / "index.html").is_file()


def main() -> int:
    if not OUT.is_dir():
        sys.exit("_site/ not found — run build.py first")

    pages = sorted(OUT.rglob("*.html"))
    problems: list[str] = []
    checked = 0

    for page in pages:
        html = page.read_text(encoding="utf-8")
        ids = set(ID_RE.findall(html))
        rel = page.relative_to(OUT).as_posix()

        for raw in HREF_RE.findall(html):
            url = raw.strip()
            if not url or url.startswith(("mailto:", "tel:", "data:", "javascript:")):
                continue
            parsed = urlparse(url)
            if parsed.scheme or parsed.netloc:
                continue  # external; not our problem to verify offline
            checked += 1

            if url.startswith("#"):
                anchor = url[1:]
                if anchor and anchor not in ids:
                    problems.append(f"{rel}: missing anchor target #{anchor}")
                continue

            if not parsed.path.startswith("/"):
                problems.append(f"{rel}: relative link '{url}' (use site-absolute paths)")
                continue

            if not resolves(parsed.path):
                problems.append(f"{rel}: dead link -> {parsed.path}")
                continue

            # Fragment on another page: confirm the target id exists there
            if parsed.fragment:
                target = OUT / parsed.path.lstrip("/")
                target = target / "index.html" if target.is_dir() else target
                if target.is_file() and target.suffix == ".html":
                    if parsed.fragment not in set(ID_RE.findall(target.read_text(encoding="utf-8"))):
                        problems.append(
                            f"{rel}: {parsed.path} has no anchor #{parsed.fragment}"
                        )

    # Stylesheets reference images too, and build.py rewrites those URLs
    # to the optimised filenames — so verify they landed somewhere real.
    for sheet in sorted(OUT.rglob("*.css")):
        rel = sheet.relative_to(OUT).as_posix()
        for _, url in CSS_URL_RE.findall(sheet.read_text(encoding="utf-8")):
            url = url.strip()
            if url.startswith(("data:", "http://", "https://", "//")):
                continue
            checked += 1
            target = url if url.startswith("/") else str(
                (sheet.parent / url).resolve().relative_to(OUT.resolve())
            )
            if not resolves(target):
                problems.append(f"{rel}: dead url() -> {url}")

    print(f"Checked {checked} internal references across {len(pages)} pages.")
    if problems:
        print(f"\n{len(problems)} problem(s):")
        for p in problems:
            print(f"  {p}")
        return 1
    print("All internal links and assets resolve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Refresh citation counts from the public Google Scholar profile into data/citations.json.

Scholar has no API, so this reads the profile page. That works from a home connection
but Google often blocks cloud servers (such as GitHub Actions) with a captcha. When the
page can't be read, this exits with an error and leaves the existing numbers untouched.

Run locally:   python scripts/update_citations.py
Run on a schedule: .github/workflows/citations.yml (daily) and/or a local scheduled task.
Standard library only.
"""
import html as H
import json
import re
import sys
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "citations.json"
USER = "vvfIEkIAAAAJ"
URL = f"https://scholar.google.com/citations?user={USER}&hl=en&cstart=0&pagesize=100&sortby=pubdate"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/124.0 Safari/537.36")


def norm(t):
    t = re.sub(r"&[a-z]+;", " ", t.lower())
    return re.sub(r"[^a-z0-9]+", " ", t).strip()


def fetch():
    req = urllib.request.Request(URL, headers={"User-Agent": UA, "Accept-Language": "en"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def parse(page):
    works = {}
    for row in re.findall(r'<tr class="gsc_a_tr">(.*?)</tr>', page, re.S):
        t = re.search(r'class="gsc_a_at"[^>]*>(.*?)</a>', row, re.S)
        c = re.search(r'class="gsc_a_ac[^"]*"[^>]*>(\d*)</a>', row, re.S)
        if not t:
            continue
        n = c.group(1) if c else ""
        if n:
            works[norm(H.unescape(re.sub(r"<[^>]+>", "", t.group(1))))] = int(n)
    # First value in the right-hand "Cited by" table is the all-time citation total.
    tot = re.search(r'class="gsc_rsb_std">(\d+)</td>', page)
    return works, (int(tot.group(1)) if tot else None)


def main():
    try:
        page = fetch()
    except Exception as e:
        sys.exit(f"Could not fetch Scholar ({e}). Existing numbers left as they are.")
    works, total = parse(page)
    if not works or total is None:
        sys.exit("Scholar returned no profile data (likely a captcha or block). "
                 "Existing numbers left as they are.")
    prev = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    if prev.get("works") == works and prev.get("total") == total:
        print("no change")
        return
    OUT.parent.mkdir(exist_ok=True)
    data = {"source": "Google Scholar", "updated": date.today().isoformat(),
            "total": total, "works": works}
    OUT.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"total {total} across {len(works)} items")


if __name__ == "__main__":
    main()

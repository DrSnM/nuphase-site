"""Refresh per-paper and total citation counts from OpenAlex into data/citations.json.

Run daily by .github/workflows/citations.yml. Uses only the standard library.
Papers are matched by exact (normalised) title and a "Manning" author, because the
OpenAlex author record for this name mixes several people. Patents are not in OpenAlex
and are skipped. If a paper can't be matched, its last known count is kept.
"""
import json, re, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "index.html"
OUT = ROOT / "data" / "citations.json"
API = "https://api.openalex.org/works"


def norm(t):
    t = re.sub(r"&[a-z]+;", " ", t.lower())
    return re.sub(r"[^a-z0-9]+", " ", t).strip()


def paper_titles():
    """Titles of non-patent items in the publications list on the homepage."""
    html = HTML.read_text(encoding="utf-8")
    out = []
    for m in re.finditer(r'<div class="pub-title">(.*?)</div>\s*<div class="pub-detail">(.*?)</div>', html, re.S):
        title, detail = m.group(1).strip(), m.group(2)
        if "Patent" in detail:
            continue
        out.append(re.sub(r"&amp;", "&", title))
    return out


AUTHOR_ID = "A5052555887"  # OpenAlex record for Sean Manning (shared with another author; titles are matched too)


def get(params):
    """GET with backoff, because the keyless API rate-limits (HTTP 429)."""
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(f"{API}?{q}", headers={"User-Agent": "nuphase-site-citations/1.0"})
    for wait in (0, 5, 20, 60):
        time.sleep(wait)
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r).get("results", [])
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
    raise RuntimeError("rate limited")


def bulk():
    """One request for every work on the author record, keyed by normalised title."""
    out = {}
    for w in get({"filter": f"authorships.author.id:{AUTHOR_ID}", "per-page": 200,
                  "select": "title,cited_by_count"}):
        k = norm(w.get("title") or "")
        out[k] = max(out.get(k, 0), w.get("cited_by_count", 0))
    return out


def lookup(title):
    results = get({"search": title, "per-page": 10, "select": "title,cited_by_count,authorships"})
    best = None
    for w in results:
        if norm(w.get("title") or "") != norm(title):
            continue
        if not any("manning" in (a.get("author", {}).get("display_name") or "").lower() for a in w.get("authorships", [])):
            continue
        n = w.get("cited_by_count", 0)
        best = n if best is None else max(best, n)
    return best


def main():
    prev = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {"works": {}}
    works = dict(prev.get("works", {}))
    missed = []
    try:
        found = bulk()
    except Exception as e:
        print(f"bulk lookup failed: {e}", file=sys.stderr)
        found = {}
    for t in paper_titles():
        n = found.get(norm(t))
        if n is None:  # not on the author record: search by title instead
            try:
                n = lookup(t)
            except Exception as e:  # network or API trouble: keep the old number
                print(f"error for {t!r}: {e}", file=sys.stderr)
        if n is None:
            missed.append(t)
        else:
            works[norm(t)] = n
    if missed:
        print("not matched (kept previous):", *missed, sep="\n  ", file=sys.stderr)
    data = {"source": "OpenAlex", "updated": date.today().isoformat(),
            "total": sum(works.values()), "works": works}
    # Only rewrite when numbers changed, so the daily job doesn't churn commits.
    if prev.get("works") == works and OUT.exists():
        print("no change")
        return
    OUT.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"total {data['total']} across {len(works)} papers")


if __name__ == "__main__":
    main()

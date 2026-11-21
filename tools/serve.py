#!/usr/bin/env python3
"""Check data/cv.json, then serve the portfolio locally at http://localhost:8000."""
import http.server
import json
import pathlib
import sys
import webbrowser

ROOT = pathlib.Path(__file__).resolve().parent.parent
REQUIRED = ["name", "nameJP", "roles", "tagline", "about", "stats", "skills",
            "experience", "projects", "education", "contact", "sections"]


def check():
    data = json.loads((ROOT / "data" / "cv.json").read_text(encoding="utf-8"))
    missing = [k for k in REQUIRED if k not in data]
    if missing:
        sys.exit(f"cv.json is missing: {', '.join(missing)}")
    for skill in data["skills"]:
        if not 1 <= skill["level"] <= 10:
            sys.exit(f"Skill level must be between 1 and 10: {skill['name']}")
    print("cv.json looks good")


def main(port=8000):
    check()
    handler = lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=str(ROOT), **k)
    with http.server.ThreadingHTTPServer(("", port), handler) as server:
        url = f"http://localhost:{port}"
        print(f"Serving {url} (press Ctrl+C to stop)")
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped")


if __name__ == "__main__":
    main()

# Pixel Sakura Portfolio

A pixel-art, Japanese-themed developer portfolio in red and purple. The structure, style, logic and content each live in their own language, so you can change one without touching the others.

## Languages used

| Language | File | Job |
| --- | --- | --- |
| HTML | `index.html` | Page structure and the inline pixel-art SVG sun and torii gate |
| CSS | `css/styles.css` | Design tokens, layout, components and animations |
| JavaScript (ES modules) | `js/main.js`, `js/effects.js` | Renders every section from the data, then adds the motion layer |
| JSON | `data/cv.json` | All of your content: name, skills, experience, projects, contact |
| Python | `tools/serve.py` | Checks `cv.json` for mistakes and runs a local server |
| SVG | `assets/favicon.svg` | The pixel-sun browser tab icon |
| Markdown | `README.md` | This documentation |

## Edit your information

Open `data/cv.json` and change the values. Everything on the page is built from this one file:

- `name`, `nameJP`, `roles`, `tagline`: the hero section
- `about`, `stats`: the About section
- `skills`: each has a `name` and a `level` from 1 to 10
- `experience`, `projects`, `education`, `contact`: add or remove entries freely
- `sections`: the English and Japanese section titles

For the browser tab title, edit the `<title>` in `index.html`.

## Run it locally

The page loads `data/cv.json` with `fetch`, so it must be served over HTTP. Opening `index.html` by double-clicking will not work. Run:

```bash
python3 tools/serve.py
```

This validates `cv.json` and opens http://localhost:8000.

## Deploy on GitHub Pages

1. Create a public repo named `YOUR-USERNAME.github.io`.
2. Upload everything in this folder, keeping the folder structure.
3. Go to Settings, then Pages, choose "Deploy from a branch", select `main` and `/ (root)`, and save.

## Project structure

```
portfolio-site/
├── index.html
├── css/styles.css
├── js/
│   ├── main.js        loads the data and renders the page
│   └── effects.js     parallax, marquee, tilt, cursor trail and sparks
├── data/cv.json       your content
├── assets/favicon.svg
├── tools/serve.py     validator and dev server
└── README.md
```

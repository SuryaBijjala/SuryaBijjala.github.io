# suryabijjala.github.io

Personal academic website of Surya T. Bijjala. Plain HTML + Tailwind (Play CDN) — no build step.
Push to `main` and GitHub Pages serves it. To preview locally, just open `index.html` in a browser.

## Folder layout

```
.
├── index.html                    Home / biography
├── cv/index.html                 CV & documents
├── articles/index.html           Publications
├── computational/
│   ├── index.html                Computational projects + HPC allocations
│   ├── law-discovery.html        Project detail page
│   └── stages/                   (sub-pages for law-discovery, e.g. literature-data.html)
├── experimental/index.html       Experimental projects
├── conferences/index.html        Talks & posters (with tag filter)
├── collaborate/index.html        Collaboration areas + contact form
└── static/
    ├── css/site.css              All custom CSS (nav underline, cards, loader, tabs…)
    ├── js/
    │   ├── tailwind.config.js    Fonts, colours, animations (Tailwind theme)
    │   ├── site.js               ★ Sidebar, footer, loader — nav & social links live here
    │   ├── tag-filter.js         Conferences tag buttons (auto-built from card tags)
    │   ├── contact-form.js       Contact form → opens email app
    │   └── law-discovery.js      Mermaid workflow diagrams
    ├── img/
    │   ├── <profile photo>
    │   ├── computational/
    │   ├── experimental/
    │   └── conferences/
    └── docs/
        ├── cv/                   CV, thesis PDFs
        └── conferences/          Slides / poster PDFs
```

## Common edits

| I want to… | Edit |
|---|---|
| Change a nav item, social link, name, tagline or profile photo **on every page** | `SITE` object at the top of `static/js/site.js` |
| Add a new page | Copy any page into a new folder, set `<body data-page="key" data-root="../">`, add `{ key, label, href }` to `SITE.nav` |
| Add a publication | `articles/index.html` — copy one card block (newest first) |
| Add a talk | `conferences/index.html` — copy one card; its `js-tag` chips become filter buttons automatically |
| Add a project | `computational/` or `experimental/index.html` — use `<a>` if it has a detail page, `<div>` if not |
| Change colours / fonts | `static/js/tailwind.config.js` |
| Change the loading animation length (or turn it off) | `loaderDelayMs` in `static/js/site.js` (0 = off) |

Every page uses the same skeleton:

```html
<body data-page="articles" data-root="../" class="loading-active …">
  <div data-include="sidebar"></div>     <!-- filled in by site.js -->
  <main …>
    <article>…page content…</article>
    <div data-include="footer"></div>    <!-- filled in by site.js -->
  </main>
  <script src="../static/js/site.js"></script>
</body>
```

`data-root` is `""` for the home page and `"../"` for pages inside a folder.

Images that fail to load are swapped for a grey placeholder automatically — set the label with
`data-fallback="Project Image"` on the `<img>`.

## First-time setup after this cleanup

Run once from the repo root to move existing images/PDFs into the new folders and delete the
replaced files (`static/css/style.css`, `projects/`, `collaborate.html`):

```bash
bash migrate-assets.sh
git status        # review, then commit and delete migrate-assets.sh
```

## Content to-do  (search the code for `TODO`)

Content still copied from the site this was based on (Dr. A. P. Kądzielawa's):

- [ ] **CV page** — all three PDFs (`APKadzielawaCV.pdf`, 2015 dissertation, 2011 master's thesis)
- [ ] **Articles** — #4–9 (JorG, EDABI, CeCoIn5, hydrogen chain, solid hydrogen, Mott–Hubbard)
- [ ] **Articles** — verify authorship of #2 (W-Cr, Mater. Lett. 2022) and #3 (imidazole, Corros. Sci. 2021)
- [ ] **Conferences** — all three talks
- [ ] **Computational → HPC allocations** — both IT4I allocations (OPEN-25-5, OPEN-24-52)
- [ ] **Home** — "JorGpi Framework" card
- [ ] **Profile photo** — rename `static/img/apk.png` to e.g. `profile.jpg` and update `SITE.profileImage`

Placeholders / loose ends:

- [ ] Computational: four generic "Ongoing" cards with placeholder images
- [ ] Articles: "Insert Image" boxes on every card
- [ ] Streamlit icon hidden until you add its URL in `SITE.social`
- [ ] `computational/stages/literature-data.html` is linked but not in the site yet
- [ ] Terminology: "Gas Tungsten Arc Melting-based welding" / "GTAM welding" vs. GTAW — pick one

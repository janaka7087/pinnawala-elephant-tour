# Pinnawala Elephant Tour

Website for **Pinnawala Elephant Tour** — elephant experiences and two
family-run places to stay in Pinnawala, Kegalle District, Sri Lanka:

- **Pinnawala Reach Hotel** — 7 luxury rooms on the bank of the Ma Oya
- **Luck Uyana Cabana** — 4 luxury cabanas in a jungle garden

Static site: plain HTML, CSS and JavaScript. No build step, no dependencies,
no database. Upload the folder to any web host and it runs.

## Preview

Served from GitHub Pages — see the link in the repository's **About** panel.

> This is a **development preview**, not the live site. Several details still
> need owner confirmation before launch, and the Russian and German
> translations have not yet been checked by a native speaker.
> **See [HANDOVER.md](HANDOVER.md) for the full pre-launch checklist.**

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — 4-slide elephant hero, experiences, accommodation, gallery, location |
| `elephant-experiences.html` | What a day around the herd looks like |
| `hotels.html` | Both properties in detail |
| `ayurveda-herbal-garden.html` | The herbal garden |
| `discover-pinnawala.html` | The surrounding area |
| `travel-plans.html` | One-night, two-night and longer stay outlines |
| `gallery.html` | 64 photographs, filterable, with lightbox |
| `packages.html` | What a stay can include |
| `contact.html` | Enquiry form and direct contact details |
| `404.html` | Not-found page |

## Structure

```
css/style.css      All styling
js/main.js         Hero slider, gallery filters, lightbox, menu, form
js/i18n.js         Language switching
js/i18n-data.js    English / Russian / German text  ← edit translations here
media/             Web-optimised images (JPEG + WebP, two sizes each)
```

## Running it locally

No tooling required — open `index.html` in a browser. To serve it over HTTP
instead (closer to production):

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Notes

- Source photography and the client's developer brief are **not** in this
  repository; they stay with the developer's delivery copy.
- No prices are published anywhere on the site: every route leads to an
  individual quotation, as the brief requires.
- No Google Map is embedded, as the brief requires. The location section uses
  addresses, plus codes and photographs instead.

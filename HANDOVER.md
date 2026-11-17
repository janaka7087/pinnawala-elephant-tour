# Pinnawala Elephant Tour — website handover

Static website (plain HTML, CSS and JavaScript — no build step, no database).
Upload the whole folder to the web host and it works.

Built against `Pinnawala_Elephant_Tour_Final_Developer_Brief.pdf`.

---

## 1. What is in the folder

```
index.html                  Home — 4-slide elephant hero, experiences,
                            accommodation, gallery, location
elephant-experiences.html   What a day around the herd looks like
hotels.html                 Pinnawala Reach Hotel + Luck Uyana Cabana
ayurveda-herbal-garden.html The herbal garden
discover-pinnawala.html     The area and what is nearby
travel-plans.html           One-night / two-night / longer stay outlines
gallery.html                64 photographs, filterable, with lightbox
packages.html               What a stay can include (quoted on enquiry)
contact.html                Enquiry form + direct contact details
404.html                    Not-found page

css/style.css               All styling
js/main.js                  Slider, gallery, lightbox, menu, form
js/i18n.js                  Language switching
js/i18n-data.js             The EN / RU / DE text  ← edit translations here

media/hero/                 The 4 hero photographs (2 sizes × JPEG + WebP)
media/photos/               71 site photographs (2 sizes × JPEG + WebP)
media/logo.png              The official logo, trimmed for web use
favicon.ico, media/icon-512.png, media/apple-touch-icon.png

assets/                     The ORIGINAL files exactly as supplied, untouched
                            (plus the photographs collected from Google Maps —
                            see section 5)

robots.txt, sitemap.xml, .htaccess
```

Nothing is minified or compiled, so any file can be opened in a text editor
and changed directly.

---

## 2. Before launch — must be confirmed with the owner

These are the items the brief flagged, plus everything on the site that I
could not verify from the supplied material. **Please check each one.**

### Critical — the site cannot go live until these are settled

| # | Item | Where it appears | Status |
|---|------|------------------|--------|
| 1 | **Where enquiry forms should be delivered** | `contact.html` | The form currently falls back to the visitor's own email programme, addressed to `pinnawalareach@gmail.com`. See section 4 — a form service should be connected. |
| 2 | **Rates, taxes, meal plans, inclusions, cancellation and child policies** | `packages.html` | **No prices are published anywhere on the site.** Every page routes to "we quote your dates individually". If the owner wants published rates, they must supply them. |
| 3 | **Verified list of elephant experiences**, operating times, age and safety limits | `elephant-experiences.html`, `index.html` | Described in general terms only, with a visible note that activities are confirmed on enquiry. No activity is promised. Confirm the wording is accurate. |
| 4 | **Ayurveda Herbal Garden** — access rules, charges, opening times | `ayurveda-herbal-garden.html` | The page deliberately contains **no specific details**, only a general description and "ask us". Owner must supply the real information. |
| 5 | **Russian and German translations** | `js/i18n-data.js` | Drafted during development, **not yet reviewed by a native speaker.** See section 6. |
| 6 | **Photograph rights** | throughout | See section 5. |

### Also to confirm

- Final domain name and hosting provider.
- The official registered business address and any social media links.
- That the amenity lists on `hotels.html` are complete and correct. I listed
  only what is visible in the photographs plus what the properties' own Google
  listings state. **Specifically: Wi-Fi is listed on both properties and a
  swimming pool is listed by Google for both but is not shown in any
  photograph I had — I have deliberately NOT mentioned a pool anywhere on the
  site. Add it only if it genuinely exists.**
- Whether the room names on `hotels.html` ("Double room", "Garden-view room",
  "Balcony room") match the owner's actual room categories. They currently
  describe the rooms in the photographs, and the page says so.
- Approximate travel times. The site deliberately avoids stating distances in
  kilometres or minutes, except "roughly an hour or so" to Kandy on
  `discover-pinnawala.html`. Confirm or remove.
- **Elephant riding.** Several of the supplied photographs show visitors
  riding elephants (`elephant-jungle-path`, `elephant-bamboo-grove`,
  `elephant-riverside-track`, `elephant-palm-grove` and the hero photograph
  `hero-1-elephants-river-bath`). They appear in the gallery with neutral
  captions and riding is **not offered or described anywhere in the text**.
  Decide whether showing them matches the business's welfare position; if not,
  remove those `<figure>` blocks from `gallery.html` and swap the hero image.

---

## 3. Contact details used on the site

Taken from the properties' own signage and Google listings. **Please verify.**

**Pinnawala Reach Hotel** — 7 luxury rooms
- Pinnawala Road, Rambukkana, Kegalle District (Plus code 79MM+GV Rambukkana)
- +94 35 2263 233 · +94 77 767 8223 (Asela) · +94 77 939 3354 (Umesh)
- pinnawalareach@gmail.com

**Luck Uyana Cabana** — 4 luxury cabanas
- Randeniya, Pinnawala, Kegalle 71000 (Plus code 79FM+9J Kegalle)
- +94 77 190 8272 (Harindra) · +94 77 939 3354 (Umesh)
- udamullacabana@gmail.com

**WhatsApp** (brief): +94 77 190 8272 — used by the floating button, the top
bar and every "WhatsApp us" button.

To change a number everywhere, search all `.html` files for the old number and
replace it. The WhatsApp links use the format `https://wa.me/94771908272`
(country code, no `+`, no spaces).

---

## 4. Connecting the enquiry form

Right now the form validates the input and then opens the visitor's own email
programme with the enquiry filled in. That works, but some visitors have no
mail programme configured, so **connect a form service before launch**:

1. Create a free form endpoint (Formspree, Web3Forms, FormSubmit or the
   host's own PHP mail script) pointed at the owner's confirmed address.
2. In `contact.html`, find the `<form data-enquiry ...>` tag and add:

   ```html
   data-endpoint="https://your-form-service-url"
   ```

3. Save and upload. The form will then post in the background and show the
   confirmation message without leaving the page.

The form already includes a hidden "honeypot" field that silently discards
most spam. The success, error and validation messages are the `data-msg-*`
attributes on the same `<form>` tag — edit the text there.

---

## 5. Photographs — important

**Supplied by the owner** (in `assets/`): all 17 elephant photographs
(`DSC_*.jpg`) and 12 Luck Uyana Cabana photographs. These are used freely.

**Collected from Google Maps**, as the brief instructed, and saved in
`assets/pinnawala-reach/` and `assets/luckuyana-maps/`: 30 photographs of
Pinnawala Reach Hotel and 13 of Luck Uyana Cabana. These came from the two
properties' own Google listings and include both owner-posted and
visitor-posted pictures.

> **Action required.** Before launch, ask the owner to supply the original
> high-resolution files for their own properties, and confirm they hold the
> rights to every image used. Any photograph posted by a visitor rather than
> the business should be replaced. A few of the owner-posted hotel room
> photographs carried a contact banner across the bottom; I cropped it off —
> the originals would be cleaner.

No stock photography is used anywhere. Every photograph on the site is of
these actual properties and experiences.

### Replacing a photograph

1. Put the new file in `media/photos/` with the same name as the one it
   replaces, in two sizes: `name.jpg` (about 1500px wide) and `name-t.jpg`
   (about 760px wide).
2. Optionally also save `.webp` versions with the same names — modern browsers
   will prefer them. If you do not, the `.jpg` is used and everything still
   works.
3. Update the `alt="..."` text in the HTML to describe the new picture.

### The hero slider

Four slides, elephants only, in `index.html` under
`<section class="hero" data-hero ...>`. Files are in `media/hero/`:

| Slide | File | Subject |
|-------|------|---------|
| 1 | `hero-1-elephants-river-bath` | Elephant bathing and spraying in the river |
| 2 | `hero-2-elephants-jungle` | Elephants in their natural surroundings |
| 3 | `hero-3-elephant-close-up` | Close-up elephant portrait |
| 4 | `hero-4-elephant-tour-walk` | Visitors on a guided elephant walk |

The headline and caption for each slide live in `js/i18n-data.js` under the
keys `hero.1.title`, `hero.1.text` and so on — change them there, in all three
languages, and the slider picks them up.

---

## 6. Languages

A language selector sits in the dark bar at the top of every page (and the
mobile menu). It switches English, Russian and German instantly, remembers the
choice, and also responds to `?lang=ru` in the address.

All the translated text is in **one file**: `js/i18n-data.js`. Each language is
a block of `'key': 'text'` lines. **Change only the text to the right of the
colon.** English is the fallback: if a key is missing from Russian or German,
the English text appears instead, so nothing ever breaks.

> **The Russian and German text is a working draft and has not been checked by
> a native speaker.** The brief requires reviewed translations before launch.
> Please have both read through, and correct them in `js/i18n-data.js`.
>
> The translated surface is the site's navigation, buttons, hero captions,
> section headings and the whole enquiry form. **Longer body paragraphs on the
> inner pages are still English in every language.** If the owner wants those
> translated too, each paragraph needs a `data-i18n="..."` attribute in the
> HTML and a matching entry in `js/i18n-data.js`; I am happy to quote for that
> once approved translations exist.

---

## 7. Editing text and images

Every page is a plain HTML file. Open it in a text editor, find the words you
can see on the website, change them, save, and upload.

Two things to be careful of:

- Leave anything inside `<` `>` alone — that is the markup.
- If a piece of text has `data-i18n="something"` on its tag, the language
  switcher will overwrite it. Change that text in `js/i18n-data.js` instead.

The repeated parts of each page — the top bar, menu, footer, WhatsApp button
and photo viewer — are copied into every file. If you change the menu, change
it in all ten HTML files so they stay consistent.

---

## 8. Hosting checklist

- Upload the entire folder to the web root (`public_html` on most hosts).
- Enable **HTTPS/SSL** (free with Let's Encrypt on virtually every host).
  The included `.htaccess` redirects `http` to `https` on Apache hosts.
  If the host does not use Apache, set up the redirect in its control panel.
- Point the `404.html` page at not-found errors (`.htaccess` already does this
  on Apache).
- Update the domain in `sitemap.xml`, `robots.txt` and the `<link rel="canonical">`
  and `og:url` tags at the top of each HTML file if the final domain is not
  `pinnawalaelephanttour.com`.
- Submit `sitemap.xml` to Google Search Console.
- Set up **regular backups** with the host — the whole site is just files, so
  a copy of the folder is a complete backup.
- **Analytics**: nothing is installed. The brief requires owner approval and a
  privacy/cookie notice first. The site sets no cookies and loads no trackers
  as delivered — only Google Fonts. If a cookie banner is wanted later, it
  must be added along with a privacy page.

---

## 9. What has been built and tested

- Four-slide hero using elephant photographs only, with fade and slow zoom,
  arrows, progress dots, autoplay that pauses on hover and when the tab is
  hidden, keyboard arrows and touch swipe.
- Accommodation sections for both properties using their real photographs,
  with amenity lists limited to what could be verified.
- Gallery of 64 photographs with six category filters, hover captions and a
  full lightbox (keyboard, swipe, focus trap). Each photo strip pages within
  its own group.
- Location section with addresses, plus codes, telephone and email for both
  properties and a "getting here" panel. **No Google Map is embedded**, as
  instructed.
- Enquiry form with every field the brief lists, inline validation, spam
  honeypot and a confirmation message.
- Responsive from 320px up; tested at phone, tablet and desktop widths with no
  horizontal scrolling.
- One `<h1>` per page, descriptive `alt` text on every photograph, skip link,
  visible focus rings, `prefers-reduced-motion` respected.
- Page titles, meta descriptions, canonical URLs, Open Graph tags, sitemap and
  robots file in place.
- Images served as WebP with JPEG fallback, correctly sized, lazy-loaded below
  the fold, with width and height set so the page does not jump while loading.

## 10. Not included

The brief lists these as not-yet-confirmed requirements, so they are **not**
built: live availability calendar, payment gateway, instant booking engine,
automated confirmation emails, and a content management system. The site is
edited by changing the files. If the owner wants a CMS or any of the above,
they should be quoted separately.

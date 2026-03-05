# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

**The entire site MUST be in Spanish.** All user-facing text — HTML, data.json content, meta descriptions, alt text, button labels — must be in Spanish. Code comments and CLAUDE.md stay in English.

## Project

Single-page portfolio website for a miniature painter (alaisa.art). Vanilla HTML/CSS/JS with no build tools or dependencies. Deployed to GitHub Pages.

## Development

```bash
# Local dev server (required — fetch won't work with file:// protocol)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

No package.json, no build step, no linting, no tests. Push to GitHub and Pages serves it.

## Architecture

All content is driven from `data.json`. JavaScript fetches it at runtime and renders everything.

- `data.json` — single source of truth for all content (gallery items, about, contact, commissions toggle)
- `index.html` — semantic HTML structure with empty containers populated by JS
- `style.css` — full visual identity using CSS custom properties, grid, media queries
- `script.js` — IIFE that fetches data.json and renders gallery (with category tabs + click-to-expand), about, contact, footer

## Content Updates

Edit `data.json` only — no HTML changes needed:
- **Add gallery piece:** append to `gallery[]` array with `{title, image, category, description}`
- **New category:** use a new `category` value — tab auto-creates
- **Toggle commissions:** flip `commissions.open` between `true`/`false`
- **Add social link:** append to `contact.social[]` (new icon SVGs must be added to `script.js` icons object)

## Design System

CSS custom properties in `:root` — cozy 1980s atelier aesthetic:
- `--bg: #F5F0E8` (parchment), `--text: #3B2F2F` (warm brown), `--accent: #C4943E` (amber), `--divider: #B87A5E` (terracotta), `--link: #A07830` (deep gold)
- Fonts: Playfair Display (headings, small-caps nav) + Source Serif 4 (body)
- Responsive: 3-col gallery > 900px, 2-col > 600px, 1-col mobile

## Key Conventions

- BEM-inspired class naming (`.gallery-item`, `.gallery-item-info`)
- Inline SVG icons embedded as strings in `script.js`
- Images go in `images/gallery/` (paintings) or `images/site/` (hero, about)
- Currently using placeholder SVGs — replace with real photos

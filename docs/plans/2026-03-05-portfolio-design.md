# Alaisa.art — Miniature Painting Portfolio

## Concept

A simple, elegant, single-page portfolio for a miniature painter. Cozy 1980s atelier aesthetic — warm, inviting, personality-driven. Vanilla HTML/CSS/JS, deployed to GitHub Pages.

## Architecture

```
alaisa.art/
├── index.html          ← single page, all sections
├── style.css           ← all styling
├── script.js           ← gallery rendering from JSON, zoom behavior
├── data.json           ← gallery entries + site config
├── images/
│   ├── gallery/        ← miniature photos
│   └── site/           ← hero image, textures, about photo
└── CNAME               ← custom domain
```

Single page, anchor-scroll navigation. No build step, no frameworks.

## data.json Structure

```json
{
  "site": {
    "name": "Alaisa",
    "tagline": "Miniature painting with love"
  },
  "commissions": {
    "open": true,
    "message": "Open for commissions"
  },
  "about": {
    "image": "images/site/about.jpg",
    "text": "Short bio text here..."
  },
  "contact": {
    "email": "hello@alaisa.art",
    "social": [
      { "name": "Instagram", "url": "https://instagram.com/..." }
    ]
  },
  "gallery": [
    {
      "title": "Piece Name",
      "image": "images/gallery/piece.jpg",
      "category": "Warhammer 40K",
      "description": "Optional short description"
    }
  ]
}
```

## Visual Design

### Color Palette

| Role             | Color     | Hex       |
|------------------|-----------|-----------|
| Background       | Parchment | `#F5F0E8` |
| Text             | Warm brown| `#3B2F2F` |
| Accent           | Amber/gold| `#C4943E` |
| Dividers         | Terracotta| `#B87A5E` |
| Links/hover      | Deep gold | `#A07830` |

### Typography

- **Headings:** Playfair Display (serif, 80s editorial feel)
- **Body:** Source Serif 4 (warm, readable)
- **Nav:** Playfair Display in small caps

### Texture & Details

- Subtle paper grain texture on background
- Thin terracotta horizontal rules between sections
- Slightly rounded image corners with soft box shadow
- Gallery thumbnails lift on hover (transform + shadow)

## Sections

### Hero

- Full-width warm-toned banner (painting desk, brushes, or featured miniature)
- "Alaisa" in large Playfair Display
- Tagline underneath
- Nav links: Gallery · About · Contact

### Gallery

- Category tabs at top (pulled from data.json categories)
- Styled like vintage paper tabs
- 3-column grid (desktop) → 2 (tablet) → 1 (mobile)
- Click thumbnail → inline expand with smooth animation showing full image + title + description
- Click again or elsewhere → collapse

### About

- Two-column: photo + text
- Stacks on mobile

### Contact

- Social links with icons
- Email link
- Commissions status (driven by data.json toggle)

### Footer

- Minimal credit line and year

## Commissions Toggle

Controlled via `data.json`:
- `"open": true` → shows "Open for commissions"
- `"open": false` → shows "Commissions currently closed" (or hides)

One-line edit, no HTML changes needed.

## Responsive Breakpoints

- Desktop: > 900px (3-col gallery, side-by-side about)
- Tablet: 600-900px (2-col gallery, stacked about)
- Mobile: < 600px (1-col everything)

## Deployment

Push to GitHub → GitHub Pages serves it. CNAME file for custom domain.

# Alaisa.art Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page miniature painting portfolio with cozy 80s atelier aesthetic, data-driven gallery, and GitHub Pages deployment.

**Architecture:** Single HTML page with vanilla CSS and JS. All content driven from `data.json`. No build tools, no frameworks. Gallery renders dynamically from JSON, everything else is structured HTML styled with CSS.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, transitions), vanilla JavaScript (fetch, DOM manipulation), Google Fonts (Playfair Display, Source Serif 4).

---

### Task 1: Project scaffolding and data.json

**Files:**
- Create: `data.json`
- Create: `images/gallery/.gitkeep`
- Create: `images/site/.gitkeep`

**Step 1: Create directory structure**

Run: `mkdir -p images/gallery images/site`

**Step 2: Create data.json with sample content**

```json
{
  "site": {
    "name": "Alaisa",
    "tagline": "Miniature painting with love"
  },
  "commissions": {
    "open": true,
    "messageOpen": "Open for commissions",
    "messageClosed": "Commissions currently closed"
  },
  "about": {
    "image": "images/site/about.jpg",
    "text": "Hello! I'm Alaisa, a miniature painter who brings tiny worlds to life with brush and paint. What started as a hobby has become a passion — each piece is a labor of love, painted with care and attention to every tiny detail."
  },
  "contact": {
    "email": "hello@alaisa.art",
    "social": [
      { "name": "Instagram", "url": "https://instagram.com/alaisa.art", "icon": "instagram" }
    ]
  },
  "gallery": [
    {
      "title": "Space Marine Captain",
      "image": "images/gallery/sample1.jpg",
      "category": "Warhammer 40K",
      "description": "Custom color scheme with NMM gold details"
    },
    {
      "title": "Stormcast Eternal",
      "image": "images/gallery/sample2.jpg",
      "category": "Age of Sigmar",
      "description": "Ethereal glow effect on the weapon"
    },
    {
      "title": "Goblin Shaman",
      "image": "images/gallery/sample3.jpg",
      "category": "D&D",
      "description": "Freehand runes on the staff"
    }
  ]
}
```

**Step 3: Create .gitkeep files for empty image dirs**

Run: `touch images/gallery/.gitkeep images/site/.gitkeep`

**Step 4: Commit**

```bash
git init
git add data.json images/
git commit -m "feat: project scaffolding with data.json and image directories"
```

---

### Task 2: HTML structure (index.html)

**Files:**
- Create: `index.html`

**Step 1: Create index.html with full semantic structure**

The HTML includes all sections (hero, gallery, about, contact, footer) as empty semantic containers. The gallery will be populated by JS. Other sections have static structure with placeholder content that matches the data.json shape.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alaisa — Miniature Painting</title>
  <meta name="description" content="Miniature painting portfolio by Alaisa. Hand-painted miniatures with love and care.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Hero -->
  <header id="hero">
    <div class="hero-content">
      <h1 class="site-name">Alaisa</h1>
      <p class="tagline">Miniature painting with love</p>
      <nav class="main-nav">
        <a href="#gallery">Gallery</a>
        <span class="nav-dot">&middot;</span>
        <a href="#about">About</a>
        <span class="nav-dot">&middot;</span>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Gallery -->
  <section id="gallery">
    <h2 class="section-title">Gallery</h2>
    <div class="gallery-tabs" role="tablist"></div>
    <div class="gallery-grid"></div>
  </section>

  <!-- About -->
  <section id="about">
    <h2 class="section-title">About</h2>
    <div class="about-content">
      <div class="about-image">
        <img src="" alt="Alaisa at work" id="about-photo">
      </div>
      <div class="about-text" id="about-text"></div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact">
    <h2 class="section-title">Contact</h2>
    <div class="contact-content">
      <div class="commissions-status" id="commissions"></div>
      <div class="contact-links" id="contact-links"></div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; <span id="year"></span> Alaisa</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

**Step 2: Verify it loads**

Open `index.html` in a browser — should see unstyled but structured content with section headings.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: HTML structure with all sections"
```

---

### Task 3: CSS — Base styles and cozy atelier aesthetic

**Files:**
- Create: `style.css`

**Step 1: Create style.css with custom properties, reset, typography, and layout**

This is the core of the visual identity. Includes:
- CSS custom properties for the color palette
- Minimal reset
- Typography (Playfair Display headings, Source Serif 4 body)
- Paper texture background (CSS-generated grain)
- Section layout and spacing
- Terracotta dividers between sections

```css
/* === Custom Properties === */
:root {
  --bg: #F5F0E8;
  --text: #3B2F2F;
  --accent: #C4943E;
  --divider: #B87A5E;
  --link: #A07830;
  --shadow: rgba(59, 47, 47, 0.12);
  --radius: 6px;
}

/* === Reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* === Body & Paper Texture === */
body {
  font-family: 'Source Serif 4', 'Georgia', serif;
  color: var(--text);
  background-color: var(--bg);
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  line-height: 1.7;
  font-size: 18px;
  font-weight: 300;
}

/* === Typography === */
h1, h2, h3 {
  font-family: 'Playfair Display', 'Georgia', serif;
  font-weight: 700;
  line-height: 1.2;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

a {
  color: var(--link);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--accent);
}

/* === Layout === */
section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
  border-bottom: 1px solid var(--divider);
}

section:last-of-type {
  border-bottom: none;
}

/* === Hero === */
#hero {
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  border-bottom: 1px solid var(--divider);
}

.site-name {
  font-size: 4.5rem;
  letter-spacing: 0.05em;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.tagline {
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  font-size: 1.2rem;
  color: var(--divider);
  margin-bottom: 2rem;
}

.main-nav {
  font-family: 'Playfair Display', serif;
  font-variant: small-caps;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
}

.main-nav a {
  color: var(--text);
  padding: 0.3em 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, color 0.2s;
}

.main-nav a:hover {
  border-bottom-color: var(--accent);
  color: var(--accent);
}

.nav-dot {
  margin: 0 1rem;
  color: var(--divider);
}

/* === Gallery === */
.gallery-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.gallery-tab {
  font-family: 'Playfair Display', serif;
  font-variant: small-caps;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  padding: 0.4rem 1.2rem;
  border: 1px solid var(--divider);
  border-bottom: none;
  border-radius: var(--radius) var(--radius) 0 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.gallery-tab:hover,
.gallery-tab.active {
  background: var(--divider);
  color: var(--bg);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow);
  transition: transform 0.25s, box-shadow 0.25s;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px var(--shadow);
}

.gallery-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.gallery-item-info {
  padding: 0.8rem 1rem;
  background: rgba(245, 240, 232, 0.95);
}

.gallery-item-info h3 {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.gallery-item-info p {
  font-size: 0.85rem;
  color: var(--divider);
  font-style: italic;
}

/* Expanded state */
.gallery-item.expanded {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.gallery-item.expanded img {
  aspect-ratio: auto;
  max-height: 500px;
  object-fit: contain;
  background: var(--text);
}

.gallery-item.expanded .gallery-item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.gallery-item.expanded .gallery-item-info p {
  font-size: 1rem;
  margin-top: 0.5rem;
}

/* === About === */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: center;
}

.about-image img {
  width: 100%;
  border-radius: var(--radius);
  box-shadow: 0 4px 16px var(--shadow);
}

.about-text p {
  margin-bottom: 1rem;
}

/* === Contact === */
.contact-content {
  text-align: center;
}

.commissions-status {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  display: inline-block;
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  color: var(--accent);
}

.commissions-status.closed {
  border-color: var(--divider);
  color: var(--divider);
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.contact-link svg {
  width: 20px;
  height: 20px;
  fill: var(--link);
  transition: fill 0.2s;
}

.contact-link:hover svg {
  fill: var(--accent);
}

/* === Footer === */
footer {
  text-align: center;
  padding: 2rem;
  font-size: 0.85rem;
  color: var(--divider);
}

/* === Responsive === */
@media (max-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-item.expanded {
    grid-template-columns: 1fr;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .site-name {
    font-size: 3.5rem;
  }
}

@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .site-name {
    font-size: 2.8rem;
  }

  section {
    padding: 3rem 1.2rem;
  }

  #hero {
    padding: 4rem 1.2rem 3rem;
  }
}

/* === Smooth Scroll === */
html {
  scroll-behavior: smooth;
}
```

**Step 2: Verify in browser**

Open `index.html` — should see the warm parchment background, paper texture, Playfair Display heading, terracotta dividers. Cozy atelier feel.

**Step 3: Commit**

```bash
git add style.css
git commit -m "feat: CSS with cozy 80s atelier aesthetic"
```

---

### Task 4: JavaScript — Data loading, gallery rendering, interactions

**Files:**
- Create: `script.js`

**Step 1: Create script.js with all functionality**

Handles:
- Fetching and parsing `data.json`
- Rendering gallery with category tabs
- Inline expand/collapse on click
- Populating about section
- Populating contact section with commissions toggle
- Setting footer year

```javascript
(async function () {
  const data = await fetch('data.json').then(r => r.json());

  // --- Site ---
  document.querySelector('.site-name').textContent = data.site.name;
  document.querySelector('.tagline').textContent = data.site.tagline;
  document.title = `${data.site.name} — Miniature Painting`;

  // --- Gallery ---
  const grid = document.querySelector('.gallery-grid');
  const tabsContainer = document.querySelector('.gallery-tabs');
  const categories = ['All', ...new Set(data.gallery.map(item => item.category))];

  // Build tabs
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'gallery-tab' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat;
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => filterGallery(cat));
    tabsContainer.appendChild(btn);
  });

  function renderGallery(items) {
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-info">
          <h3>${item.title}</h3>
          <p>${item.description || ''}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        const wasExpanded = card.classList.contains('expanded');
        grid.querySelectorAll('.gallery-item.expanded').forEach(el => el.classList.remove('expanded'));
        if (!wasExpanded) {
          card.classList.add('expanded');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      grid.appendChild(card);
    });
  }

  function filterGallery(category) {
    tabsContainer.querySelectorAll('.gallery-tab').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === category);
    });
    const filtered = category === 'All'
      ? data.gallery
      : data.gallery.filter(item => item.category === category);
    renderGallery(filtered);
  }

  renderGallery(data.gallery);

  // --- About ---
  const aboutPhoto = document.getElementById('about-photo');
  const aboutText = document.getElementById('about-text');
  if (data.about) {
    aboutPhoto.src = data.about.image;
    aboutText.innerHTML = data.about.text.split('\n').map(p => `<p>${p}</p>`).join('');
  }

  // --- Contact ---
  const commissionsEl = document.getElementById('commissions');
  if (data.commissions) {
    commissionsEl.textContent = data.commissions.open
      ? data.commissions.messageOpen
      : data.commissions.messageClosed;
    if (!data.commissions.open) commissionsEl.classList.add('closed');
  }

  const contactLinks = document.getElementById('contact-links');
  const icons = {
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
  };

  if (data.contact.email) {
    const a = document.createElement('a');
    a.className = 'contact-link';
    a.href = `mailto:${data.contact.email}`;
    a.innerHTML = `${icons.email}<span>${data.contact.email}</span>`;
    contactLinks.appendChild(a);
  }

  data.contact.social.forEach(s => {
    const a = document.createElement('a');
    a.className = 'contact-link';
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `${icons[s.icon] || ''}<span>${s.name}</span>`;
    contactLinks.appendChild(a);
  });

  // --- Footer Year ---
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Click outside gallery to collapse ---
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.gallery-item')) {
      grid.querySelectorAll('.gallery-item.expanded').forEach(el => el.classList.remove('expanded'));
    }
  });
})();
```

**Step 2: Test in browser with a local server**

Run: `python3 -m http.server 8000` (fetch won't work with file:// protocol)

Open `http://localhost:8000` — should see:
- Gallery tabs rendered from categories
- Gallery grid with sample items (images will be broken — that's fine)
- About section populated
- Contact section with commissions status and links
- Footer with current year

**Step 3: Commit**

```bash
git add script.js
git commit -m "feat: JS for data-driven gallery, about, contact, and interactions"
```

---

### Task 5: Placeholder images and final polish

**Files:**
- Create: placeholder images using simple colored SVGs
- Modify: `style.css` (minor tweaks if needed)

**Step 1: Generate placeholder SVG images for development**

Create simple colored placeholder images so the site looks complete during development. These will be replaced with real photos later.

Run a small script to create placeholder SVGs:

```bash
# Gallery placeholders
for i in 1 2 3; do
  cat > "images/gallery/sample${i}.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect fill="#D4C5B0" width="600" height="600"/>
  <text x="300" y="300" text-anchor="middle" fill="#8B7355" font-family="Georgia" font-size="24">Miniature Photo</text>
</svg>
SVGEOF
done

# About placeholder
cat > "images/site/about.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <rect fill="#D4C5B0" width="600" height="800"/>
  <text x="300" y="400" text-anchor="middle" fill="#8B7355" font-family="Georgia" font-size="24">About Photo</text>
</svg>
SVGEOF
```

**Step 2: Update data.json image paths to use .svg placeholders**

Change image extensions from `.jpg` to `.svg` in `data.json` for the placeholder phase.

**Step 3: Test the complete site**

Run: `python3 -m http.server 8000`

Verify:
- Hero with name, tagline, nav
- Gallery tabs work, grid renders, click-to-expand works
- About section shows placeholder + text
- Contact shows commissions status + links
- Responsive at all breakpoints
- Smooth scroll navigation

**Step 4: Commit**

```bash
git add images/ data.json
git commit -m "feat: placeholder images and complete working site"
```

---

### Task 6: GitHub Pages deployment setup

**Files:**
- Create: `CNAME`
- Create: `.gitignore`

**Step 1: Create CNAME for custom domain**

```
alaisa.art
```

**Step 2: Create .gitignore**

```
.DS_Store
*.swp
*~
```

**Step 3: Commit and push**

```bash
git add CNAME .gitignore
git commit -m "feat: GitHub Pages deployment config"
```

Then push to GitHub and enable GitHub Pages in repo settings (source: main branch, root folder).

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Scaffolding + data.json | `data.json`, `images/` |
| 2 | HTML structure | `index.html` |
| 3 | CSS aesthetic | `style.css` |
| 4 | JavaScript interactions | `script.js` |
| 5 | Placeholders + polish | `images/`, `data.json` |
| 6 | Deployment setup | `CNAME`, `.gitignore` |

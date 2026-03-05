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

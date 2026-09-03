const tiles = document.querySelectorAll('.art-image img, .art-image video');
const lightbox = document.getElementById('lightbox');

// Lightbox-only process shots, built at compile time. [{ group, src, caption, video?, w?, h? }]
let SHOTS = [];
try {
  SHOTS = JSON.parse(document.getElementById('lightbox-shots')?.textContent || '[]');
} catch (e) {
  SHOTS = [];
}

let currentGroup = []; // [{ src, caption, video?, isProcess? }]
let currentIndex = 0;
let lastFocused = null;

lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Artwork viewer');
lightbox.tabIndex = -1;

// --- Lazy-load the gallery's autoplay <video>s only as they near the viewport ---
const lazyVideos = document.querySelectorAll('video.lazy-video');

function loadVideo(v) {
  if (!v.dataset.src || v.src) return;
  v.src = v.dataset.src;
  v.load();
  v.play().catch(() => {});
}

if (lazyVideos.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadVideo(entry.target);
        obs.unobserve(entry.target);
      }
    },
    { rootMargin: '400px' }
  );
  lazyVideos.forEach((v) => io.observe(v));
} else {
  lazyVideos.forEach(loadVideo);
}

// --- Tiles: operable by mouse and keyboard ---
tiles.forEach((el) => {
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  if (!el.getAttribute('aria-label')) {
    el.setAttribute('aria-label', (el.dataset.caption || el.alt || 'Artwork') + ' — open larger view');
  }
  el.addEventListener('click', () => openLightbox(el));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(el);
    }
  });
});

function itemFromTile(el) {
  if (el.tagName.toLowerCase() === 'video') {
    return { src: el.dataset.src || el.currentSrc || el.src, caption: el.dataset.caption, video: true };
  }
  return { src: el.dataset.full || el.currentSrc || el.src, caption: el.dataset.caption };
}

function openLightbox(el) {
  lastFocused = el;
  const group = el.dataset.group;
  const shots = SHOTS.filter((s) => s.group === group).map((s) => ({ ...s, isProcess: true }));
  currentGroup = [itemFromTile(el), ...shots];
  currentIndex = 0;
  showMedia(currentGroup[0], currentGroup.length > 1);
  lightbox.focus();
}

function closeLightbox() {
  lightbox.classList.remove('visible');
  lightbox.innerHTML = '';
  if (lastFocused) {
    lastFocused.focus();
    lastFocused = null;
  }
}

function step(delta) {
  if (currentGroup.length < 2) return;
  currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
  showMedia(currentGroup[currentIndex], true);
  const btn = lightbox.querySelector(delta > 0 ? '.next' : '.prev');
  if (btn) btn.focus();
}

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('visible')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
  else if (e.key === 'Tab') trapFocus(e);
});

// Keep Tab focus within the lightbox while it is open.
function trapFocus(e) {
  const focusables = lightbox.querySelectorAll('button');
  if (!focusables.length) {
    e.preventDefault();
    lightbox.focus();
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  } else if (![...focusables].includes(document.activeElement)) {
    e.preventDefault();
    first.focus();
  }
}

function showMedia(item, showButtons = false) {
  lightbox.classList.add('visible');
  lightbox.innerHTML = '';

  // Main gallery images sit borderless; process shots keep a frame.
  if (item.video) {
    const video = document.createElement('video');
    video.src = item.src;
    video.autoplay = true;
    video.loop = true;
    video.controls = true;
    video.muted = true;
    if (item.isProcess) video.classList.add('process');
    lightbox.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.caption || '';
    if (item.isProcess) img.classList.add('process');
    lightbox.appendChild(img);
  }

  // Add navigation buttons
  if (showButtons) {
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'nav prev';
    prevBtn.textContent = '‹';
    prevBtn.setAttribute('aria-label', 'Previous');

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'nav next';
    nextBtn.textContent = '›';
    nextBtn.setAttribute('aria-label', 'Next');

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      step(-1);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      step(1);
    });

    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
  }

  // Add caption
  if (item.caption) {
    const caption = document.createElement('p');
    caption.id = 'lightbox-caption';
    caption.textContent = item.caption;
    lightbox.appendChild(caption);
  }
}

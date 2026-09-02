const images = document.querySelectorAll('.art-image img, .art-image video');
const lightbox = document.getElementById('lightbox');

let currentGroup = [];
let currentIndex = 0;
let lastFocused = null;

lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Artwork viewer');
lightbox.tabIndex = -1;

// Make each tile operable by mouse and keyboard.
images.forEach((el) => {
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

function openLightbox(el) {
  lastFocused = el;
  const groupName = el.dataset.group;
  const hiddenImages = document.getElementById('hidden-images');
  currentGroup = groupName
    ? Array.from(hiddenImages.querySelectorAll(`[data-group="${groupName}"]`))
    : [];
  currentGroup.unshift(el);
  currentIndex = 0;
  showMedia(currentGroup[currentIndex], currentGroup.length > 1);
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

function showMedia(el, showButtons = false) {
  lightbox.classList.add('visible');
  lightbox.innerHTML = '';

  // Check the media type
  // Main gallery images sit borderless; process shots (from #hidden-images) keep a frame.
  const isProcess = !!el.closest('#hidden-images');

  if (el.tagName.toLowerCase() === 'img') {
    const img = document.createElement('img');
    img.src = el.src;
    img.alt = el.alt || el.dataset.caption || '';
    if (isProcess) img.classList.add('process');
    lightbox.appendChild(img);
  } else if (el.tagName.toLowerCase() === 'video') {
    const video = document.createElement('video');
    video.src = el.querySelector('source')?.src || el.src;
    video.autoplay = true;
    video.loop = true;
    video.controls = true;
    video.muted = true;
    if (isProcess) video.classList.add('process');
    lightbox.appendChild(video);
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
  const captionText = el.dataset.caption;
  if (captionText) {
    const caption = document.createElement('p');
    caption.id = 'lightbox-caption';
    caption.textContent = captionText;
    lightbox.appendChild(caption);
  }
}

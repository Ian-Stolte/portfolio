
const images = document.querySelectorAll('.art-image img, .art-image video');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightbox.classList.add('visible');
  });
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('visible');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('visible');
  }
});
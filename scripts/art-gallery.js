
const images = document.querySelectorAll('.art-image img, .art-image video');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');

images.forEach(el => {
  el.addEventListener('click', () => {
    lightbox.classList.add('visible');
    lightbox.innerHTML = '';

    // Check the tag type
    if (el.tagName.toLowerCase() === 'img') {
      const img = document.createElement('img');
      img.src = el.src;
      lightbox.appendChild(img);
    } else if (el.tagName.toLowerCase() === 'video') {
      const video = document.createElement('video');
      video.src = el.querySelector('source')?.src || el.src;
      console.log(video.src);
      video.autoplay = true;
      video.loop = true;
      video.controls = true;
      lightbox.appendChild(video);
    }
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
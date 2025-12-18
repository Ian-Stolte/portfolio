
const images = document.querySelectorAll('.art-image img, .art-image video');
const lightbox = document.getElementById('lightbox');
/*const lightboxContent = document.getElementById('lightbox-content');*/

let currentGroup = [];
let currentIndex = 0;

images.forEach((el, idx) => {
  el.addEventListener('click', () => {
    const groupName = el.dataset.group;
    const hiddenImages = document.getElementById('hidden-images');
    currentGroup = groupName ? Array.from(hiddenImages.querySelectorAll(`[data-group="${groupName}"]`)) : [];
    currentGroup.unshift(el);
    currentIndex = currentGroup.indexOf(el);
    showMedia(currentGroup[currentIndex], currentGroup.length > 1);
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


function showMedia(el, showButtons=false) {
  lightbox.classList.add('visible');
  lightbox.innerHTML = '';

  // Check the media type
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
    video.muted = true;
    lightbox.appendChild(video);
  }

  //Add navigation buttons
  if (showButtons)
  {
    const prevBtn = document.createElement('span');
    prevBtn.className = 'nav prev';
    prevBtn.textContent = '‹';

    const nextBtn = document.createElement('span');
    nextBtn.className = 'nav next';
    nextBtn.textContent = '›';

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
      showMedia(currentGroup[currentIndex], true);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % currentGroup.length;
      showMedia(currentGroup[currentIndex], true);
    });

    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
  }

  //Add caption
  const captionText = el.dataset.caption;
  if (captionText) {
    const caption = document.createElement('p');
    caption.id = 'lightbox-caption';
    caption.textContent = captionText;
    lightbox.appendChild(caption);
  }
}
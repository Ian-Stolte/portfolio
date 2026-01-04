const headers = document.querySelectorAll('.accordion-header');

headers.forEach((el) => {
    const panel = el.nextElementSibling;
    const indicator = el.querySelector('span');

    el.addEventListener('click', () => {
        const isOpen = el.getAttribute('aria-expanded') === 'true';
        el.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
            openPanel(panel, indicator);
        } else {
            closePanel(panel, indicator);
        }
    });
});

function openPanel(panel, indicator) {
    panel.style.height = '0px';
    const height = panel.scrollHeight;
    panel.style.height = height + 'px';

    indicator.textContent = "–";

    panel.addEventListener('transitionend', function handler() {
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', handler);
    });
}

function closePanel(panel, indicator) {
    panel.style.height = panel.scrollHeight + 'px';
    panel.offsetHeight; // force reflow
    panel.style.height = '0px';

    indicator.textContent = "+";
}

/* Fade elements in as they scroll into view. Three modes, passed as the 4th
   arg to reveal():
     (default) — fades back out when scrolled past, then back in on return.
     'dim'     — same, but "scrolled past" dims to partial opacity (via a
                 permanent `.was-visible` class) instead of vanishing, and
                 hiding is debounced so a quick scroll up-and-back doesn't
                 flicker it.
     'once'    — fades in and stays; never fades back out.
   Progressive enhancement: if this never runs, or IntersectionObserver is
   missing, or the user prefers reduced motion, everything is shown immediately
   (the `.reveal` styles only hide elements that JS can later reveal). */
(function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var noIO = !('IntersectionObserver' in window);
    var HIDE_DELAY = 250; // ms grace period before dimming/hiding on exit

    function reveal(nodes, options, mode) {
        if (!nodes.length) return;

        if (reduceMotion || noIO) {
            nodes.forEach(function (el) {
                el.classList.add('is-visible');
                if (mode === 'dim') el.classList.add('was-visible');
            });
            return;
        }

        var hideTimers = new WeakMap();

        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                var el = entry.target;

                if (mode === 'once') {
                    if (!entry.isIntersecting) return;
                    el.classList.add('is-visible');
                    obs.unobserve(el);
                    return;
                }

                if (entry.isIntersecting) {
                    // Cancel a pending hide from a moment ago, if any.
                    var pending = hideTimers.get(el);
                    if (pending) {
                        clearTimeout(pending);
                        hideTimers.delete(el);
                    }
                    el.classList.add('is-visible');
                    if (mode === 'dim') el.classList.add('was-visible');
                } else if (!hideTimers.has(el)) {
                    hideTimers.set(el, setTimeout(function () {
                        el.classList.remove('is-visible');
                        hideTimers.delete(el);
                    }, HIDE_DELAY));
                }
            });
        }, options);

        nodes.forEach(function (el) { io.observe(el); });
    }

    // Cards: pop in as soon as they edge into view, fade back out on exit.
    reveal(document.querySelectorAll('.game-card'), {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.15
    });

    // About Me: only counts as visible once its top has scrolled up past ~75%
    // of the viewport, so it reveals a beat after the last row of cards.
    reveal(document.querySelectorAll('#aboutme'), {
        rootMargin: '0px 0px -25% 0px',
        threshold: 0
    });

    // Art gallery tiles: pop in; dim (not vanish) once scrolled past. The
    // first couple of tiles per column also get a CSS transition-delay (see
    // art.css) so the on-load batch mosaics in instead of fading as one block.
    reveal(document.querySelectorAll('.art-image'), {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.5
    }, 'dim');

    // Section headings (heading + tool tag + rule, as one unit): same dim
    // treatment as the tiles.
    reveal(document.querySelectorAll('.section-heading'), {
        rootMargin: '0px 0px -8% 0px',
        threshold: 1
    }, 'dim');
})();

/* LFAEA motion layer — dependency-free, accessible and GitHub Pages compatible. */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const revealSelector = [
    '.hero-copy', '.hero-visual', '.callout-strip', '.section-heading',
    '.metric-card', '.rank-row', '.panel', '.coverage-card',
    '.investigation-card', '.data-card', '.source-row', '.audit-item',
    '.source-document', '.page-intro', '.studio-kpi', '.twin-info',
    '.assistant-side .panel', '.page-footer', '.method-card',
    '.source-bundle-panel', '.workbook-links-wrap'
  ].join(',');

  let observer = null;
  const reveal = (root = document) => {
    const nodes = [];
    if (root.nodeType === 1 && root.matches?.(revealSelector)) nodes.push(root);
    root.querySelectorAll?.(revealSelector).forEach(node => nodes.push(node));

    nodes.forEach((node, index) => {
      if (node.dataset.motionReady === '1') return;
      node.dataset.motionReady = '1';
      node.classList.add('motion-reveal', 'motion-spotlight');
      // A small stagger gives grids a deliberate, editorial rhythm.
      const siblings = node.parentElement ? [...node.parentElement.children].filter(el => el.matches?.(revealSelector)) : [];
      const stagger = Math.max(0, Math.min(5, siblings.indexOf(node)));
      node.style.setProperty('--motion-delay', `${stagger * 65}ms`);
      if (observer) observer.observe(node);
      else node.classList.add('is-visible');
    });
  };

  document.documentElement.classList.add('motion-enabled');
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('motion-ready');

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    }

    reveal(document);

    // Observe app-rendered cards and data views that are inserted after navigation.
    const mutationObserver = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) reveal(node);
      }));
    });
    const main = document.querySelector('.main-shell');
    if (main) mutationObserver.observe(main, { childList: true, subtree: true });

    // Pointer-following light stays inside cards; it is decorative only.
    document.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const card = event.target.closest?.('.motion-spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    }, { passive: true });

    // Lightweight click ripple for buttons and navigation controls.
    document.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch') return;
      const control = event.target.closest?.('button, .nav-item, .meta-pill');
      if (!control || control.disabled) return;
      const rect = control.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'motion-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      control.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }, { passive: true });

    // Re-enter page content smoothly whenever the user changes workspace view.
    document.addEventListener('click', event => {
      const nav = event.target.closest?.('[data-page]');
      if (!nav) return;
      window.setTimeout(() => {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;
        activePage.classList.remove('motion-page-enter');
        // Force a style boundary so the short entrance can replay on each visit.
        void activePage.offsetWidth;
        activePage.classList.add('motion-page-enter');
        reveal(activePage);
      }, 30);
    });

    // Reveal the selected page immediately on initial load.
    requestAnimationFrame(() => {
      document.querySelectorAll('.page.active .motion-reveal').forEach(node => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.15) node.classList.add('is-visible');
      });
    });
  }, { once: true });
})();

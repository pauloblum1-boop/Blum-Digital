/* ═══════════════════════════════════════════════════════
   BLUM Digital — main.js
   ═══════════════════════════════════════════════════════ */

/* ── Scroll Reveal ───────────────────────────────────── */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ── Active nav link on scroll ───────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activate = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      if (
        scrollY >= sec.offsetTop &&
        scrollY < sec.offsetTop + sec.offsetHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove('text-brand-accent');
          if (link.getAttribute('href') === '#' + sec.id) {
            link.classList.add('text-brand-accent');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activate, { passive: true });
})();

/* ── Alpine.js collapse plugin fallback ─────────────── */
/* Alpine's x-collapse requires the official plugin.
   This lightweight fallback handles it natively. */
document.addEventListener('alpine:init', () => {
  if (typeof Alpine !== 'undefined' && !Alpine.directive('collapse')) {
    Alpine.directive('collapse', (el) => {
      el.style.overflow = 'hidden';
      el.style.transition = 'max-height 0.35s ease, opacity 0.3s ease';

      const observer = new MutationObserver(() => {
        if (el.style.display === 'none') {
          el.style.maxHeight = '0px';
          el.style.opacity = '0';
        } else {
          el.style.maxHeight = el.scrollHeight + 'px';
          el.style.opacity = '1';
        }
      });
      observer.observe(el, { attributes: true, attributeFilter: ['style'] });
    });
  }
});

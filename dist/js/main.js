/* ═══════════════════════════════════════════════════════
   BLUM Digital — main.js
   ═══════════════════════════════════════════════════════ */

/* ── Scroll Reveal ───────────────────────────────────── */
(function () {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

/* ── Navbar: adapta pill ao scroll ───────────────────── */
(function () {
  const nav = document.querySelector('.nav-pill');
  const update = () => {
    if (!nav) return;
    window.scrollY > 60 ? nav.classList.add('nav-scrolled') : nav.classList.remove('nav-scrolled');
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Anchor precision scroll (100% preciso em qualquer tela) ── */
(function () {
  const header = document.querySelector('header');

  function navHeight() {
    return header ? Math.ceil(header.getBoundingClientRect().height) + 8 : 90;
  }

  /* Mantém scroll-padding-top sincronizado com a altura real do navbar */
  function syncPadding() {
    document.documentElement.style.scrollPaddingTop = navHeight() + 'px';
  }
  syncPadding();
  window.addEventListener('resize', syncPadding, { passive: true });

  /* Intercepta cliques em âncoras e aplica offset preciso */
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;

    let href = a.getAttribute('href');
    if (!href) return;

    /* Suporte a href="/#id" e href="#id" */
    const hashIdx = href.indexOf('#');
    if (hashIdx === -1) return;
    const hash = href.slice(hashIdx);
    const path = href.slice(0, hashIdx) || '/';

    /* Só age se for a mesma página ou raiz */
    const samePage =
      path === '' ||
      path === '/' ||
      location.pathname === path ||
      location.pathname === path + 'index.html';

    if (!samePage) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    history.replaceState(null, '', hash);
  });

  /* Corrige scroll no carregamento inicial quando há hash na URL */
  if (location.hash) {
    window.addEventListener('load', function () {
      const target = document.querySelector(location.hash);
      if (!target) return;
      setTimeout(function () {
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight();
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      }, 80);
    });
  }
})();

/* ── Active nav link ─────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-item');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    sections.forEach((s) => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        links.forEach((l) => {
          l.style.color = l.getAttribute('href') === '#' + s.id ? '#FF7A18' : '';
        });
      }
    });
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════
   SERVICES SLIDER
   ══════════════════════════════════════════════════════ */
(function () {
  const slider = document.getElementById('svcSlider');
  if (!slider) return;

  const track  = slider.querySelector('.svc-track');
  const slides = slider.querySelectorAll('.svc-slide');
  const dots   = slider.querySelectorAll('.svc-dot');
  const total  = slides.length;
  let current  = 0;
  let locked   = false;

  /* ── Core: transição entre slides ─────────────────── */
  function goTo(idx, dir) {
    if (locked) return;
    const next = ((idx % total) + total) % total;
    if (next === current) return;
    locked = true;

    const prev = current;
    current = next;

    /* Classe de saída no slide anterior */
    slides[prev].classList.add(dir >= 0 ? 'exit-left' : 'exit-right');
    slides[prev].classList.remove('active');

    /* Slide entrante: posicionar sem transição, depois animar */
    slides[current].style.transition = 'none';
    slides[current].style.transform  = dir >= 0
      ? 'translateX(56px) scale(0.97)'
      : 'translateX(-56px) scale(0.97)';
    slides[current].style.opacity = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slides[current].style.transition = '';
        slides[current].style.transform  = '';
        slides[current].style.opacity    = '';
        slides[current].classList.add('active');
      });
    });

    /* Limpa classes e libera lock após transição */
    setTimeout(() => {
      slides[prev].classList.remove('exit-left', 'exit-right');
      locked = false;
    }, 650);

    /* Atualiza dots */
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  /* ── Wheel: roda o mouse dentro do slider ──────────── */
  let lastWheel = 0;
  track.addEventListener('wheel', (e) => {
    const now = Date.now();
    const goingDown = e.deltaY > 0;
    const goingUp   = e.deltaY < 0;

    /* Só hijack se ainda tem slides para avançar/retroceder */
    if ((goingDown && current < total - 1) || (goingUp && current > 0)) {
      e.preventDefault();
      if (now - lastWheel < 850) return;
      lastWheel = now;
      goTo(current + (goingDown ? 1 : -1), goingDown ? 1 : -1);
    }
  }, { passive: false });

  /* ── Dots ──────────────────────────────────────────── */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i, i > current ? 1 : -1));
  });

  /* ── Setas ─────────────────────────────────────────── */
  document.getElementById('svcPrev')?.addEventListener('click', () => goTo(current - 1, -1));
  document.getElementById('svcNext')?.addEventListener('click', () => goTo(current + 1, 1));

  /* ── Touch/swipe (mobile) ──────────────────────────── */
  let tx = 0;
  track.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) goTo(current + (diff > 0 ? 1 : -1), diff > 0 ? 1 : -1);
  }, { passive: true });

  /* ── Auto-play suave (8s) — pausa ao hover ─────────── */
  let autoTimer = setInterval(() => goTo(current + 1, 1), 8000);
  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1, 1), 8000);
  });
})();

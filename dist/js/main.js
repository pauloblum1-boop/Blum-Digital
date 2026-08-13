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

/* LGPD Cookie Consent */
(function () {
  const STORAGE_KEY = 'blum_cookie_consent_v1';
  const DEFAULT_CONSENT = {
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
    updatedAt: null
  };

  const optionalKeys = ['analytics', 'marketing', 'functionality'];
  const loaders = { analytics: [], marketing: [], functionality: [] };

  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Object.assign({}, DEFAULT_CONSENT, JSON.parse(raw)) : null;
    } catch (err) {
      return null;
    }
  }

  function runLoaders(consent) {
    optionalKeys.forEach(function (key) {
      if (!consent[key]) return;
      loaders[key].forEach(function (loader) {
        if (loader.loaded) return;
        loader.loaded = true;
        loader.fn(consent);
      });
    });
  }

  function writeConsent(next) {
    const consent = Object.assign({}, DEFAULT_CONSENT, next, {
      necessary: true,
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.BlumCookieConsent.state = consent;
    runLoaders(consent);
    window.dispatchEvent(new CustomEvent('blum:cookie-consent', { detail: consent }));
    return consent;
  }

  function register(category, fn) {
    if (!loaders[category] || typeof fn !== 'function') return;
    const loader = { fn: fn, loaded: false };
    loaders[category].push(loader);
    const consent = readConsent();
    if (consent && consent[category]) {
      loader.loaded = true;
      fn(consent);
    }
  }

  function optionMarkup(name, title, text) {
    return [
      '<article class="cookie-option">',
      '  <div><h3>' + title + '</h3><p>' + text + '</p></div>',
      '  <label class="cookie-switch">',
      '    <input type="checkbox" data-cookie-toggle="' + name + '">',
      '    <span></span>',
      '  </label>',
      '</article>'
    ].join('');
  }

  function buildShell() {
    if (document.getElementById('cookieConsentRoot')) return;

    const root = document.createElement('div');
    root.id = 'cookieConsentRoot';
    root.innerHTML = [
      '<section class="cookie-banner" data-cookie-banner role="region" aria-label="Aviso de cookies e privacidade">',
      '  <div class="cookie-banner__copy">',
      '    <span class="cookie-banner__eyebrow">Privacidade LGPD</span>',
      '    <p>Utilizamos cookies para melhorar sua experiência, analisar o desempenho do site e personalizar conteúdos. Você pode aceitar todos, rejeitar cookies opcionais ou gerenciar suas preferências. Para saber mais, acesse nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>',
      '  </div>',
      '  <div class="cookie-banner__actions">',
      '    <button type="button" class="cookie-btn cookie-btn--ghost" data-cookie-customize>Personalizar</button>',
      '    <button type="button" class="cookie-btn cookie-btn--secondary" data-cookie-reject>Rejeitar opcionais</button>',
      '    <button type="button" class="cookie-btn cookie-btn--primary" data-cookie-accept>Aceitar todos</button>',
      '  </div>',
      '</section>',
      '<div class="cookie-modal" data-cookie-modal aria-hidden="true">',
      '  <div class="cookie-modal__backdrop" data-cookie-close></div>',
      '  <section class="cookie-modal__panel" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">',
      '    <button type="button" class="cookie-modal__close" data-cookie-close aria-label="Fechar preferências de cookies">x</button>',
      '    <span class="cookie-banner__eyebrow">Central de preferências</span>',
      '    <h2 id="cookieModalTitle">Preferências de cookies</h2>',
      '    <p class="cookie-modal__intro">Gerencie como a BLUM Digital pode utilizar cookies opcionais neste site. Cookies necessários permanecem sempre ativos para segurança e funcionamento.</p>',
      '    <div class="cookie-options">',
      '      <article class="cookie-option">',
      '        <div><h3>Cookies necessários</h3><p>Essenciais para navegação, segurança, carregamento da página e armazenamento da sua escolha de privacidade.</p></div>',
      '        <span class="cookie-always">Sempre ativos</span>',
      '      </article>',
      optionMarkup('analytics', 'Cookies de desempenho/analytics', 'Ajudam a entender visitas, páginas acessadas e desempenho do site. Só serão usados se você permitir.'),
      optionMarkup('marketing', 'Cookies de marketing/publicidade', 'Permitem medir campanhas e criar comunicações mais relevantes em plataformas de publicidade, quando houver integrações ativas.'),
      optionMarkup('functionality', 'Cookies de funcionalidade', 'Guardam preferências de experiência e recursos adicionais que tornam a navegação mais conveniente.'),
      '    </div>',
      '    <div class="cookie-modal__actions">',
      '      <button type="button" class="cookie-btn cookie-btn--ghost" data-cookie-reject>Rejeitar opcionais</button>',
      '      <button type="button" class="cookie-btn cookie-btn--secondary" data-cookie-save>Salvar preferências</button>',
      '      <button type="button" class="cookie-btn cookie-btn--primary" data-cookie-accept>Aceitar todos</button>',
      '    </div>',
      '  </section>',
      '</div>'
    ].join('');

    document.body.appendChild(root);
  }

  function injectFooterLink() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    if (footer.querySelector('[data-cookie-preferences-link]')) return;

    const lists = footer.querySelectorAll('ul');
    const targetList = lists[lists.length - 1];
    const privacy = document.createElement('li');
    privacy.innerHTML = '<a href="/politica-de-privacidade" class="footer-link">Política de Privacidade</a>';

    const preferences = document.createElement('li');
    preferences.innerHTML = '<button type="button" class="footer-link cookie-footer-button" data-cookie-preferences-link>Preferências de cookies</button>';

    if (targetList) {
      targetList.appendChild(privacy);
      targetList.appendChild(preferences);
      return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'cookie-footer-links';
    wrap.appendChild(privacy.firstElementChild);
    wrap.appendChild(preferences.firstElementChild);
    footer.querySelector('.container-wrap')?.appendChild(wrap);
  }

  function setToggles(consent) {
    optionalKeys.forEach(function (key) {
      const input = document.querySelector('[data-cookie-toggle="' + key + '"]');
      if (input) input.checked = !!consent[key];
    });
  }

  function getToggleConsent() {
    const next = { necessary: true };
    optionalKeys.forEach(function (key) {
      const input = document.querySelector('[data-cookie-toggle="' + key + '"]');
      next[key] = !!(input && input.checked);
    });
    return next;
  }

  function showBanner() {
    document.querySelector('[data-cookie-banner]')?.classList.add('is-visible');
  }

  function hideBanner() {
    document.querySelector('[data-cookie-banner]')?.classList.remove('is-visible');
  }

  function openModal() {
    setToggles(readConsent() || DEFAULT_CONSENT);
    const modal = document.querySelector('[data-cookie-modal]');
    if (!modal) return;
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cookie-modal-open');
  }

  function closeModal() {
    const modal = document.querySelector('[data-cookie-modal]');
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cookie-modal-open');
  }

  function bindEvents() {
    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-cookie-accept]')) {
        writeConsent({ analytics: true, marketing: true, functionality: true });
        hideBanner();
        closeModal();
      }

      if (event.target.closest('[data-cookie-reject]')) {
        writeConsent({ analytics: false, marketing: false, functionality: false });
        hideBanner();
        closeModal();
      }

      if (event.target.closest('[data-cookie-customize], [data-cookie-preferences-link]')) {
        event.preventDefault();
        openModal();
      }

      if (event.target.closest('[data-cookie-save]')) {
        writeConsent(getToggleConsent());
        hideBanner();
        closeModal();
      }

      if (event.target.closest('[data-cookie-close]')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeModal();
    });
  }

  window.BlumCookieConsent = {
    get: readConsent,
    set: writeConsent,
    open: openModal,
    register: register,
    state: readConsent()
  };

  document.addEventListener('DOMContentLoaded', function () {
    injectFooterLink();
    buildShell();
    bindEvents();

    const consent = readConsent();
    if (consent) {
      runLoaders(consent);
    } else {
      showBanner();
    }
  });
})();

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

/* ══════════════════════════════════════════════════════
   HERO PARTICLE NETWORK
   Partículas flutuantes com conexões dinâmicas ao mouse
   ══════════════════════════════════════════════════════ */
(function () {
  const hero = document.getElementById('hero') || document.querySelector('.inner-hero');
  if (!hero) return;

  /* ── Canvas setup ──────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.style.cssText = [
    'position:absolute',
    'top:0', 'left:0',
    'width:100%', 'height:100%',
    'pointer-events:none',
    'z-index:4',
  ].join(';');
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');

  /* ── Config ────────────────────────────────────────── */
  const CFG = {
    count:       72,    // número de partículas
    speed:       0.45,  // velocidade de movimento
    dotMin:      1.2,   // tamanho mínimo das partículas
    dotMax:      2.8,   // tamanho máximo
    linkDist:    140,   // distância máxima para conectar partículas
    mouseDist:   200,   // raio de influência do mouse
    dotOpacity:  0.55,  // opacidade dos pontos
    linkOpacity: 0.30,  // opacidade base das linhas entre partículas
    mouseOpacity:0.70,  // opacidade das linhas ao mouse
  };

  /* Cores da identidade visual */
  const DOT_COLOR   = '255,255,255';
  const LINK_COLOR  = '255,255,255';
  const MOUSE_COLOR = '255,122,24'; // laranja da marca

  /* ── Estado ────────────────────────────────────────── */
  let W, H, particles;
  const mouse = { x: -9999, y: -9999, active: false };

  /* ── Partícula ─────────────────────────────────────── */
  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (init) {
    this.x    = init ? Math.random() * W : (Math.random() < 0.5 ? -5 : W + 5);
    this.y    = Math.random() * H;
    this.vx   = (Math.random() - 0.5) * CFG.speed * 2;
    this.vy   = (Math.random() - 0.5) * CFG.speed * 2;
    this.size = CFG.dotMin + Math.random() * (CFG.dotMax - CFG.dotMin);
    this.op   = 0.3 + Math.random() * 0.4;
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    // Reintegra partículas que saem da tela
    if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
      this.reset(false);
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${DOT_COLOR},${this.op * CFG.dotOpacity})`;
    ctx.fill();
  };

  /* ── Init ──────────────────────────────────────────── */
  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: CFG.count }, () => new Particle());
  }

  /* ── Draw loop ─────────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const len = particles.length;

    /* Linhas entre partículas próximas */
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.linkDist) {
          const alpha = (1 - dist / CFG.linkDist) * CFG.linkOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${LINK_COLOR},${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }
    }

    /* Linhas ao mouse — efeito de atração visual */
    if (mouse.active) {
      for (let i = 0; i < len; i++) {
        const dx   = particles[i].x - mouse.x;
        const dy   = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.mouseDist) {
          const alpha = (1 - dist / CFG.mouseDist) * CFG.mouseOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${MOUSE_COLOR},${alpha})`;
          ctx.lineWidth   = 1.0;
          ctx.stroke();
        }
      }

      /* Ponto central no cursor */
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${MOUSE_COLOR},0.8)`;
      ctx.fill();
    }

    /* Atualiza e desenha partículas */
    particles.forEach(p => { p.update(); p.draw(); });

    requestAnimationFrame(draw);
  }

  /* ── Mouse tracking (no hero, não no canvas) ───────── */
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x      = e.clientX - rect.left;
    mouse.y      = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => p.reset(true));
  });

  init();
  draw();
})();

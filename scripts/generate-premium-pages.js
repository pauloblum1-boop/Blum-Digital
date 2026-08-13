const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const imgDir = path.join(dist, 'assets', 'img');
const cssDir = path.join(dist, 'css');

const whatsapp = 'https://wa.me/5548999517566?text=Ol%C3%A1%21+Quero+estruturar+minha+presen%C3%A7a+digital+com+a+BLUM+Digital.';
const logo = '/assets/img/blum-digital-logo-transparent.png';

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function cleanText(value) {
  return String(value).replace(/[ \t]+$/gm, '').trimEnd() + '\n';
}

function write(file, html) {
  const full = path.join(dist, file);
  ensureDir(full);
  fs.writeFileSync(full, cleanText(html), 'utf8');
}

function writeAliasFromHtml(file, html) {
  if (!file.endsWith('.html')) return;
  write(file.replace(/\.html$/, '/index.html'), html);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function asset(name) {
  return `/assets/img/${name}`;
}

function image(name, alt, className = '', extra = '') {
  return `<img src="${asset(name)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" class="${className}" ${extra}>`;
}

function cta(text = 'Falar com Especialista', className = 'premium-btn premium-btn-primary') {
  return `<a href="${whatsapp}" target="_blank" rel="noopener noreferrer" class="${className}">${text}</a>`;
}

function head({ title, description, canonical, image: ogImage = 'hero-lion-blum-1600.webp', type = 'website' }) {
  const url = `https://digitalblum.com${canonical}`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="BLUM Digital">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="https://digitalblum.com/assets/img/${ogImage}">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="BLUM Digital">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="https://digitalblum.com/assets/img/${ogImage}">
  <link rel="icon" type="image/png" href="/assets/img/favicon.png?v=3">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png?v=3">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/premium-pages.css">
</head>`;
}

function header() {
  return `<header class="premium-header" data-premium-header>
  <a href="/index.html" class="premium-brand" aria-label="BLUM Digital - Início">
    <img src="${logo}" alt="BLUM Digital" width="783" height="1086">
  </a>
  <div class="premium-nav-shell">
    <nav class="premium-nav" aria-label="Navegação principal">
      <a href="/index.html">Início</a>
      <a href="/index.html#servicos">Serviços</a>
      <a href="/index.html#planos">Planos</a>
      <a href="/cases.html">Cases</a>
      <a href="/blog.html">Blog</a>
      <a href="/socio-digital.html">Sócio Digital</a>
      <a href="/propostas.html">Propostas Comerciais</a>
      <a href="/index.html#faq">FAQ</a>
    </nav>
    <a href="${whatsapp}" target="_blank" rel="noopener noreferrer" class="premium-nav-cta">Falar no WhatsApp</a>
  </div>
  <button class="premium-menu-button" type="button" data-premium-menu aria-expanded="false" aria-controls="premium-mobile-menu" aria-label="Abrir menu">
    <span></span><span></span><span></span>
  </button>
  <nav id="premium-mobile-menu" class="premium-mobile-menu" data-premium-mobile-menu aria-label="Menu mobile">
    <a href="/index.html">Início</a>
    <a href="/index.html#servicos">Serviços</a>
    <a href="/index.html#planos">Planos</a>
    <a href="/cases.html">Cases</a>
    <a href="/blog.html">Blog</a>
    <a href="/socio-digital.html">Sócio Digital</a>
    <a href="/propostas.html">Propostas Comerciais</a>
    <a href="/index.html#faq">FAQ</a>
    <a href="${whatsapp}" target="_blank" rel="noopener noreferrer" class="premium-mobile-cta">Falar no WhatsApp</a>
  </nav>
</header>`;
}

function footer() {
  return `<footer class="premium-footer">
  <div class="premium-footer-grid">
    <section>
      <img src="${logo}" alt="BLUM Digital" width="783" height="1086" class="premium-footer-logo">
      <p>Agência de marketing digital em Criciúma/SC especializada em posicionamento local, sites, tráfego pago, SEO, Tour Virtual 360° e Social Media.</p>
    </section>
    <nav aria-label="Serviços no rodapé">
      <h3>Serviços</h3>
      <a href="/google-meu-negocio.html">Google Meu Negócio</a>
      <a href="/criacao-de-sites.html">Sites e Landing Pages</a>
      <a href="/trafego-pago.html">Tráfego Pago</a>
      <a href="/seo-local.html">SEO Técnico e Local</a>
      <a href="/tour-virtual-360.html">Tour Virtual 360°</a>
      <a href="/gestao-redes-sociais.html">Social Media</a>
    </nav>
    <nav aria-label="Planos no rodapé">
      <h3>Planos</h3>
      <a href="/blum-start.html">BLUM Start</a>
      <a href="/blum-authority.html">BLUM Authority</a>
      <a href="/blum-apex.html">BLUM Apex</a>
      <a href="/socio-digital.html">Sócio Digital</a>
    </nav>
    <section>
      <h3>Contato</h3>
      <a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp: (48) 99951-7566</a>
      <a href="mailto:contato@digitalblum.com">contato@digitalblum.com</a>
      <p>Segunda a sexta, 08h às 18h<br>Sábado, 08h às 12h<br>Criciúma — SC</p>
    </section>
  </div>
  <div class="premium-footer-bottom">
    <span>© 2026 BLUM Digital. Todos os direitos reservados. Criciúma — SC.</span>
    <a href="/politica-de-privacidade.html">Política de Privacidade e Cookies LGPD</a>
  </div>
</footer>
<a href="${whatsapp}" target="_blank" rel="noopener noreferrer" class="premium-whatsapp" aria-label="Falar com Especialista no WhatsApp">
  <span>Falar com Especialista</span>
  <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.02 4.4c-6.37 0-11.56 5.05-11.56 11.26 0 2.12.62 4.17 1.79 5.95L4 28l6.59-2.11a11.8 11.8 0 0 0 5.43 1.33c6.37 0 11.56-5.05 11.56-11.26S22.39 4.4 16.02 4.4Zm0 20.72c-1.73 0-3.42-.45-4.9-1.31l-.35-.2-3.9 1.25 1.27-3.68-.23-.37a9.1 9.1 0 0 1-1.35-4.75c0-5.04 4.24-9.14 9.45-9.14s9.45 4.1 9.45 9.14-4.23 9.06-9.44 9.06Zm5.18-6.85c-.28-.14-1.68-.81-1.94-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.08-.17.19-.33.21-.62.07-.28-.14-1.2-.43-2.29-1.37-.85-.74-1.42-1.65-1.58-1.93-.17-.28-.02-.43.13-.57.13-.13.28-.33.43-.5.14-.17.19-.28.28-.47.1-.19.05-.36-.02-.5-.07-.14-.64-1.5-.88-2.05-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.42s1.03 2.8 1.18 2.99c.14.19 2.04 3.04 4.95 4.26.69.29 1.23.47 1.65.6.69.21 1.32.18 1.82.11.56-.08 1.68-.67 1.92-1.32.24-.65.24-1.21.17-1.32-.07-.12-.26-.19-.55-.33Z"/></svg>
</a>
<script>
  (function () {
    const button = document.querySelector('[data-premium-menu]');
    const menu = document.querySelector('[data-premium-mobile-menu]');
    if (!button || !menu) return;
    button.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      button.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      button.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }));
  })();
</script>`;
}

function layout(meta, body, schema = '') {
  return `${head(meta)}
<body class="premium-page">
${schema}
${header()}
<main>
${body}
</main>
${footer()}
</body>
</html>`;
}

function hero({ eyebrow, title, subtitle, image: img, primary = 'Falar com Especialista', secondary = 'Ver Soluções', secondaryHref = '/index.html#servicos', badges = [] }) {
  return `<section class="premium-hero">
  <div class="premium-hero-media">${image(img, '', '', 'role="presentation" aria-hidden="true"')}</div>
  <div class="premium-hero-overlay"></div>
  <div class="premium-container premium-hero-content">
    <span class="premium-kicker">${escapeHtml(eyebrow)}</span>
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="premium-badges">${badges.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
    <div class="premium-actions">
      ${cta(primary)}
      <a href="${secondaryHref}" class="premium-btn premium-btn-outline">${secondary}</a>
    </div>
  </div>
</section>`;
}

function sectionHeader(kicker, title, text) {
  return `<div class="premium-section-header">
    <span class="premium-kicker">${escapeHtml(kicker)}</span>
    <h2>${title}</h2>
    <p>${text}</p>
  </div>`;
}

function cards(items, className = '') {
  return `<div class="premium-card-grid ${className}">${items.map((item) => `<article class="premium-card">
    ${item.icon ? `<img src="${asset(item.icon)}" alt="" role="presentation" width="420" height="420" class="premium-card-icon">` : ''}
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  </article>`).join('')}</div>`;
}

const services = [
  {
    file: 'google-meu-negocio.html',
    slug: 'google-meu-negocio',
    title: 'Google Meu Negócio em Criciúma | BLUM Digital',
    name: 'Google Business Profile',
    eyebrow: 'Serviço estratégico',
    h1: 'Domine as buscas locais com um perfil Google otimizado.',
    subtitle: 'Estruturamos seu Perfil da Empresa no Google para gerar confiança, aparecer no Maps e atrair clientes prontos para comprar.',
    image: 'herogmb.webp',
    icon: 'ggg.webp',
    deliverables: ['Auditoria completa do perfil', 'Categorias, serviços e descrição estratégica', 'Plano de fotos, postagens e avaliações', 'Integração com site, Maps e SEO Local'],
    challenge: 'Muitas empresas aparecem mal posicionadas, com informações incompletas, poucas avaliações e baixa confiança no primeiro contato.',
    solution: 'A BLUM organiza a presença local com consistência, melhora sinais de autoridade e transforma o perfil Google em um ativo comercial.'
  },
  {
    file: 'criacao-de-sites.html',
    slug: 'criacao-de-sites',
    title: 'Criação de Sites e Landing Pages | BLUM Digital',
    name: 'Criação de Sites & Landing Pages',
    eyebrow: 'Presença digital premium',
    h1: 'Sites rápidos, elegantes e preparados para conversão.',
    subtitle: 'Criamos páginas institucionais e landing pages responsivas, com arquitetura clara, copy comercial e base técnica para SEO.',
    image: 'heroweb.webp',
    icon: 'ggg2.webp',
    deliverables: ['Estrutura de páginas e jornada de conversão', 'Design responsivo com identidade premium', 'SEO técnico essencial', 'CTAs, WhatsApp e rastreamento preparados'],
    challenge: 'Um site desalinhado prejudica confiança, reduz conversão e faz o tráfego pago desperdiçar oportunidades.',
    solution: 'A BLUM constrói uma presença visualmente forte, objetiva e fácil de navegar, com foco em autoridade e geração de contato.'
  },
  {
    file: 'trafego-pago.html',
    slug: 'trafego-pago',
    title: 'Tráfego Pago Google e Meta Ads | BLUM Digital',
    name: 'Tráfego Pago',
    eyebrow: 'Performance comercial',
    h1: 'Campanhas orientadas para leads qualificados e faturamento real.',
    subtitle: 'Planejamos, configuramos e otimizamos campanhas em Google e Meta Ads com leitura estratégica de dados.',
    image: 'herotrafego.webp',
    icon: 'ggg1.webp',
    deliverables: ['Estratégia por etapa do funil', 'Campanhas Google e Meta Ads', 'Criativos, públicos e palavras-chave', 'Relatórios de oportunidades e otimizações'],
    challenge: 'Investir em anúncios sem estratégia costuma gerar cliques baratos, pouca clareza e contatos sem intenção de compra.',
    solution: 'A BLUM conecta mídia, oferta, página e atendimento para transformar investimento em oportunidades mensuráveis.'
  },
  {
    file: 'seo-local.html',
    slug: 'seo-local',
    title: 'SEO Técnico e SEO Local | BLUM Digital',
    name: 'SEO Técnico & SEO Local',
    eyebrow: 'Crescimento orgânico',
    h1: 'Posicionamento orgânico para gerar autoridade no longo prazo.',
    subtitle: 'Otimizamos estrutura, conteúdo e sinais locais para colocar sua empresa nas buscas certas do Google.',
    image: 'heroseo.webp',
    icon: 'ggg3.webp',
    deliverables: ['Auditoria técnica e mapa de oportunidades', 'Conteúdo otimizado para intenção de busca', 'SEO Local e dados estruturados', 'Plano contínuo de evolução orgânica'],
    challenge: 'Sem SEO, a empresa depende mais de anúncios e perde autoridade para concorrentes que aparecem todos os dias no Google.',
    solution: 'A BLUM cria uma base técnica e editorial consistente para gerar visibilidade sustentável e reduzir dependência de mídia.'
  },
  {
    file: 'tour-virtual-360.html',
    slug: 'tour-virtual-360',
    title: 'Tour Virtual 360° Street View | BLUM Digital',
    name: 'Tour Virtual 360°',
    eyebrow: 'Confiança imersiva',
    h1: 'Mostre sua estrutura antes mesmo da primeira visita.',
    subtitle: 'Criamos experiências 360° integradas ao Google Street View para fortalecer confiança e decisão de compra.',
    image: 'hero360.webp',
    icon: 'ggg5.webp',
    deliverables: ['Captação 360° profissional', 'Tratamento e publicação no Google', 'Integração com site e perfil Google', 'Experiência imersiva para atendimento e vendas'],
    challenge: 'Quando o cliente não consegue visualizar o ambiente, a confiança inicial fica menor e a comparação com concorrentes pesa mais.',
    solution: 'A BLUM transforma estrutura física em prova visual, aumentando percepção de profissionalismo e segurança.'
  },
  {
    file: 'gestao-redes-sociais.html',
    slug: 'gestao-redes-sociais',
    title: 'Social Media Estratégico | BLUM Digital',
    name: 'Social Media Estratégico',
    eyebrow: 'Autoridade de marca',
    h1: 'Conteúdo com estratégia, estética e intenção comercial.',
    subtitle: 'Planejamos presença em Instagram e Facebook com design, calendário, posicionamento e linguagem consistente.',
    image: 'herosocialmedia.webp',
    icon: 'ggg4.webp',
    deliverables: ['Planejamento editorial', 'Design de posts e materiais de marca', 'Copywriting e calendário de conteúdo', 'Acompanhamento de engajamento e reputação'],
    challenge: 'Postar sem direção dilui a marca, cansa a audiência e cria pouca conexão com objetivos comerciais.',
    solution: 'A BLUM transforma redes sociais em vitrine de autoridade, prova social e relacionamento com potenciais clientes.'
  }
];

function servicePage(service) {
  const body = `${hero({
    eyebrow: service.eyebrow,
    title: service.h1,
    subtitle: service.subtitle,
    image: service.image,
    badges: ['Estratégia BLUM', 'Criciúma e Brasil', 'Atendimento consultivo']
  })}
<section class="premium-section">
  <div class="premium-container premium-two-col">
    <div>
      ${sectionHeader(service.name, 'Do diagnóstico à execução com padrão High Ticket.', 'A página foi estruturada para explicar com clareza o que será entregue, por que isso importa e como a BLUM conduz o projeto com foco comercial.')}
      <div class="premium-split">
        <article class="premium-card"><h3>Desafio inicial</h3><p>${service.challenge}</p></article>
        <article class="premium-card"><h3>Solução aplicada</h3><p>${service.solution}</p></article>
      </div>
    </div>
    <aside class="premium-media-card">
      ${image(service.icon, service.name, 'premium-service-icon', 'width="420" height="420"')}
      <h3>${service.name}</h3>
      <p>Construído para gerar presença, autoridade e crescimento sustentável.</p>
      ${cta('Solicitar Análise')}
    </aside>
  </div>
</section>
<section class="premium-section premium-section-alt">
  <div class="premium-container">
    ${sectionHeader('Entregáveis', 'O que entra na estrutura.', 'Cada entrega é pensada para reduzir ruído, aumentar confiança e criar uma jornada clara até o contato comercial.')}
    ${cards(service.deliverables.map((item) => ({ title: item, text: 'Aplicado com padrão visual BLUM, documentação clara e próximos passos objetivos.' })), 'premium-grid-four')}
  </div>
</section>
<section class="premium-cta-section">
  <div class="premium-container premium-cta-box">
    <span class="premium-kicker">Próximo passo</span>
    <h2>Quer aplicar ${service.name} na sua empresa?</h2>
    <p>Vamos avaliar seu momento atual e indicar a estrutura mais adequada para transformar presença digital em oportunidades reais.</p>
    ${cta('Agendar conversa pelo WhatsApp')}
  </div>
</section>`;
  return layout({
    title: service.title,
    description: service.subtitle,
    canonical: `/${service.slug}`,
    image: service.image
  }, body);
}

const cases = [
  {
    file: 'cases/colegio-leme.html',
    title: 'Case Colégio Leme | BLUM Digital',
    client: 'Colégio Leme',
    person: 'Leonir Laffaiette',
    niche: 'Educação em Criciúma/SC',
    image: 'c1.webp',
    gallery: ['c1.webp', 'lemelocal.png', 'casosdesucesso.webp'],
    challenge: 'Transmitir confiança para famílias que pesquisam a escola antes de uma visita presencial.',
    solution: 'Organização da presença digital, fortalecimento do perfil local e uso do Tour Virtual 360° como prova de estrutura.',
    testimonial: 'A BLUM organizou nossa presença digital e trouxe uma percepção muito mais profissional para famílias que pesquisam o Colégio Leme antes da visita. O Tour Virtual 360° elevou a confiança no primeiro contato.'
  },
  {
    file: 'cases/avila-cortinas-e-persianas.html',
    title: 'Case Cortinas e Persianas Ávila | BLUM Digital',
    client: 'Cortinas e Persianas Ávila',
    person: 'Gustavo Ávila',
    niche: 'Decoração e varejo local',
    image: 'avilafaixada.webp',
    gallery: ['c2.webp', 'avilafaixada.webp', 'avilafaixada-960w.webp'],
    challenge: 'A presença digital não refletia a qualidade do atendimento e da estrutura física da empresa.',
    solution: 'Reposicionamento local, otimização de Google, reforço visual e conexão entre site, Maps e reputação.',
    testimonial: 'A equipe identificou pontos que estavam desassistidos no Google, no site e no Street View. Em pouco tempo, a presença digital ficou mais conectada e começou a refletir em novas oportunidades comerciais.'
  },
  {
    file: 'cases/fine-conceito.html',
    title: 'Case Fine Conceito | BLUM Digital',
    client: 'Fine Conceito',
    person: 'Thiago Marques',
    niche: 'Marca premium e atendimento especializado',
    image: 'c3.webp',
    gallery: ['c3.webp', 'card1.webp', 'card2.webp'],
    challenge: 'Gerar consistência entre posicionamento, tráfego e percepção de marca.',
    solution: 'Estratégia integrada de presença digital, SEO e pontos de conversão para oportunidades mais qualificadas.',
    testimonial: 'O trabalho trouxe consistência para site, tráfego e posicionamento. A Fine Conceito passou a receber oportunidades mais qualificadas e ganhou uma presença digital compatível com o padrão da marca.'
  },
  {
    file: 'cases/asia-express.html',
    title: 'Case Asia Express | BLUM Digital',
    client: 'Asia Express',
    person: 'Diana Manenti',
    niche: 'Gastronomia e experiência local',
    image: 'c4.webp',
    gallery: ['c4.webp', 'svc-socialmedia.webp', 'hero-bg3.webp'],
    challenge: 'Traduzir a experiência presencial para uma comunicação digital mais confiável e consistente.',
    solution: 'Organização de presença social, reforço de reputação e clareza visual nos pontos de contato digitais.',
    testimonial: 'A BLUM entendeu a experiência do Asia Express e traduziu isso para o digital. A comunicação ficou mais consistente, o perfil mais confiável e o retorno apareceu em novos contatos e reservas.'
  },
  {
    file: 'cases/pastelaria-sachet.html',
    title: 'Case Pastelaria Sachet | BLUM Digital',
    client: 'Pastelaria Sachet',
    person: 'Maria Janice Sachet',
    niche: 'Alimentação e busca local',
    image: 'c5.webp',
    gallery: ['c5.webp', 'localpack.png', 'card3.webp'],
    challenge: 'Aumentar a percepção de reputação e comunicar melhor produtos, localização e diferenciais.',
    solution: 'Otimização local, melhoria da presença Google e suporte visual para redes e descoberta regional.',
    testimonial: 'Depois da organização do Google e das redes sociais, ficou claro que presença digital influencia a escolha do cliente. A Pastelaria Sachet passou a comunicar melhor seus produtos e sua reputação.'
  },
  {
    file: 'cases/e-pulse.html',
    title: 'Case E-Pulse | BLUM Digital',
    client: 'E-Pulse',
    person: 'Igor Kopper',
    niche: 'Tecnologia, performance e reputação',
    image: 'c6.webp',
    gallery: ['c6.webp', 'svc-trafego.webp', 'svc-seo.webp'],
    challenge: 'Transmitir tecnologia, clareza e confiança em um mercado competitivo.',
    solution: 'Estruturação de posicionamento, tráfego e reputação digital com foco em buscas locais e oportunidades qualificadas.',
    testimonial: 'Precisávamos transmitir tecnologia e confiança. A BLUM estruturou posicionamento, tráfego e reputação digital com clareza, ajudando a E-Pulse a aparecer com mais força nas buscas locais.'
  }
];

function caseCard(item) {
  const href = `/${item.file}`;
  return `<a href="${href}" class="premium-case-card">
    ${image(item.image, item.client, 'premium-case-thumb')}
    <div>
      <span>${escapeHtml(item.niche)}</span>
      <h3>${escapeHtml(item.client)}</h3>
      <p>${escapeHtml(item.challenge)}</p>
      <strong>Ver case completo</strong>
    </div>
  </a>`;
}

function caseIndex() {
  const body = `${hero({
    eyebrow: 'Portfólio BLUM',
    title: 'Cases que traduzem presença digital em reputação e oportunidades.',
    subtitle: 'Conheça projetos locais e nacionais em que estratégia, design, Google, SEO e tráfego trabalharam juntos para gerar percepção premium.',
    image: 'casosdesucesso.webp',
    badges: ['20+ empresas impactadas', '5.0 no Google', 'Criciúma e Brasil']
  })}
<section class="premium-section">
  <div class="premium-container">
    ${sectionHeader('Cases de sucesso', 'Escolha um projeto para ver a estrutura aplicada.', 'Cada case apresenta desafio, solução, galeria e chamada para iniciar um projeto semelhante.')}
    <div class="premium-case-grid">${cases.map(caseCard).join('')}</div>
  </div>
</section>`;
  return layout({
    title: 'Cases de Sucesso | BLUM Digital',
    description: 'Portfólio de cases da BLUM Digital com empresas atendidas em Criciúma, SC e Brasil.',
    canonical: '/cases',
    image: 'casosdesucesso.webp'
  }, body);
}

function casePage(item) {
  const body = `${hero({
    eyebrow: `Case | ${item.niche}`,
    title: `${item.client}: presença digital com autoridade.`,
    subtitle: `Projeto conduzido para fortalecer reputação, clareza comercial e confiança no primeiro contato.`,
    image: item.image,
    badges: [item.niche, 'Avaliação 5 estrelas', 'Projeto BLUM Digital'],
    primary: 'Quero um projeto semelhante',
    secondary: 'Ver outros cases',
    secondaryHref: '/cases.html'
  })}
<section class="premium-section">
  <div class="premium-container premium-two-col">
    <article class="premium-card premium-large-card">
      <span class="premium-kicker">Desafio inicial</span>
      <h2>O ponto de partida.</h2>
      <p>${escapeHtml(item.challenge)}</p>
    </article>
    <article class="premium-card premium-large-card">
      <span class="premium-kicker">Solução BLUM</span>
      <h2>A estrutura aplicada.</h2>
      <p>${escapeHtml(item.solution)}</p>
    </article>
  </div>
</section>
<section class="premium-section premium-section-alt">
  <div class="premium-container">
    ${sectionHeader('Galeria do projeto', 'Ativos visuais e provas de presença.', 'Imagens, prints e materiais preservados com moldura escura, overlay vinho e acabamento champagne.')}
    <div class="premium-gallery">${item.gallery.map((img, index) => `<figure>${image(img, `${item.client} - imagem ${index + 1}`, '')}<figcaption>${escapeHtml(item.client)}</figcaption></figure>`).join('')}</div>
  </div>
</section>
<section class="premium-section">
  <div class="premium-container">
    <blockquote class="premium-testimonial">
      <div class="premium-stars">★ ★ ★ ★ ★</div>
      <p>“${escapeHtml(item.testimonial)}”</p>
      <footer>${escapeHtml(item.person)} — ${escapeHtml(item.client)}</footer>
    </blockquote>
  </div>
</section>
<section class="premium-cta-section">
  <div class="premium-container premium-cta-box">
    <span class="premium-kicker">Projeto semelhante</span>
    <h2>Quer construir uma presença digital com esse padrão?</h2>
    <p>A BLUM analisa seu momento, identifica gargalos e propõe uma estrutura para transformar presença em autoridade e crescimento.</p>
    ${cta('Agendar pelo WhatsApp')}
  </div>
</section>`;
  return layout({
    title: item.title,
    description: `Conheça o case ${item.client} da BLUM Digital: desafio, solução, galeria, depoimento e CTA para projeto semelhante.`,
    canonical: `/${item.file.replace(/\.html$/, '')}`,
    image: item.image,
    type: 'article'
  }, body);
}

const blogPosts = [
  {
    file: 'blog/5-razoes-empresas-criciuma-perdem-clientes-google.html',
    title: '5 razões pelas quais empresas de Criciúma perdem clientes no Google',
    description: 'Entenda os erros que reduzem visibilidade local e como corrigir sua presença digital para gerar mais oportunidades.',
    image: 'card1.webp',
    category: 'SEO Local',
    date: '2026'
  },
  {
    file: 'blog/google-ads-ou-meta-ads-negocios-locais.html',
    title: 'Google Ads ou Meta Ads para negócios locais?',
    description: 'Veja quando usar Google, Meta ou uma combinação estratégica para gerar demanda qualificada.',
    image: 'card2.webp',
    category: 'Tráfego Pago',
    date: '2026'
  },
  {
    file: 'blog/quanto-custa-criar-site-profissional.html',
    title: 'Quanto custa criar um site profissional?',
    description: 'O que muda no investimento quando o site precisa gerar autoridade, clareza e conversão.',
    image: 'card3.webp',
    category: 'Websites',
    date: '2026'
  },
  {
    file: 'blog/seo-local-vs-seo-nacional.html',
    title: 'SEO Local vs. SEO Nacional: qual estratégia escolher?',
    description: 'Aprenda a diferença entre competir por buscas regionais e construir presença orgânica nacional.',
    image: 'heroseo.webp',
    category: 'Estratégia',
    date: '2026'
  }
];

function blogIndex() {
  const body = `${hero({
    eyebrow: 'Blog BLUM Digital',
    title: 'Estratégia digital para empresas que querem liderar.',
    subtitle: 'Conteúdos sobre Google, SEO Local, sites, tráfego pago e presença digital com leitura clara e foco em negócios.',
    image: 'heroblog.webp',
    badges: ['Leitura estratégica', 'pt-BR', 'Negócios locais']
  })}
<section class="premium-section">
  <div class="premium-container">
    ${sectionHeader('Artigos', 'Conteúdo para decisão com clareza.', 'Cada leitura foi organizada com tipografia confortável, cards escuros e foco prático para empresas brasileiras.')}
    <div class="premium-blog-grid">${blogPosts.map((post) => `<a href="/${post.file}" class="premium-blog-card">
      ${image(post.image, post.title, '')}
      <div><span>${post.category} | ${post.date}</span><h3>${post.title}</h3><p>${post.description}</p><strong>Ler artigo</strong></div>
    </a>`).join('')}</div>
  </div>
</section>`;
  return layout({
    title: 'Blog BLUM Digital | Marketing Digital para Negócios Locais',
    description: 'Artigos estratégicos sobre marketing digital, SEO local, Google e tráfego pago para empresas.',
    canonical: '/blog',
    image: 'heroblog.webp'
  }, body);
}

function articlePage(post) {
  const body = `<article class="premium-article">
  <div class="premium-container premium-article-head">
    <span class="premium-kicker">${post.category}</span>
    <h1>${post.title}</h1>
    <p>${post.description}</p>
  </div>
  <figure class="premium-container premium-article-cover">${image(post.image, post.title, '')}</figure>
  <div class="premium-container premium-article-body">
    <p>Empresas locais não perdem oportunidades apenas por falta de anúncios. Muitas vezes o problema está na ausência de uma estrutura digital clara: perfil Google incompleto, site pouco convincente, linguagem desalinhada e falta de acompanhamento das métricas certas.</p>
    <h2>Presença digital precisa ser percebida como confiança.</h2>
    <p>Antes de falar com sua equipe, o cliente compara avaliações, fotos, site, redes sociais, endereço e sinais de profissionalismo. Quando esses pontos não conversam entre si, a marca perde força mesmo quando entrega um bom serviço.</p>
    <h2>O caminho mais seguro é integrar estratégia, design e dados.</h2>
    <p>A BLUM Digital trabalha com uma visão consultiva: primeiro entendemos o momento do negócio, depois estruturamos os ativos digitais e acompanhamos a evolução. O objetivo não é apenas aparecer, mas aparecer com autoridade.</p>
    <h2>Como começar.</h2>
    <p>O primeiro passo é fazer um diagnóstico honesto da presença atual: Google, site, SEO, anúncios, redes sociais e jornada de contato. A partir disso, definimos prioridades e aplicamos o plano ideal para o momento do negócio.</p>
  </div>
</article>
<section class="premium-cta-section">
  <div class="premium-container premium-cta-box">
    <span class="premium-kicker">Diagnóstico BLUM</span>
    <h2>Quer transformar leitura em ação?</h2>
    <p>Agende uma conversa e receba uma análise inicial dos gargalos que estão limitando sua presença digital.</p>
    ${cta('Solicitar diagnóstico')}
  </div>
</section>`;
  return layout({
    title: `${post.title} | BLUM Digital`,
    description: post.description,
    canonical: `/${post.file.replace(/\.html$/, '')}`,
    image: post.image,
    type: 'article'
  }, body);
}

function socioPage() {
  const body = `${hero({
    eyebrow: 'Modelo consultivo B2B',
    title: 'Sócio Digital para empresas que querem crescer com estratégia.',
    subtitle: 'Uma parceria pensada para negócios com operação validada, ambição de crescimento e necessidade de direção digital consistente.',
    image: 'hero-socio.webp',
    badges: ['B2B consultivo', 'Estratégia de crescimento', 'Participação por resultado']
  })}
<section class="premium-section">
  <div class="premium-container">
    ${sectionHeader('Como funciona', 'Mais do que execução: direção estratégica.', 'A BLUM entra como parceira de crescimento, alinhando presença digital, posicionamento, indicadores e oportunidades comerciais.')}
    ${cards([
      { title: 'Diagnóstico de negócio', text: 'Entendemos oferta, operação, margem, jornada do cliente e capacidade real de atendimento.' },
      { title: 'Plano de crescimento', text: 'Definimos prioridades digitais, canais, metas e rituais de acompanhamento.' },
      { title: 'Execução integrada', text: 'Site, Google, SEO, tráfego, social e provas de autoridade trabalham em conjunto.' },
      { title: 'Acompanhamento executivo', text: 'Reuniões, relatórios e decisões com foco no que gera avanço comercial.' }
    ], 'premium-grid-four')}
  </div>
</section>
<section class="premium-cta-section"><div class="premium-container premium-cta-box"><span class="premium-kicker">Seleção de parceiros</span><h2>Quer avaliar se sua empresa se encaixa no modelo Sócio Digital?</h2><p>Vamos entender seu momento e indicar se faz sentido seguir com uma parceria consultiva.</p>${cta('Conversar sobre Sócio Digital')}</div></section>`;
  return layout({
    title: 'Sócio Digital BLUM | Parceria Estratégica em Criciúma',
    description: 'Modelo consultivo B2B para empresas que querem um parceiro digital estratégico para crescimento sustentável.',
    canonical: '/socio-digital',
    image: 'hero-socio.webp'
  }, body);
}

const planData = [
  { file: 'blum-start.html', name: 'BLUM Start', subtitle: 'Fundação Digital', price: 'R$ 2.197,00 setup ou R$ 497/mês', text: 'Base essencial para empresas que precisam organizar presença e confiança digital.' },
  { file: 'blum-authority.html', name: 'BLUM Authority', subtitle: 'Imersão & Autoridade', price: 'R$ 3.997,00 setup ou R$ 997/mês', text: 'Plano recomendado para empresas que querem acelerar posicionamento, site premium e SEO avançado.' },
  { file: 'blum-apex.html', name: 'BLUM Apex', subtitle: 'Dominação de Mercado', price: 'R$ 6.997,00 setup ou R$ 3.997/mês', text: 'Estrutura completa com tráfego, social, consultoria e ativos de autoridade.' }
];

function plansIndex() {
  const body = `${hero({
    eyebrow: 'Planos & Soluções',
    title: 'Escolha o nível de posicionamento ideal para o seu negócio.',
    subtitle: 'Planos com clareza comercial, foco em autoridade e direcionamento direto para contratação pelo WhatsApp.',
    image: 'hero-bg4.webp',
    badges: ['Start', 'Authority', 'Apex', 'Social Media']
  })}
<section class="premium-section"><div class="premium-container">${sectionHeader('Planos BLUM', 'Estruturas para momentos diferentes.', 'Compare os níveis e escolha o caminho mais adequado para sua fase atual.')}${cards(planData.map((plan) => ({ title: `${plan.name} — ${plan.subtitle}`, text: `${plan.price}. ${plan.text}` })), 'premium-grid-three')}</div></section>`;
  return layout({
    title: 'Planos e Soluções | BLUM Digital',
    description: 'Planos BLUM Start, Authority e Apex para posicionamento digital profissional.',
    canonical: '/planos',
    image: 'hero-bg4.webp'
  }, body);
}

function planPage(plan) {
  const body = `${hero({
    eyebrow: plan.subtitle,
    title: `${plan.name}: ${plan.text}`,
    subtitle: `${plan.price}. Uma estrutura desenhada para gerar presença digital com padrão premium e execução objetiva.`,
    image: 'hero-bg4.webp',
    badges: ['Plano BLUM', 'WhatsApp direto', 'Criciúma e Brasil']
  })}
<section class="premium-section"><div class="premium-container premium-two-col"><article class="premium-card premium-large-card"><h2>O que esse plano resolve.</h2><p>${plan.text} A BLUM conduz diagnóstico, implementação e acompanhamento com foco em clareza, autoridade e oportunidades comerciais.</p></article><article class="premium-card premium-large-card"><h2>Investimento.</h2><p>${plan.price}</p>${cta('Escolher Plano')}</article></div></section>`;
  return layout({
    title: `${plan.name} | BLUM Digital`,
    description: `${plan.name}: ${plan.price}. ${plan.text}`,
    canonical: `/${plan.file.replace(/\.html$/, '')}`,
    image: 'hero-bg4.webp'
  }, body);
}

const proposals = [
  { slug: 'corpo-e-forma', name: 'Corpo e Forma', image: 'pcorpo.png', focus: 'Presença local, autoridade visual e geração de contatos qualificados.' },
  { slug: 'hypeful', name: 'Hypeful', image: 'hype.png', focus: 'Reposicionamento digital, tráfego e fortalecimento de marca.' },
  { slug: 'nonnas', name: 'Nonnas', image: 'nonnashero.png', focus: 'Estratégia comercial, visibilidade local e projeção de crescimento.' }
];

function proposalIndex(title = 'Propostas Comerciais | BLUM Digital', canonical = '/propostas') {
  const body = `${hero({
    eyebrow: 'Propostas Comerciais',
    title: 'Apresentações comerciais com clareza, estética premium e foco em decisão.',
    subtitle: 'Área organizada para visualizar propostas, bônus, métricas e projeções com experiência escura, limpa e consultiva.',
    image: 'proposta.png',
    badges: ['Orçamento claro', 'Escopo organizado', 'Conversão direta']
  })}
<section class="premium-section"><div class="premium-container">${sectionHeader('Propostas disponíveis', 'Escolha uma apresentação.', 'Cada proposta mantém foco em diagnóstico, escopo e próximos passos comerciais.')}<div class="premium-case-grid">${proposals.map((p) => `<a href="/propostas/${p.slug}.html" class="premium-case-card">${image(p.image, p.name, 'premium-case-thumb')}<div><span>Proposta Comercial</span><h3>${p.name}</h3><p>${p.focus}</p><strong>Abrir proposta</strong></div></a>`).join('')}</div></div></section>`;
  return layout({ title, description: 'Área de propostas comerciais da BLUM Digital com layout premium e CTA direto.', canonical, image: 'proposta.png' }, body);
}

function proposalPage(p, label = 'Proposta Comercial') {
  const body = `${hero({
    eyebrow: label,
    title: `${p.name}: estrutura digital com foco em crescimento.`,
    subtitle: p.focus,
    image: p.image,
    badges: ['Diagnóstico', 'Escopo', 'Investimento', 'Próximos passos']
  })}
<section class="premium-section"><div class="premium-container premium-two-col"><article class="premium-card premium-large-card"><h2>Objetivo da proposta.</h2><p>Organizar a presença digital, fortalecer autoridade e transformar canais digitais em pontos reais de geração de oportunidades.</p></article><article class="premium-card premium-large-card"><h2>Próximo passo.</h2><p>Validar escopo, prioridade e prazo de implementação em uma conversa direta com a equipe BLUM.</p>${cta('Validar proposta no WhatsApp')}</article></div></section>`;
  return layout({ title: `${p.name} | ${label} BLUM Digital`, description: p.focus, canonical: `/propostas/${p.slug}`, image: p.image }, body);
}

function privacyPage() {
  const body = `<section class="premium-simple-page"><div class="premium-container premium-article-body"><span class="premium-kicker">LGPD</span><h1>Política de Privacidade e Cookies</h1><p>A BLUM Digital respeita a privacidade dos visitantes e utiliza dados apenas para atendimento, análise de desempenho e melhoria da experiência.</p><h2>Dados de contato</h2><p>Quando você aciona o WhatsApp, e-mail ou formulário, podemos receber nome, telefone, empresa e informações necessárias para responder sua solicitação.</p><h2>Cookies</h2><p>Cookies podem ser usados para funcionamento, preferências, métricas e melhoria de conteúdo. Você pode solicitar revisão ou remoção de dados entrando em contato pelo e-mail contato@digitalblum.com.</p><h2>Contato</h2><p>Para dúvidas sobre privacidade, fale com a BLUM Digital em contato@digitalblum.com.</p></div></section>`;
  return layout({ title: 'Política de Privacidade | BLUM Digital', description: 'Política de privacidade e cookies LGPD da BLUM Digital.', canonical: '/politica-de-privacidade', image: 'hero-lion-blum-1600.webp' }, body);
}

function notFoundPage() {
  const body = `<section class="premium-simple-page"><div class="premium-container premium-cta-box"><span class="premium-kicker">404</span><h1>Página não encontrada.</h1><p>O caminho acessado não existe ou foi reorganizado. Continue pela Home ou fale com a equipe BLUM.</p><div class="premium-actions"><a href="/index.html" class="premium-btn premium-btn-outline">Voltar para a Home</a>${cta('Falar no WhatsApp')}</div></div></section>`;
  return layout({ title: 'Página não encontrada | BLUM Digital', description: 'Página não encontrada no site da BLUM Digital.', canonical: '/404', image: 'hero-lion-blum-1600.webp' }, body);
}

function premiumCss() {
  return `:root {
  --color-bordo-imperial: #791F28;
  --color-bordo-profundo: #48131A;
  --color-vinho-noturno: #240C10;
  --color-champagne: #C6A56B;
  --color-grafite: #171719;
  --color-marfim: #F4F0E8;
  --color-branco: #FFFFFF;
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; overflow-x: hidden; background: var(--color-grafite); }
body.premium-page { margin: 0; overflow-x: hidden; background: linear-gradient(180deg, var(--color-vinho-noturno), var(--color-grafite)); color: var(--color-marfim); font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
a { color: inherit; }
img { max-width: 100%; height: auto; display: block; }
.premium-container { width: min(1200px, calc(100% - 48px)); margin: 0 auto; }
.premium-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 18px; align-items: start; width: min(1340px, calc(100% - 48px)); margin: 14px auto 0; pointer-events: none; }
.premium-brand { width: 132px; height: 138px; pointer-events: auto; filter: drop-shadow(0 16px 30px rgba(0,0,0,.45)) drop-shadow(0 0 18px rgba(198,165,107,.2)); }
.premium-brand img { width: auto; height: 138px; object-fit: contain; }
.premium-nav-shell { min-height: 76px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 20px; align-items: center; padding: 10px 12px 10px 24px; border: 1px solid rgba(198,165,107,.24); border-radius: 8px; background: rgba(23,23,25,.82); box-shadow: 0 20px 56px rgba(0,0,0,.35); backdrop-filter: blur(20px); pointer-events: auto; }
.premium-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; min-width: 0; }
.premium-nav a { text-decoration: none; color: rgba(244,240,232,.75); font-size: .76rem; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; transition: color .2s ease; }
.premium-nav a:hover { color: var(--color-champagne); }
.premium-nav-cta, .premium-mobile-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 18px; border-radius: 8px; background: var(--color-bordo-imperial); color: var(--color-branco); border: 1px solid rgba(198,165,107,.44); text-decoration: none; font-weight: 800; box-shadow: 0 16px 34px rgba(121,31,40,.35), 0 0 20px rgba(198,165,107,.14); }
.premium-menu-button { display: none; pointer-events: auto; }
.premium-mobile-menu { display: none; }
.premium-hero { position: relative; min-height: 94svh; display: flex; align-items: flex-end; padding: 180px 0 90px; overflow: hidden; background: var(--color-vinho-noturno); }
.premium-hero-media, .premium-hero-media img { position: absolute; inset: 0; width: 100%; height: 100%; }
.premium-hero-media img { object-fit: cover; filter: saturate(.82) brightness(.58) contrast(1.08); transform: scale(1.02); }
.premium-hero-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 38%, rgba(198,165,107,.12), transparent 34%), linear-gradient(90deg, rgba(36,12,16,.96) 0%, rgba(36,12,16,.74) 43%, rgba(23,23,25,.72) 100%), linear-gradient(180deg, rgba(23,23,25,.12), rgba(23,23,25,.98)); }
.premium-hero-content { position: relative; z-index: 2; max-width: 820px; margin-left: max(24px, calc((100vw - 1200px) / 2)); }
.premium-kicker { display: inline-flex; align-items: center; width: fit-content; padding: .42rem .72rem; border: 1px solid rgba(198,165,107,.42); border-radius: 999px; background: rgba(198,165,107,.1); color: var(--color-champagne); font-size: .74rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
h1, h2, h3 { font-family: var(--font-heading); letter-spacing: 0; }
.premium-hero h1 { margin: 1.15rem 0 0; max-width: 820px; font-size: 5.2rem; line-height: .96; color: var(--color-marfim); text-wrap: balance; }
.premium-hero p { max-width: 690px; margin: 1.45rem 0 0; color: rgba(244,240,232,.8); font-size: clamp(1rem, 1.6vw, 1.22rem); line-height: 1.75; }
.premium-badges { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1.65rem; }
.premium-badges span { padding: .5rem .72rem; border: 1px solid rgba(198,165,107,.26); border-radius: 999px; color: var(--color-champagne); background: rgba(23,23,25,.42); font-size: .78rem; font-weight: 700; }
.premium-actions { display: flex; flex-wrap: wrap; gap: .85rem; margin-top: 2rem; }
.premium-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 1.35rem; border-radius: 8px; text-decoration: none; font-weight: 800; }
.premium-btn-primary { background: var(--color-bordo-imperial); color: var(--color-branco); border: 1px solid rgba(198,165,107,.42); box-shadow: 0 18px 42px rgba(121,31,40,.34), 0 0 24px rgba(198,165,107,.14); }
.premium-btn-outline { color: var(--color-marfim); border: 1px solid rgba(198,165,107,.54); background: rgba(23,23,25,.32); }
.premium-section { padding: 104px 0; background: var(--color-grafite); }
.premium-section-alt { background: linear-gradient(180deg, var(--color-vinho-noturno), var(--color-grafite)); border-top: 1px solid rgba(198,165,107,.11); border-bottom: 1px solid rgba(198,165,107,.11); }
.premium-section-header { max-width: 780px; margin: 0 auto 3.25rem; text-align: center; }
.premium-section-header h2, .premium-cta-box h2, .premium-large-card h2 { margin: 1rem 0 0; color: var(--color-marfim); font-size: 4.35rem; line-height: .96; }
.premium-section-header p, .premium-cta-box p { color: rgba(244,240,232,.74); line-height: 1.75; }
.premium-card-grid, .premium-case-grid, .premium-blog-grid, .premium-split, .premium-two-col { display: grid; gap: 1.1rem; }
.premium-card-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.premium-grid-four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.premium-grid-three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.premium-two-col { grid-template-columns: 1.2fr .8fr; align-items: start; }
.premium-split { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.premium-card, .premium-media-card, .premium-case-card, .premium-blog-card, .premium-testimonial, .premium-cta-box { border: 1px solid rgba(198,165,107,.24); border-radius: 8px; background: linear-gradient(145deg, rgba(23,23,25,.96), rgba(36,12,16,.82)); box-shadow: 0 22px 60px rgba(0,0,0,.24); }
.premium-card { padding: 1.55rem; }
.premium-card h3, .premium-media-card h3, .premium-case-card h3, .premium-blog-card h3 { margin: .85rem 0 0; color: var(--color-champagne); font-size: 1.55rem; line-height: 1.1; }
.premium-card p, .premium-media-card p, .premium-case-card p, .premium-blog-card p, .premium-large-card p { color: rgba(244,240,232,.74); line-height: 1.72; }
.premium-card-icon { width: 72px; height: 72px; object-fit: cover; border-radius: 15px; box-shadow: 0 12px 30px rgba(0,0,0,.3); }
.premium-media-card { padding: 1.25rem; position: sticky; top: 130px; }
.premium-service-icon { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid rgba(198,165,107,.26); }
.premium-case-grid, .premium-blog-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.premium-case-card, .premium-blog-card { display: block; overflow: hidden; text-decoration: none; color: inherit; transition: transform .2s ease, border-color .2s ease; }
.premium-case-card:hover, .premium-blog-card:hover { transform: translateY(-4px); border-color: rgba(198,165,107,.72); }
.premium-case-card div, .premium-blog-card div { padding: 1.25rem; }
.premium-case-card span, .premium-blog-card span, .premium-case-card strong, .premium-blog-card strong { color: var(--color-champagne); font-size: .78rem; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
.premium-case-thumb, .premium-blog-card img { width: 100%; height: 230px; object-fit: cover; filter: saturate(.85) brightness(.8); border-bottom: 1px solid rgba(198,165,107,.2); }
.premium-gallery { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.premium-gallery figure { margin: 0; overflow: hidden; border: 1px solid rgba(198,165,107,.24); border-radius: 8px; background: rgba(23,23,25,.76); }
.premium-gallery img { width: 100%; height: 280px; object-fit: cover; filter: saturate(.88) brightness(.82); }
.premium-gallery figcaption { padding: .8rem 1rem; color: var(--color-champagne); font-weight: 700; }
.premium-testimonial { padding: clamp(1.6rem, 4vw, 3rem); text-align: center; }
.premium-stars { color: var(--color-champagne); letter-spacing: .18em; }
.premium-testimonial p { max-width: 860px; margin: 1rem auto; color: rgba(244,240,232,.88); font-size: 1.75rem; font-family: var(--font-heading); line-height: 1.25; }
.premium-testimonial footer { color: var(--color-champagne); font-weight: 800; }
.premium-cta-section { padding: 92px 0; background: linear-gradient(135deg, var(--color-bordo-imperial), var(--color-vinho-noturno)); }
.premium-cta-box { padding: clamp(1.5rem, 5vw, 4rem); text-align: center; }
.premium-article { padding: 170px 0 80px; background: var(--color-grafite); }
.premium-article-head { max-width: 880px; text-align: center; }
.premium-article-head h1, .premium-simple-page h1 { margin: 1rem 0; font-size: 5rem; line-height: .95; }
.premium-article-head p { color: rgba(244,240,232,.75); line-height: 1.75; }
.premium-article-cover { margin-top: 2rem; overflow: hidden; border-radius: 8px; border: 1px solid rgba(198,165,107,.24); }
.premium-article-cover img { width: 100%; max-height: 520px; object-fit: cover; filter: brightness(.78); }
.premium-article-body { max-width: 820px; color: rgba(244,240,232,.82); font-size: 1.08rem; line-height: 1.9; }
.premium-article-body h2 { margin-top: 2.4rem; color: var(--color-champagne); font-size: 2.2rem; }
.premium-simple-page { min-height: 100svh; padding: 180px 0 90px; background: linear-gradient(180deg, var(--color-vinho-noturno), var(--color-grafite)); }
.premium-footer { padding: 70px 0 28px; background: var(--color-vinho-noturno); border-top: 1px solid rgba(198,165,107,.28); }
.premium-footer-grid { width: min(1200px, calc(100% - 48px)); margin: 0 auto; display: grid; grid-template-columns: 1.35fr repeat(3, 1fr); gap: 2rem; }
.premium-footer-logo { width: 108px; height: auto; margin-bottom: 1rem; }
.premium-footer h3 { color: var(--color-champagne); font-family: var(--font-body); text-transform: uppercase; font-size: .82rem; letter-spacing: .1em; }
.premium-footer p, .premium-footer a, .premium-footer-bottom { color: rgba(244,240,232,.7); line-height: 1.7; }
.premium-footer a { display: block; text-decoration: none; margin: .45rem 0; }
.premium-footer a:hover { color: var(--color-champagne); }
.premium-footer-bottom { width: min(1200px, calc(100% - 48px)); margin: 2rem auto 0; padding-top: 1.2rem; border-top: 1px solid rgba(198,165,107,.16); display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; font-size: .9rem; }
.premium-whatsapp { position: fixed; right: 1.45rem; bottom: 1.45rem; z-index: 110; width: 60px; height: 60px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #20BF63; color: white; box-shadow: 0 16px 38px rgba(32,191,99,.28), 0 0 0 8px rgba(32,191,99,.12); }
.premium-whatsapp svg { width: 34px; height: 34px; }
.premium-whatsapp span { position: absolute; right: 70px; width: max-content; max-width: 220px; padding: .55rem .75rem; border-radius: 8px; background: rgba(23,23,25,.92); border: 1px solid rgba(198,165,107,.24); color: var(--color-marfim); opacity: 0; transform: translateX(8px); pointer-events: none; transition: .2s ease; }
.premium-whatsapp:hover span { opacity: 1; transform: translateX(0); }
@media (max-width: 1180px) {
  .premium-header { grid-template-columns: 110px minmax(0, 1fr); width: calc(100% - 28px); }
  .premium-brand, .premium-brand img { width: 96px; height: 112px; }
  .premium-nav-shell { display: none; }
  .premium-menu-button { position: fixed; top: 14px; right: 14px; z-index: 130; width: 66px; height: 66px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; border: 1px solid rgba(198,165,107,.38); border-radius: 8px; background: rgba(23,23,25,.84); box-shadow: 0 14px 34px rgba(0,0,0,.34); }
  .premium-menu-button span { width: 28px; height: 2px; background: var(--color-champagne); border-radius: 999px; transition: .2s ease; }
  .premium-menu-button.is-open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
  .premium-menu-button.is-open span:nth-child(2) { opacity: 0; }
  .premium-menu-button.is-open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
  .premium-mobile-menu { position: fixed; inset: 0; z-index: 120; display: grid; place-content: start center; gap: .25rem; padding: 132px 24px 30px; background: rgba(23,23,25,.98); opacity: 0; visibility: hidden; pointer-events: none; transition: .22s ease; }
  .premium-mobile-menu.is-open { opacity: 1; visibility: visible; pointer-events: auto; }
  .premium-mobile-menu a { width: min(420px, calc(100vw - 48px)); padding: .9rem 0; border-bottom: 1px solid rgba(198,165,107,.18); text-align: center; text-decoration: none; color: var(--color-marfim); font-weight: 800; }
}
@media (max-width: 900px) {
  .premium-card-grid, .premium-grid-four, .premium-grid-three, .premium-case-grid, .premium-blog-grid, .premium-gallery, .premium-two-col, .premium-split, .premium-footer-grid { grid-template-columns: 1fr; }
  .premium-media-card { position: static; }
  .premium-hero { min-height: auto; padding: 150px 0 76px; }
  .premium-hero h1 { font-size: 3.25rem; }
  .premium-article-head h1, .premium-simple-page h1 { font-size: 3.2rem; }
  .premium-section-header h2, .premium-cta-box h2, .premium-large-card h2 { font-size: 3rem; }
  .premium-testimonial p { font-size: 1.45rem; }
  .premium-container { width: min(100% - 32px, 680px); }
  .premium-hero-content { margin-left: auto; }
  .premium-footer-bottom { flex-direction: column; }
}
@media (max-width: 520px) {
  .premium-hero h1 { font-size: 2.85rem; }
  .premium-article-head h1, .premium-simple-page h1 { font-size: 2.7rem; }
  .premium-section-header h2, .premium-cta-box h2, .premium-large-card h2 { font-size: 2.45rem; }
  .premium-actions, .premium-btn { width: 100%; }
  .premium-gallery img, .premium-case-thumb, .premium-blog-card img { height: 220px; }
  .premium-whatsapp { right: 1rem; bottom: 1rem; width: 56px; height: 56px; }
  .premium-whatsapp span { display: none; }
}`;
}

function updateHomeCases() {
  const homePath = path.join(dist, 'index.html');
  let html = fs.readFileSync(homePath, 'utf8');
  const replacements = [
    ['<blockquote class="cases-v2-card">', '<a class="cases-v2-card cases-v2-card-link" href="/cases/colegio-leme.html" aria-label="Ver case completo Colegio Leme">'],
    ['<blockquote class="cases-v2-card">', '<a class="cases-v2-card cases-v2-card-link" href="/cases/avila-cortinas-e-persianas.html" aria-label="Ver case completo Cortinas e Persianas Avila">'],
    ['<blockquote class="cases-v2-card">', '<a class="cases-v2-card cases-v2-card-link" href="/cases/fine-conceito.html" aria-label="Ver case completo Fine Conceito">'],
    ['<blockquote class="cases-v2-card">', '<a class="cases-v2-card cases-v2-card-link" href="/cases/asia-express.html" aria-label="Ver case completo Asia Express">'],
    ['<blockquote class="cases-v2-card">', '<a class="cases-v2-card cases-v2-card-link" href="/cases/pastelaria-sachet.html" aria-label="Ver case completo Pastelaria Sachet">'],
    ['<blockquote class="cases-v2-card">', '<a class="cases-v2-card cases-v2-card-link" href="/cases/e-pulse.html" aria-label="Ver case completo E-Pulse">']
  ];
  for (const [from, to] of replacements) {
    html = html.replace(from, to).replace('</blockquote>', '</a>');
  }
  html = html
    .replaceAll('href="/google-meu-negocio"', 'href="/google-meu-negocio.html"')
    .replaceAll('href="/criacao-de-sites"', 'href="/criacao-de-sites.html"')
    .replaceAll('href="/trafego-pago"', 'href="/trafego-pago.html"')
    .replaceAll('href="/seo-local"', 'href="/seo-local.html"')
    .replaceAll('href="/tour-virtual-360"', 'href="/tour-virtual-360.html"')
    .replaceAll('href="/gestao-redes-sociais"', 'href="/gestao-redes-sociais.html"')
    .replaceAll('href="/cases/"', 'href="/cases.html"')
    .replaceAll('href="/blog/"', 'href="/blog.html"')
    .replaceAll('href="/socio-digital"', 'href="/socio-digital.html"')
    .replaceAll('href="/propostas-comerciais"', 'href="/propostas.html"')
    .replaceAll('href="/#servicos"', 'href="/index.html#servicos"')
    .replaceAll('href="/#planos"', 'href="/index.html#planos"')
    .replaceAll('href="/#faq"', 'href="/index.html#faq"')
    .replaceAll('href="/"', 'href="/index.html"');
  fs.writeFileSync(homePath, cleanText(html), 'utf8');
}

function main() {
  fs.mkdirSync(cssDir, { recursive: true });
  fs.writeFileSync(path.join(cssDir, 'premium-pages.css'), cleanText(premiumCss()), 'utf8');

  services.forEach((service) => {
    const html = servicePage(service);
    write(service.file, html);
    writeAliasFromHtml(service.file, html);
  });
  const socialMediaPage = servicePage({ ...services[5], file: 'social-media.html', slug: 'social-media', title: 'Social Media Estratégico | BLUM Digital' });
  write('social-media.html', socialMediaPage);
  writeAliasFromHtml('social-media.html', socialMediaPage);

  write('cases.html', caseIndex());
  write(path.join('cases', 'index.html'), caseIndex());
  write('casos-de-sucesso.html', caseIndex());
  cases.forEach((item) => {
    const html = casePage(item);
    write(item.file, html);
    writeAliasFromHtml(item.file, html);
  });

  write('blog.html', blogIndex());
  write(path.join('blog', 'index.html'), blogIndex());
  blogPosts.forEach((post) => {
    const html = articlePage(post);
    write(post.file, html);
    writeAliasFromHtml(post.file, html);
  });

  const socioHtml = socioPage();
  write('socio-digital.html', socioHtml);
  writeAliasFromHtml('socio-digital.html', socioHtml);
  write('planos.html', plansIndex());
  write(path.join('planos', 'index.html'), plansIndex());
  planData.forEach((plan) => {
    const html = planPage(plan);
    write(plan.file, html);
    writeAliasFromHtml(plan.file, html);
  });

  write('propostas.html', proposalIndex());
  write(path.join('propostas', 'index.html'), proposalIndex('Propostas Comerciais | BLUM Digital', '/propostas'));
  write('propostas-comerciais.html', proposalIndex('Propostas Comerciais | BLUM Digital', '/propostas-comerciais'));
  write(path.join('propostas-comerciais', 'index.html'), proposalIndex('Propostas Comerciais | BLUM Digital', '/propostas-comerciais'));

  proposals.forEach((p) => {
    const mainPage = proposalPage(p);
    write(path.join('propostas', `${p.slug}.html`), mainPage);
    write(path.join('propostas', p.slug, 'index.html'), mainPage);
    write(path.join('propostas-comerciais', `${p.slug}.html`), mainPage);
    write(path.join('propostas-comerciais', p.slug, 'index.html'), mainPage);
    ['bonus', 'metrica', 'metricas', 'projecao', 'pdf'].forEach((child) => {
      const label = child === 'bonus' ? 'Bônus da Proposta' : child === 'pdf' ? 'Resumo para Apresentação' : child.startsWith('metric') ? 'Métricas e Indicadores' : 'Projeção Comercial';
      const page = proposalPage(p, label);
      write(path.join('propostas', p.slug, `${child}.html`), page);
      write(path.join('propostas', p.slug, child, 'index.html'), page);
      write(path.join('propostas-comerciais', p.slug, `${child}.html`), page);
      write(path.join('propostas-comerciais', p.slug, child, 'index.html'), page);
    });
  });

  const privacyHtml = privacyPage();
  write('politica-de-privacidade.html', privacyHtml);
  writeAliasFromHtml('politica-de-privacidade.html', privacyHtml);
  write('404.html', notFoundPage());
  updateHomeCases();
}

main();

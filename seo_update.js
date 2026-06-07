const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://digitalblum.com';
const OG_IMAGE = `${DOMAIN}/assets/img/card1.png`;
const dir = 'c:/Users/paulo/OneDrive/Pictures/Desktop/Sites Antigravity/Blum-Digital/dist';

// SEO config per page
const pages = [
  {
    file: 'index.html',
    url: `${DOMAIN}/`,
    title: 'BLUM Digital | Marketing Digital em Criciúma, SC',
    desc: 'Agência de marketing digital em Criciúma. Google Meu Negócio, criação de sites, SEO local e tráfego pago para empresas que querem crescer.',
    og_image: `${DOMAIN}/assets/img/herodeverdade.png`,
    type: 'website',
  },
  {
    file: 'google-meu-negocio.html',
    url: `${DOMAIN}/google-meu-negocio`,
    title: 'Google Meu Negócio em Criciúma | BLUM Digital',
    desc: 'Otimize e gerencie seu Perfil da Empresa no Google. Apareça antes do concorrente no Maps e gere mais clientes em Criciúma e região.',
    og_image: `${DOMAIN}/assets/img/card1.png`,
    type: 'website',
  },
  {
    file: 'criacao-de-sites.html',
    url: `${DOMAIN}/criacao-de-sites`,
    title: 'Criação de Sites em Criciúma | BLUM Digital',
    desc: 'Sites profissionais, landing pages e e-commerces para empresas em Criciúma. Rápidos, responsivos, com SEO técnico e foco em conversão.',
    og_image: `${DOMAIN}/assets/img/card2.png`,
    type: 'website',
  },
  {
    file: 'trafego-pago.html',
    url: `${DOMAIN}/trafego-pago`,
    title: 'Tráfego Pago em Criciúma | Google Ads e Meta Ads',
    desc: 'Campanhas estratégicas no Google e Meta Ads para gerar leads qualificados e transformar investimento em clientes reais em Criciúma, SC.',
    og_image: `${DOMAIN}/assets/img/card3.png`,
    type: 'website',
  },
  {
    file: 'seo-local.html',
    url: `${DOMAIN}/seo-local`,
    title: 'SEO Local em Criciúma | Apareça no Google | BLUM Digital',
    desc: 'Estratégias de SEO local para empresas em Criciúma. Apareça nas primeiras posições do Google e atraia mais clientes de forma orgânica.',
    og_image: `${DOMAIN}/assets/img/heroseo.png`,
    type: 'website',
  },
  {
    file: 'tour-virtual-360.html',
    url: `${DOMAIN}/tour-virtual-360`,
    title: 'Tour Virtual 360° em Criciúma | Street View | BLUM Digital',
    desc: 'Tour virtual 360° integrado ao Google Street View para empresas em Criciúma. Destaque-se no Maps e aumente as conversões.',
    og_image: `${DOMAIN}/assets/img/hero360.png`,
    type: 'website',
  },
  {
    file: 'gestao-redes-sociais.html',
    url: `${DOMAIN}/gestao-redes-sociais`,
    title: 'Gestão de Redes Sociais em Criciúma | BLUM Digital',
    desc: 'Gestão estratégica de Instagram e Facebook para empresas em Criciúma. Conteúdo, autoridade de marca e presença digital que geram clientes.',
    og_image: `${DOMAIN}/assets/img/herosocialmedia.png`,
    type: 'website',
  },
  {
    file: 'socio-digital.html',
    url: `${DOMAIN}/socio-digital`,
    title: 'Sócio Digital BLUM | Parceria Estratégica em Criciúma',
    desc: 'Programa exclusivo para empresas em Criciúma que querem um parceiro digital estratégico. Setup único + participação no crescimento.',
    og_image: `${DOMAIN}/assets/img/hero-socio.png`,
    type: 'website',
  },
  {
    file: 'cases/index.html',
    url: `${DOMAIN}/cases`,
    title: 'Cases de Sucesso | Resultados Reais | BLUM Digital',
    desc: 'Resultados reais que a BLUM Digital entregou para empresas em Criciúma. Cases de Google Meu Negócio, sites, SEO local e tráfego pago.',
    og_image: `${DOMAIN}/assets/img/casosdesucesso.png`,
    type: 'website',
  },
  {
    file: 'blog/index.html',
    url: `${DOMAIN}/blog`,
    title: 'Blog BLUM Digital | Marketing Digital para Negócios Locais',
    desc: 'Conteúdo estratégico sobre marketing digital, SEO local, Google e tráfego pago para empresas em Criciúma e região Sul do Brasil.',
    og_image: `${DOMAIN}/assets/img/heroblog.png`,
    type: 'website',
  },
  {
    file: 'propostas/index.html',
    url: `${DOMAIN}/propostas`,
    title: 'Propostas Comerciais | BLUM Digital',
    desc: 'Area de propostas comerciais da BLUM Digital para clientes e parceiros acessarem apresentacoes, escopos e planos personalizados.',
    og_image: `${DOMAIN}/assets/img/proposta.png`,
    type: 'website',
  },
  {
    file: 'blum-start.html',
    url: `${DOMAIN}/blum-start`,
    title: 'BLUM Start | Plano de Marketing Digital Inicial | Criciúma',
    desc: 'Plano de entrada para empresas que querem presença digital profissional em Criciúma. Google Meu Negócio e site otimizado inclusos.',
    og_image: `${DOMAIN}/assets/img/hero-bg.png`,
    type: 'website',
  },
  {
    file: 'blum-authority.html',
    url: `${DOMAIN}/blum-authority`,
    title: 'BLUM Authority | Autoridade Digital em Criciúma',
    desc: 'Plano completo para empresas que querem autoridade digital em Criciúma. GMB, site profissional, SEO local e Tour Virtual 360° inclusos.',
    og_image: `${DOMAIN}/assets/img/hero-bg2.png`,
    type: 'website',
  },
  {
    file: 'blum-apex.html',
    url: `${DOMAIN}/blum-apex`,
    title: 'BLUM Apex | Dominação Digital em Criciúma | BLUM Digital',
    desc: 'Plano máximo da BLUM Digital. Tráfego pago, drone, tour virtual e ecossistema completo de dominação digital para empresas em Criciúma.',
    og_image: `${DOMAIN}/assets/img/hero-bg3.png`,
    type: 'website',
  },
  {
    file: 'social-media.html',
    url: `${DOMAIN}/social-media`,
    title: 'Plano Social Media Estratégico | BLUM Digital Criciúma',
    desc: 'Plano especializado em gestão de redes sociais. Conteúdo estratégico, autoridade de marca e presença digital para empresas em Criciúma.',
    og_image: `${DOMAIN}/assets/img/herosocialmedia.png`,
    type: 'website',
  },
  {
    file: 'blog/5-razoes-empresas-criciuma-perdem-clientes-google.html',
    url: `${DOMAIN}/blog/5-razoes-empresas-criciuma-perdem-clientes-google`,
    title: '5 Razões para Perder Clientes no Google Meu Negócio | BLUM',
    desc: 'Perfil incompleto, sem avaliações, sem fotos. Veja os erros que empurram seus clientes para o concorrente no Google Maps e como corrigi-los.',
    og_image: `${DOMAIN}/assets/img/card1.png`,
    type: 'article',
  },
  {
    file: 'blog/quanto-custa-criar-site-profissional.html',
    url: `${DOMAIN}/blog/quanto-custa-criar-site-profissional`,
    title: 'Quanto Custa um Site Profissional? O que Ninguém te Conta',
    desc: 'Descubra as 4 faixas de preço do mercado, o que está incluído no orçamento e como identificar um projeto que vai te decepcionar.',
    og_image: `${DOMAIN}/assets/img/card2.png`,
    type: 'article',
  },
  {
    file: 'blog/seo-local-vs-seo-nacional.html',
    url: `${DOMAIN}/blog/seo-local-vs-seo-nacional`,
    title: 'SEO Local vs SEO Nacional: Qual é o Certo para Você? | BLUM',
    desc: 'Entenda a diferença entre SEO local e nacional e qual estratégia gera mais resultado para negócios em Criciúma e região.',
    og_image: `${DOMAIN}/assets/img/heroseo.png`,
    type: 'article',
  },
  {
    file: 'blog/google-ads-ou-meta-ads-negocios-locais.html',
    url: `${DOMAIN}/blog/google-ads-ou-meta-ads-negocios-locais`,
    title: 'Google Ads ou Meta Ads para Negócios Locais em SC? | BLUM',
    desc: 'Compare as duas plataformas e descubra qual gera mais retorno para o seu negócio em Santa Catarina — sem desperdiçar verba.',
    og_image: `${DOMAIN}/assets/img/card3.png`,
    type: 'article',
  },
];

function buildSeoBlock(p) {
  return `
  <!-- ══ SEO ══════════════════════════════════════════════════ -->
  <meta name="description" content="${p.desc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${p.url}" />

  <!-- Open Graph -->
  <meta property="og:type"        content="${p.type}" />
  <meta property="og:title"       content="${p.title}" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:url"         content="${p.url}" />
  <meta property="og:image"       content="${p.og_image}" />
  <meta property="og:locale"      content="pt_BR" />
  <meta property="og:site_name"   content="BLUM Digital" />

  <!-- Twitter Cards -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${p.title}" />
  <meta name="twitter:description" content="${p.desc}" />
  <meta name="twitter:image"       content="${p.og_image}" />
  <!-- ════════════════════════════════════════════════════════ -->`;
}

function buildFaviconBlock() {
  return `
  <!-- Favicon -->
  <link rel="icon"          type="image/svg+xml" href="/assets/img/favicon-blum.svg?v=2" />
  <link rel="shortcut icon" type="image/svg+xml" href="/assets/img/favicon-blum.svg?v=2" />
  <link rel="apple-touch-icon" href="/assets/img/favicon-blum.svg?v=2" />`;
}

// Tags we want to strip before re-inserting (avoid duplicates)
const stripPatterns = [
  /<meta\s+name="description"[^>]*>/gi,
  /<meta\s+name="robots"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<meta\s+property="twitter:[^"]*"[^>]*>/gi,
  // existing favicon links
  /<link\s+rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>/gi,
  // strip SEO comment blocks we inserted before
  /\n\s*<!-- ══ SEO ══[^]*?══ -->/g,
  /\n\s*<!-- Favicon -->\n[\s\S]*?<link rel="shortcut icon"[^>]*>\n?/g,
];

let totalUpdated = 0;
const log = [];

pages.forEach(p => {
  const fp = path.join(dir, p.file);
  if (!fs.existsSync(fp)) {
    log.push(`SKIP (not found): ${p.file}`);
    return;
  }

  let html = fs.readFileSync(fp, 'utf8');

  // 1. Ensure lang="pt-BR" on <html>
  if (!html.includes('lang="pt-BR"')) {
    html = html.replace(/<html\b([^>]*)>/i, (m, attrs) => `<html${attrs} lang="pt-BR">`);
  }

  // 2. Ensure charset UTF-8
  if (!html.includes('charset')) {
    html = html.replace(/<head>/i, '<head>\n  <meta charset="UTF-8" />');
  }

  // 3. Ensure viewport
  if (!html.includes('name="viewport"')) {
    html = html.replace(/<meta\s+charset[^>]*>/i, m => `${m}\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
  }

  // 4. Strip duplicate SEO + favicon tags
  stripPatterns.forEach(rx => { html = html.replace(rx, ''); });

  // 5. Update <title>
  if (/<title>/.test(html)) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${p.title}</title>`);
  } else {
    html = html.replace(/<\/head>/i, `  <title>${p.title}</title>\n</head>`);
  }

  // 6. Inject SEO block + favicon right after <title>
  html = html.replace(/<\/title>/i, `</title>${buildSeoBlock(p)}\n${buildFaviconBlock()}`);

  // 7. Clean up multiple blank lines
  html = html.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(fp, html, 'utf8');
  log.push(`OK: ${p.file} — "${p.title}" (${p.title.length} chars)`);
  totalUpdated++;
});

const routeAliases = [
  ['cases/index.html', 'cases.html'],
  ['blog/index.html', 'blog.html'],
  ['propostas/index.html', 'propostas.html'],
  ['propostas/index.html', 'propostas-comerciais/index.html'],
  ['propostas/hypeful.html', 'propostas/hypeful/index.html'],
  ['propostas/nonnas.html', 'propostas/nonnas/index.html'],
  ['propostas/nonnas.html', 'propostas-comerciais/nonnas/index.html'],
  ['propostas/nonnas/bonus.html', 'propostas/nonnas/bonus/index.html'],
  ['propostas/nonnas/bonus.html', 'propostas-comerciais/nonnas/bonus/index.html'],
  ['propostas/nonnas/projecao.html', 'propostas/nonnas/projecao/index.html'],
  ['propostas/nonnas/projecao.html', 'propostas-comerciais/nonnas/projecao/index.html'],
];

routeAliases.forEach(([source, target]) => {
  const sourcePath = path.join(dir, source);
  const targetPath = path.join(dir, target);
  if (!fs.existsSync(sourcePath)) {
    log.push(`SKIP alias (not found): ${source}`);
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
  log.push(`SYNC alias: ${target} <- ${source}`);
});

// ── sitemap.xml ──────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];
const sitemapUrls = pages.map(p => {
  const priority = p.file === 'index.html' ? '1.0'
    : p.file.startsWith('blog/') ? '0.7'
    : p.file.includes('blum-') || p.file === 'social-media.html' ? '0.6'
    : '0.8';
  const freq = p.file === 'index.html' ? 'weekly'
    : p.file.startsWith('blog/') ? 'monthly'
    : 'monthly';
  return `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap, 'utf8');
log.push('CREATED: dist/sitemap.xml');

// ── robots.txt ───────────────────────────────────────────────
const robots = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync(path.join(dir, 'robots.txt'), robots, 'utf8');
log.push('CREATED: dist/robots.txt');

// ── Report ───────────────────────────────────────────────────
console.log(`\n✅ SEO Update Complete — ${totalUpdated} pages updated\n`);
log.forEach(l => console.log(' •', l));
console.log(`\nDomain: ${DOMAIN}`);

const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/paulo/OneDrive/Pictures/Desktop/Sites Antigravity/Blum-Digital/dist';
const DOMAIN = 'https://digitalblum.com';
const ORG_ID = `${DOMAIN}/#organization`;
const WS_ID  = `${DOMAIN}/#website`;

// ── Shared blocks ────────────────────────────────────────────

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "@id": ORG_ID,
  "name": "BLUM Digital",
  "url": DOMAIN,
  "logo": {
    "@type": "ImageObject",
    "url": `${DOMAIN}/assets/img/logo.png`,
    "width": 320,
    "height": 160
  },
  "image": `${DOMAIN}/assets/img/herodeverdade.png`,
  "description": "Agência de marketing digital em Criciúma, SC. Especializada em Google Meu Negócio, criação de sites, SEO local, tráfego pago, Tour Virtual 360° e gestão de redes sociais.",
  "telephone": "+5548999517566",
  "email": "contato@digitalblum.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Criciúma",
    "addressRegion": "SC",
    "addressCountry": "BR"
  },
  "areaServed": [
    { "@type": "City", "name": "Criciúma" },
    { "@type": "State", "name": "Santa Catarina" },
    { "@type": "Country", "name": "Brasil" }
  ],
  "sameAs": [
    "https://www.instagram.com/blumdigital",
    "https://www.facebook.com/blumdigital"
  ],
  "founder": {
    "@type": "Person",
    "name": "Paulo Daniel Blum"
  }
};

const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "@id": `${DOMAIN}/#localbusiness`,
  "name": "BLUM Digital",
  "image": `${DOMAIN}/assets/img/herodeverdade.png`,
  "url": DOMAIN,
  "telephone": "+5548999517566",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Criciúma",
    "addressRegion": "SC",
    "postalCode": "88800-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -28.6784,
    "longitude": -49.3695
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "12:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "13:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "08:00",
      "closes": "12:00"
    }
  ],
  "areaServed": [
    { "@type": "City",    "name": "Criciúma" },
    { "@type": "State",   "name": "Santa Catarina" },
    { "@type": "Country", "name": "Brasil" }
  ],
  "parentOrganization": { "@id": ORG_ID }
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WS_ID,
  "url": DOMAIN,
  "name": "BLUM Digital",
  "description": "Agência de marketing digital em Criciúma, SC.",
  "publisher": { "@id": ORG_ID },
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${DOMAIN}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string"
  }
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa contratar uma agência de marketing digital em Criciúma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em média, R$ 8.000 por mês — podendo variar entre R$ 2.000 e R$ 15.000 dependendo das soluções contratadas. Planos de entrada focam em presença no Google e redes sociais. Estruturas mais completas incluem site, tráfego pago, Tour Virtual 360° e gestão de conteúdo. O que define o valor é o que você precisa para crescer — não o que a agência quer vender."
      }
    },
    {
      "@type": "Question",
      "name": "Como melhorar o posicionamento da minha empresa no Google Maps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "São cinco pilares que fazem a diferença real: otimização completa do perfil no Google Business Profile, Tour Virtual 360° integrado ao Street View, site validado e linkado à ficha, respostas estratégicas e frequentes às avaliações dos clientes, e publicações regulares com fotos, ofertas e novidades. Quem faz os cinco consistentemente aparece antes dos concorrentes que fazem apenas um ou dois."
      }
    },
    {
      "@type": "Question",
      "name": "Vale a pena investir em Google Ads para empresas locais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vale — mas só se a casa estiver arrumada. Investir em tráfego pago sem ter um site que converte, uma página de destino objetiva, um perfil no Google otimizado e uma equipe comercial treinada para responder leads é jogar dinheiro fora. Quando tudo está alinhado, o Google Ads se torna um dos canais mais previsíveis de geração de clientes que existem."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo demora para aparecer no Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Com trabalho constante e estrutura bem feita, de 2 a 4 meses você já começa a ver resultado expressivo no posicionamento orgânico. O Google não premia quem parou, premia quem continua. Consistência não é diferencial, é requisito."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre SEO Local e Google Meu Negócio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Google Meu Negócio (Google Business Profile) é a sua vitrine no Maps — onde o cliente vê endereço, telefone, fotos e avaliações. SEO Local é a estratégia maior que inclui essa vitrine, mas também engloba seu site, backlinks locais, consistência de dados em diretórios e conteúdo que posiciona sua empresa como referência na região. Um sem o outro limita o resultado."
      }
    },
    {
      "@type": "Question",
      "name": "Por que ter um site profissional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sem site, nada do resto funciona como deveria. O site é o único espaço digital que é completamente seu — sem algoritmo, sem taxa de impulsionamento, sem regras de terceiros. É onde a confiança é construída, a conversão acontece e a empresa deixa de parecer amadora para parecer referência."
      }
    },
    {
      "@type": "Question",
      "name": "A BLUM Digital atende apenas Criciúma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Atendemos empresas de Santa Catarina, todo o Brasil e clientes internacionais."
      }
    },
    {
      "@type": "Question",
      "name": "Como solicitar atendimento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Você pode entrar em contato diretamente pelo WhatsApp para conversar sobre o seu projeto e entender as possibilidades para sua empresa."
      }
    }
  ]
};

const services = [
  {
    name: "Google Meu Negócio",
    desc: "Otimização e gestão do Perfil da Empresa no Google para melhorar presença no Maps, fortalecer autoridade local e gerar mais contatos em Criciúma e região.",
    url: `${DOMAIN}/google-meu-negocio`
  },
  {
    name: "Criação de Sites Profissionais",
    desc: "Desenvolvimento de sites profissionais, landing pages e e-commerces modernos, rápidos e focados em conversão com SEO técnico para empresas em Criciúma.",
    url: `${DOMAIN}/criacao-de-sites`
  },
  {
    name: "Tráfego Pago — Google Ads e Meta Ads",
    desc: "Gestão de campanhas estratégicas no Google Ads e Meta Ads para gerar leads qualificados e aumentar o retorno sobre investimento para empresas em Criciúma.",
    url: `${DOMAIN}/trafego-pago`
  },
  {
    name: "SEO Local",
    desc: "Estratégias de SEO local para posicionar empresas de Criciúma nas primeiras posições do Google e atrair clientes de forma orgânica e consistente.",
    url: `${DOMAIN}/seo-local`
  },
  {
    name: "Tour Virtual 360°",
    desc: "Criação e publicação de tour virtual 360° integrado ao Google Street View para empresas em Criciúma, aumentando visibilidade no Maps e conversões.",
    url: `${DOMAIN}/tour-virtual-360`
  },
  {
    name: "Gestão de Redes Sociais",
    desc: "Planejamento, criação de conteúdo e gestão de Instagram e Facebook para empresas em Criciúma construírem autoridade de marca e atraírem clientes.",
    url: `${DOMAIN}/gestao-redes-sociais`
  }
];

const schemaServices = services.map(s => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": s.name,
  "description": s.desc,
  "url": s.url,
  "provider": { "@id": ORG_ID },
  "areaServed": [
    { "@type": "City",    "name": "Criciúma" },
    { "@type": "State",   "name": "Santa Catarina" },
    { "@type": "Country", "name": "Brasil" }
  ],
  "serviceType": "Marketing Digital"
}));

const schemaBreadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": item.url
  }))
});

function toScript(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n<\/script>`;
}

function injectSchemas(html, schemas) {
  // Remove existing ld+json blocks to avoid duplicates
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  const block = schemas.map(toScript).join('\n\n  ');
  return html.replace('</head>', `\n  <!-- ══ JSON-LD Schemas ══════════════════════════════════ -->\n  ${block}\n  <!-- ══════════════════════════════════════════════════════ -->\n</head>`);
}

// ── Per-page schema config ───────────────────────────────────
const pageConfigs = [
  {
    file: 'index.html',
    schemas: [
      schemaOrganization,
      schemaLocalBusiness,
      schemaWebSite,
      schemaFAQ,
      ...schemaServices,
      schemaBreadcrumb([{ name: 'BLUM Digital', url: `${DOMAIN}/` }])
    ]
  },
  {
    file: 'google-meu-negocio.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      schemaServices[0],
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Google Meu Negócio', url: `${DOMAIN}/google-meu-negocio` }
      ])
    ]
  },
  {
    file: 'criacao-de-sites.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      schemaServices[1],
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Criação de Sites', url: `${DOMAIN}/criacao-de-sites` }
      ])
    ]
  },
  {
    file: 'trafego-pago.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      schemaServices[2],
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Tráfego Pago', url: `${DOMAIN}/trafego-pago` }
      ])
    ]
  },
  {
    file: 'seo-local.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      schemaServices[3],
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'SEO Local', url: `${DOMAIN}/seo-local` }
      ])
    ]
  },
  {
    file: 'tour-virtual-360.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      schemaServices[4],
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Tour Virtual 360°', url: `${DOMAIN}/tour-virtual-360` }
      ])
    ]
  },
  {
    file: 'gestao-redes-sociais.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      schemaServices[5],
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Gestão de Redes Sociais', url: `${DOMAIN}/gestao-redes-sociais` }
      ])
    ]
  },
  {
    file: 'socio-digital.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Sócio Digital BLUM",
        "description": "Programa exclusivo de parceria estratégica digital para empresas em Criciúma. Setup único mais participação no crescimento do negócio.",
        "url": `${DOMAIN}/socio-digital`,
        "provider": { "@id": ORG_ID },
        "areaServed": { "@type": "Country", "name": "Brasil" }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Sócio Digital', url: `${DOMAIN}/socio-digital` }
      ])
    ]
  },
  {
    file: 'cases/index.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Cases de Sucesso — BLUM Digital",
        "description": "Resultados reais que a BLUM Digital entregou para empresas em Criciúma e região.",
        "url": `${DOMAIN}/cases`,
        "publisher": { "@id": ORG_ID }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Cases', url: `${DOMAIN}/cases` }
      ])
    ]
  },
  {
    file: 'blog/index.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog BLUM Digital",
        "description": "Conteúdo estratégico sobre marketing digital, SEO local, Google e tráfego pago para empresas em Criciúma.",
        "url": `${DOMAIN}/blog`,
        "publisher": { "@id": ORG_ID }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` }
      ])
    ]
  },
  {
    file: 'propostas/index.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Propostas Comerciais | BLUM Digital",
        "description": "Area de propostas comerciais da BLUM Digital para clientes e parceiros acessarem apresentacoes, escopos e planos personalizados.",
        "url": `${DOMAIN}/propostas`,
        "publisher": { "@id": ORG_ID }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Propostas Comerciais', url: `${DOMAIN}/propostas` }
      ])
    ]
  },
  {
    file: 'blum-start.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "BLUM Start",
        "description": "Plano de entrada para empresas que querem presença digital profissional em Criciúma. Google Meu Negócio e site otimizado inclusos.",
        "url": `${DOMAIN}/blum-start`,
        "brand": { "@id": ORG_ID },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Planos', url: `${DOMAIN}/#planos` },
        { name: 'BLUM Start', url: `${DOMAIN}/blum-start` }
      ])
    ]
  },
  {
    file: 'blum-authority.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "BLUM Authority",
        "description": "Plano completo para empresas que querem autoridade digital em Criciúma. GMB, site profissional, SEO local e Tour Virtual 360° inclusos.",
        "url": `${DOMAIN}/blum-authority`,
        "brand": { "@id": ORG_ID },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Planos', url: `${DOMAIN}/#planos` },
        { name: 'BLUM Authority', url: `${DOMAIN}/blum-authority` }
      ])
    ]
  },
  {
    file: 'blum-apex.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "BLUM Apex",
        "description": "Plano máximo da BLUM Digital. Tráfego pago, drone, tour virtual e ecossistema completo de dominação digital para empresas em Criciúma.",
        "url": `${DOMAIN}/blum-apex`,
        "brand": { "@id": ORG_ID },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Planos', url: `${DOMAIN}/#planos` },
        { name: 'BLUM Apex', url: `${DOMAIN}/blum-apex` }
      ])
    ]
  },
  {
    file: 'social-media.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Plano Social Media Estratégico",
        "description": "Plano especializado em gestão de redes sociais. Conteúdo estratégico, autoridade de marca e presença digital para empresas em Criciúma.",
        "url": `${DOMAIN}/social-media`,
        "brand": { "@id": ORG_ID },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        }
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Planos', url: `${DOMAIN}/#planos` },
        { name: 'Social Media', url: `${DOMAIN}/social-media` }
      ])
    ]
  },
  // Blog posts
  {
    file: 'blog/5-razoes-empresas-criciuma-perdem-clientes-google.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "5 razões pelas quais empresas de Criciúma perdem clientes para o concorrente no Google — e como reverter isso",
        "description": "Perfil incompleto, sem avaliações, sem fotos. Veja os erros que empurram seus clientes para o concorrente no Google Maps e como corrigi-los.",
        "image": `${DOMAIN}/assets/img/card1.png`,
        "url": `${DOMAIN}/blog/5-razoes-empresas-criciuma-perdem-clientes-google`,
        "datePublished": "2026-05-18",
        "dateModified": "2026-05-18",
        "author": { "@type": "Person", "name": "Paulo Daniel Blum" },
        "publisher": { "@id": ORG_ID },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${DOMAIN}/blog/5-razoes-empresas-criciuma-perdem-clientes-google` }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "O Google Meu Negócio é gratuito?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Criar e manter um Perfil da Empresa no Google é totalmente gratuito. O investimento está no tempo de configuração e gestão contínua — ou em contratar um profissional para fazer isso de forma estratégica." } },
          { "@type": "Question", "name": "Quanto tempo leva para aparecer na primeira posição do Google Maps?", "acceptedAnswer": { "@type": "Answer", "text": "Com um perfil bem otimizado, os primeiros resultados costumam aparecer entre 30 e 90 dias. O posicionamento definitivo depende da concorrência local, da consistência das atualizações e do volume de avaliações." } },
          { "@type": "Question", "name": "Preciso de um site para ter Google Meu Negócio?", "acceptedAnswer": { "@type": "Answer", "text": "Não. É possível ter um perfil ativo mesmo sem site. Porém, ter um site profissional vinculado ao perfil aumenta a credibilidade e melhora o posicionamento nas buscas orgânicas." } },
          { "@type": "Question", "name": "O Google Meu Negócio substitui o site?", "acceptedAnswer": { "@type": "Answer", "text": "Não. O Perfil da Empresa é um canal de visibilidade local, excelente para buscas no Maps. Um site próprio é a sua presença completa na web — com mais controle, mais conteúdo e mais autoridade. Os dois se complementam." } }
        ]
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` },
        { name: '5 Razões para Perder Clientes no Google', url: `${DOMAIN}/blog/5-razoes-empresas-criciuma-perdem-clientes-google` }
      ])
    ]
  },
  {
    file: 'blog/quanto-custa-criar-site-profissional.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Quanto custa criar um site profissional? O que ninguém te conta sobre preço e valor",
        "description": "Descubra o que realmente diferencia um site barato de um site que gera clientes — e por que preço baixo pode sair muito mais caro no final.",
        "image": `${DOMAIN}/assets/img/card2.png`,
        "url": `${DOMAIN}/blog/quanto-custa-criar-site-profissional`,
        "datePublished": "2026-05-12",
        "dateModified": "2026-05-12",
        "author": { "@type": "Person", "name": "Paulo Daniel Blum" },
        "publisher": { "@id": ORG_ID },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${DOMAIN}/blog/quanto-custa-criar-site-profissional` }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Qual é o preço médio de um site profissional no Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "Entre R$ 5.000 e R$ 12.000 para pequenas e médias empresas com tudo incluso. Sites simples partem de R$ 3.000 e projetos complexos podem chegar a R$ 30.000 ou mais." } },
          { "@type": "Question", "name": "Quanto tempo leva para criar um site profissional?", "acceptedAnswer": { "@type": "Answer", "text": "Um site institucional bem estruturado leva entre 3 e 6 semanas do briefing à entrega. Prazos menores que 2 semanas geralmente indicam projeto superficial sem personalização real." } },
          { "@type": "Question", "name": "Meu site precisa ser mobile-first?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, sem exceção. Mais de 70% das pesquisas locais no Google são feitas por celular. O Google também prioriza sites mobile-friendly no ranking de busca." } }
        ]
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` },
        { name: 'Quanto Custa um Site Profissional?', url: `${DOMAIN}/blog/quanto-custa-criar-site-profissional` }
      ])
    ]
  },
  {
    file: 'blog/seo-local-vs-seo-nacional.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "SEO Local vs SEO Nacional: qual é o certo para o seu negócio em Criciúma?",
        "description": "Entenda a diferença entre SEO local e nacional e qual estratégia gera mais resultado para negócios em Criciúma.",
        "image": `${DOMAIN}/assets/img/heroseo.png`,
        "url": `${DOMAIN}/blog/seo-local-vs-seo-nacional`,
        "datePublished": "2026-05-02",
        "dateModified": "2026-05-02",
        "author": { "@type": "Person", "name": "Paulo Daniel Blum" },
        "publisher": { "@id": ORG_ID },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${DOMAIN}/blog/seo-local-vs-seo-nacional` }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Quanto tempo leva para ver resultado com SEO Local?", "acceptedAnswer": { "@type": "Answer", "text": "Os primeiros resultados visíveis costumam aparecer entre 60 e 120 dias de trabalho consistente." } },
          { "@type": "Question", "name": "Preciso de um site para fazer SEO Local?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Um site bem estruturado é a base do SEO Local, criando as páginas indexáveis que o Google usa para posicionar sua empresa." } },
          { "@type": "Question", "name": "SEO Local é melhor que tráfego pago?", "acceptedAnswer": { "@type": "Answer", "text": "São complementares. Tráfego pago gera resultado imediato mas exige investimento contínuo. SEO constrói autoridade orgânica duradoura." } }
        ]
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` },
        { name: 'SEO Local vs SEO Nacional', url: `${DOMAIN}/blog/seo-local-vs-seo-nacional` }
      ])
    ]
  },
  {
    file: 'blog/google-ads-ou-meta-ads-negocios-locais.html',
    schemas: [
      { "@context":"https://schema.org","@type":"Organization","@id":ORG_ID },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Google Ads ou Meta Ads: qual plataforma dá mais retorno para negócios locais em SC?",
        "description": "Compare as duas plataformas e descubra qual gera mais resultado para o seu negócio em Santa Catarina.",
        "image": `${DOMAIN}/assets/img/card3.png`,
        "url": `${DOMAIN}/blog/google-ads-ou-meta-ads-negocios-locais`,
        "datePublished": "2026-04-25",
        "dateModified": "2026-04-25",
        "author": { "@type": "Person", "name": "Paulo Daniel Blum" },
        "publisher": { "@id": ORG_ID },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${DOMAIN}/blog/google-ads-ou-meta-ads-negocios-locais` }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Qual o orçamento mínimo para Google Ads?", "acceptedAnswer": { "@type": "Answer", "text": "Para resultados relevantes em Criciúma, recomendamos a partir de R$ 1.000 a R$ 1.500 por mês em verba de mídia, além do custo de gestão." } },
          { "@type": "Question", "name": "Google Ads ou Meta Ads para clínica em Criciúma?", "acceptedAnswer": { "@type": "Answer", "text": "Para clínicas, Google Ads tende a performar melhor pois captura quem já busca ativamente. Meta Ads é eficaz para gerar consciência e promover procedimentos com apelo visual." } },
          { "@type": "Question", "name": "Posso usar as duas plataformas ao mesmo tempo?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, e é a estratégia mais inteligente. Google captura quem quer comprar; Meta cria demanda e retargeting. Juntos cobrem toda a jornada do cliente." } }
        ]
      },
      schemaBreadcrumb([
        { name: 'Início', url: `${DOMAIN}/` },
        { name: 'Blog', url: `${DOMAIN}/blog` },
        { name: 'Google Ads ou Meta Ads?', url: `${DOMAIN}/blog/google-ads-ou-meta-ads-negocios-locais` }
      ])
    ]
  }
];

// ── Run ──────────────────────────────────────────────────────
let updated = 0;
const log = [];

pageConfigs.forEach(cfg => {
  const fp = path.join(dir, cfg.file);
  if (!fs.existsSync(fp)) { log.push(`SKIP: ${cfg.file}`); return; }
  let html = fs.readFileSync(fp, 'utf8');
  html = injectSchemas(html, cfg.schemas);
  fs.writeFileSync(fp, html, 'utf8');
  log.push(`OK (${cfg.schemas.length} schemas): ${cfg.file}`);
  updated++;
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
    log.push(`SKIP alias: ${source}`);
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
  log.push(`SYNC alias: ${target} <- ${source}`);
});

console.log(`\n✅ Schemas inserted — ${updated} pages\n`);
log.forEach(l => console.log(' •', l));
console.log('\nSchemas per page type:');
console.log(' • index.html        → Organization + LocalBusiness + WebSite + FAQPage + 6×Service + BreadcrumbList');
console.log(' • Service pages (6) → Organization ref + Service + BreadcrumbList');
console.log(' • Plan pages (4)    → Organization ref + Product + BreadcrumbList');
console.log(' • Blog index        → Organization ref + Blog + BreadcrumbList');
console.log(' • Blog posts (4)    → Organization ref + Article + FAQPage + BreadcrumbList');
console.log(' • Cases             → Organization ref + CollectionPage + BreadcrumbList');
console.log(' • Sócio Digital     → Organization ref + Service + BreadcrumbList');

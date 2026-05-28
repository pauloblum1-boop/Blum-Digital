# Guia de Imagens — BLUM Digital

Todas as imagens devem ser salvas em `dist/assets/img/` nos formatos indicados.
Prefira **WebP** para melhor performance. Imagens críticas (hero, logo) devem ter versão PNG/JPG de fallback.

---

## Imagens do Site

| Arquivo | Seção | Tamanho recomendado | Formato | Descrição |
|---|---|---|---|---|
| `hero-bg.webp` | Hero | 1920×1080 | WebP | Foto cinematográfica de fundo do hero — equipe em reunião estratégica, escritório moderno ou cidade de Criciúma à noite. Tom escuro, iluminação quente. Será exibida com opacidade 25% sobre fundo #0F172A. |
| `sobre.webp` | Sobre | 800×600 | WebP | Foto da equipe BLUM Digital em ambiente de trabalho, ou imagem do fundador/CEO em postura consultiva. Tom caloroso, profissional. Sem fundo branco genérico. |
| `og-image.webp` | Meta (Open Graph) | 1200×630 | WebP/JPG | Imagem de compartilhamento para redes sociais. Logo BLUM Digital centralizado sobre fundo #0F172A com texto "Agência de Marketing Digital em Criciúma". |
| `logo.png` | Navbar, Footer | 280×76 | PNG (fundo transparente) | Logotipo oficial BLUM Digital. Versão branca/clara pois será exibida sobre fundo escuro com `filter: brightness(0) invert`. |
| `favicon.png` | `<head>` | 512×512 | PNG | Favicon base — ícone/símbolo da marca BLUM Digital. |
| `favicon-32x32.png` | `<head>` | 32×32 | PNG | Favicon para navegadores desktop. |
| `favicon-16x16.png` | `<head>` | 16×16 | PNG | Favicon pequeno para abas compactas. |
| `apple-touch-icon.png` | `<head>` | 180×180 | PNG | Ícone para iOS quando salvo na tela inicial. |

---

## Notas de Produção

- **hero-bg.webp**: A imagem é exibida com `opacity: 25%` sobre o fundo primário `#0F172A`. Escolher fotos com boa textura ou composição, mesmo que o contraste não seja alto, pois o efeito de overlay cria a profundidade visual.
- **sobre.webp**: Será exibida em um card com `border-radius: 22px` e `box-shadow: 2xl`. Evitar imagens com fundo claro que quebrem o glassmorphism.
- **logo.png**: O site usa `filter: brightness(0) invert` para converter a logo para branco. Enviar a versão colorida ou escura da logo — ela será automaticamente invertida.
- **og-image.webp**: Usada apenas em compartilhamentos no WhatsApp, Facebook, Twitter etc. Não aparece visualmente no site.

---

## Imagens Opcionais (para enriquecer o site)

| Arquivo | Seção | Tamanho | Formato | Descrição |
|---|---|---|---|---|
| `depoimento-1.webp` | Depoimentos | 80×80 | WebP | Foto real de cliente (com permissão) para substituir o ícone placeholder. |
| `depoimento-2.webp` | Depoimentos | 80×80 | WebP | Idem. |
| `depoimento-3.webp` | Depoimentos | 80×80 | WebP | Idem. |
| `servico-google.webp` | Serviços | 600×400 | WebP | Imagem ilustrativa do serviço Google Business Profile. |
| `servico-sites.webp` | Serviços | 600×400 | WebP | Mockup de site em desktop/mobile. |
| `servico-ads.webp` | Serviços | 600×400 | WebP | Ilustração de campanhas pagas / gráficos de performance. |
| `servico-tour.webp` | Serviços | 600×400 | WebP | Foto 360° ou ambiente de estabelecimento. |

---

## Estrutura de pastas esperada

```
dist/
  assets/
    img/
      logo.png
      favicon.png
      favicon-32x32.png
      favicon-16x16.png
      apple-touch-icon.png
      hero-bg.webp
      sobre.webp
      og-image.webp
    css/
      style.css
    js/
      main.js
  index.html
```

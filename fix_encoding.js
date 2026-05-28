const fs = require('fs'), path = require('path');
const dist = 'c:/Users/paulo/OneDrive/Pictures/Desktop/Sites Antigravity/Blum-Digital/dist';

function walk(d) {
  let f = [];
  fs.readdirSync(d).forEach(n => {
    const p = path.join(d, n);
    fs.statSync(p).isDirectory() ? f = f.concat(walk(p)) : n.endsWith('.html') && f.push(p);
  });
  return f;
}

const fixes = [
  // Nav items
  ['Servi—os','Serviços'],['servi—os','serviços'],
  ['S—cio','Sócio'],['s—cio','sócio'],['S—CIO','SÓCIO'],
  // á
  ['m—ximo','máximo'],['M—ximo','Máximo'],['M—XIMA','MÁXIMA'],['m—xima','máxima'],['m—x.','máx.'],['M—x.','Máx.'],
  ['a—rea','área'],['a—reas','áreas'],
  ['Tr—fego','Tráfego'],['tr—fego','tráfego'],
  ['vulner—veis','vulneráveis'],
  ['clic—veis','clicáveis'],
  ['priorit—rio','prioritário'],['priorit—ria','prioritária'],
  ['cen—rio','cenário'],['cen—rios','cenários'],
  ['b—sica','básica'],['b—sico','básico'],['b—sicas','básicas'],['b—sicos','básicos'],
  ['Empres—rio','Empresário'],['empres—rio','empresário'],['Empres—rios','Empresários'],['empres—rios','empresários'],
  ['calend—rio','calendário'],['Calend—rio','Calendário'],
  ['autom—tica','automática'],['autom—ticas','automáticas'],['autom—tico','automático'],
  ['prec—ria','precária'],['prec—rio','precário'],
  ['sustent—vel','sustentável'],
  ['import—ncia','importância'],
  ['org—nico','orgânico'],['org—nica','orgânica'],['org—nicos','orgânicos'],['org—nicas','orgânicas'],
  ['simult—neas','simultâneas'],
  ['gr—ficos','gráficos'],['gr—fica','gráfica'],['gr—fico','gráfico'],
  ['fotogr—fica','fotográfica'],
  ['card—pio','cardápio'],
  ['di—ria','diária'],['di—rio','diário'],
  ['necess—rio','necessário'],['necess—ria','necessária'],['necess—rios','necessários'],
  ['crit—rio','critério'],['crit—rios','critérios'],
  ['c—lculo','cálculo'],
  ['escrit—rio','escritório'],
  ['formul—rio','formulário'],['Formul—rio','Formulário'],
  ['Par—grafo','Parágrafo'],
  // é
  ['m—tricas','métricas'],['m—trica','métrica'],
  ['m—todo','método'],['m—todos','métodos'],
  ['gen—rico','genérico'],['gen—rica','genérica'],['gen—ricos','genéricos'],['gen—ricas','genéricas'],
  ['a—reos','aéreos'],['a—reo','aéreo'],['a—reas','áreas'],
  ['m—dio','médio'],['m—dia','média'],
  ['Tr—s','Três'],
  ['Experi—ncia','Experiência'],['experi—ncia','experiência'],
  ['Aus—ncia','Ausência'],['aus—ncia','ausência'],
  ['concorr—ncia','concorrência'],
  ['Transpar—ncia','Transparência'],['transpar—ncia','transparência'],
  ['ag—ncias','agências'],
  ['perman—ncia','permanência'],
  ['recorr—ncia','recorrência'],
  ['frequ—ncia','frequência'],
  ['tend—ncias','tendências'],
  ['intelig—ncia','inteligência'],
  ['refer—ncia','referência'],['Refer—ncia','Referência'],
  ['consist—ncia','consistência'],['Consist—ncia','Consistência'],
  ['transfer—ncia','transferência'],
  ['Diagn—stico','Diagnóstico'],['diagn—stico','diagnóstico'],
  // ó
  ['relat—rio','relatório'],['Relat—rio','Relatório'],['relat—rios','relatórios'],['Relat—rios','Relatórios'],
  ['neg—cio','negócio'],['Neg—cio','Negócio'],['neg—cios','negócios'],['Neg—cios','Negócios'],
  ['territ—rio','território'],
  ['s—lida','sólida'],['s—lido','sólido'],['s—lidas','sólidas'],
  ['poss—vel','possível'],
  ['Estrat—gico','Estratégico'],['estrat—gico','estratégico'],
  ['Estrat—gica','Estratégica'],['estrat—gica','estratégica'],
  ['Estrat—gicos','Estratégicos'],['estrat—gicos','estratégicos'],
  ['Estrat—gia','Estratégia'],['estrat—gia','estratégia'],
  ['Estrat—gico','Estratégico'],
  ['diret—rios','diretórios'],['Diret—rios','Diretórios'],
  ['obrigat—rio','obrigatório'],['Obrigat—rio','Obrigatório'],
  ['obrigat—ria','obrigatória'],['Obrigat—ria','Obrigatória'],
  ['obrigat—rios','obrigatórios'],
  ['peri—dicas','periódicas'],['peri—dico','periódico'],
  ['prop—sito','propósito'],
  ['escrit—rio','escritório'],
  ['PR—XIMO','PRÓXIMO'],['pr—ximo','próximo'],
  ['ap—s','após'],['Ap—s','Após'],
  ['per—odo','período'],['Per—odo','Período'],
  ['Cont—nuo','Contínuo'],['cont—nuo','contínuo'],
  // í
  ['desperd—cio','desperdício'],
  ['med—ocres','medíocres'],
  ['poss—vel','possível'],
  ['dispon—vel','disponível'],['dispon—veis','disponíveis'],
  ['previs—vel','previsível'],
  ['compat—vel','compatível'],
  ['invis—vel','invisível'],
  ['dif—cil','difícil'],
  ['sustent—vel','sustentável'],
  ['s—mbolo','símbolo'],['s—mbolos','símbolos'],
  ['inclu—do','incluído'],['inclu—da','incluída'],['inclu—dos','incluídos'],
  ['n—vel','nível'],['n—veis','níveis'],
  ['n—meros','números'],['N—mero','Número'],
  ['m—ltiplos','múltiplos'],['m—ltiplas','múltiplas'],
  ['L—deres','Líderes'],
  ['v—deos','vídeos'],['V—deo','Vídeo'],
  ['m—nima','mínima'],['m—nimo','mínimo'],['M—nimo','Mínimo'],
  ['f—sico','físico'],['f—sica','física'],['f—sicos','físicos'],
  ['Cl—nica','Clínica'],['cl—nica','clínica'],['cl—nicas','clínicas'],
  ['m—dia','mídia'],['M—dia','Mídia'],
  ['genu—no','genuíno'],
  ['Sa—da','Saída'],
  ['atribu—dos','atribuídos'],
  ['PART—CULAS','PARTÍCULAS'],['part—culas','partículas'],
  ['Subt—tulo','Subtítulo'],
  // ú
  ['d—vida','dúvida'],['D—VIDAS','DÚVIDAS'],['d—vidas','dúvidas'],
  ['m—s','mês'],['M—s','Mês'],
  ['an—ncios','anúncios'],['An—ncios','Anúncios'],['an—ncio','anúncio'],
  ['l—quido','líquido'],
  ['r—pido','rápido'],['r—pida','rápida'],
  ['p—blico','público'],['P—blico','Público'],
  // ã / ão / ões
  ['le—o','leão'],
  ['regi—o','região'],['Regi—o','Região'],
  ['gest—o','gestão'],['Gest—o','Gestão'],
  ['conex—o','conexão'],
  ['ser—o','serão'],
  ['Bot—o','Botão'],
  ['lan—amento','lançamento'],
  ['Reuni—es','Reuniões'],['reuni—o','reunião'],['Reuni—o','Reunião'],
  ['Decis—es','Decisões'],['decis—es','decisões'],
  ['N—o ','Não '],['N—o,','Não,'],['N—o.','Não.'],
  ['n—o ','não '],['n—o,','não,'],['n—o.','não.'],
  ['S—bado','Sábado'],
  // ê
  ['t—m','têm'],
  ['p—gina','página'],['P—gina','Página'],['p—ginas','páginas'],['P—ginas','Páginas'],
  // ç
  ['lideran—a','liderança'],['Lideran—a','Liderança'],
  ['amea—a','ameaça'],
  ['alcan—ar','alcançar'],['alcan—a','alcança'],['alcan—ados','alcançados'],
  ['avan—ada','avançada'],['avan—ado','avançado'],
  ['confian—a','confiança'],['Confian—a','Confiança'],
  ['cobran—a','cobrança'],
  ['or—amento','orçamento'],['Or—amento','Orçamento'],
  ['apare—a','apareça'],
  ['Endere—o','Endereço'],['endere—o','endereço'],
  ['come—o','começo'],['Come—o','Começo'],
  ['come—a','começa'],['come—amos','começamos'],
  ['servi—o','serviço'],['Servi—o','Serviço'],
  ['Cabe—alho','Cabeçalho'],
  ['diferen—a','diferença'],
  ['presen—a','presença'],['Presen—a','Presença'],
  ['Solu—','Soluç'],['solu—','soluç'],
  ['Avalia—','Avaliaç'],['avalia—','avaliaç'],
  ['Publica—','Publicaç'],['publica—','publicaç'],
  ['Otimiza—','Otimizaç'],['otimiza—','otimizaç'],
  ['Constru—','Construç'],['constru—','construç'],
  ['Aten—','Atenç'],['aten—','atenç'],
  ['Informa—','Informaç'],['informa—','informaç'],
  ['Opera—','Operaç'],['opera—','operaç'],
  ['Gera—','Geraç'],['gera—','geraç'],
  ['Comunica—','Comunicaç'],['comunica—','comunicaç'],
  ['Localiza—','Localizaç'],['localiza—','localizaç'],
  ['Automa—','Automaç'],['automa—','automaç'],
  ['Posi—ionamento','Posicionamento'],['posi—ionamento','posicionamento'],
  ['Cria—o','Criação'],['cria—o','criação'],
  ['Conclus—o','Conclusão'],['conclus—o','conclusão'],
  ['aplica—o','aplicação'],['Aplica—o','Aplicação'],
  ['programa—o','programação'],
  ['implementa—o','implementação'],
  ['—ões','ções'],['—ção','ção'],
  // Other common endings
  ['In—cio','Início'],['in—cio','início'],
  ['tamb—m','também'],['Tamb—m','Também'],
  ['voc—','você'],['Voc—','Você'],
  ['al—m','além'],['Al—m','Além'],
  ['T—cnico','Técnico'],['t—cnico','técnico'],
  ['T—cnica','Técnica'],['t—cnica','técnica'],
  ['T—cnicos','Técnicos'],['t—cnicos','técnicos'],
  ['S—bado','Sábado'],
  ['Seg—Sex','Seg–Sex'],
  ['Crici—ma','Criciúma'],
  ['constr—i','constrói'],
  ['comp—e','compõe'],
  ['an—lise','análise'],['An—lise','Análise'],
];

let ok = 0;
walk(dist).forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  let u = c;
  fixes.forEach(([bad, good]) => { u = u.split(bad).join(good); });
  if (u !== c) { fs.writeFileSync(file, u, 'utf8'); ok++; }
});
console.log('Corrigido em', ok, 'arquivos');

// Final check
const remaining = [];
walk(dist).forEach(file => {
  const c = fs.readFileSync(file, 'utf8');
  const m = c.match(/[a-zA-ZÀ-ɏ]—[a-zA-ZÀ-ɏ]/g);
  if (m) remaining.push(path.basename(file) + ': ' + [...new Set(m)].slice(0,5).join(', '));
});
if (remaining.length) {
  console.log('\nAinda com problemas:');
  remaining.forEach(r => console.log(' ', r));
} else {
  console.log('Zero caracteres quebrados restantes!');
}

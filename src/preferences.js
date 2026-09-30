// Language controls for the public V7 portfolio.
(() => {
  const root = document.documentElement;
  const read = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* Private browsing may block storage. */ }
  };
  const translations = new Map(Object.entries({
    'Saltar al contenido': 'Skip to content', 'Preferencias': 'Preferences',
    'Versión': 'Version', 'Seleccionar versión': 'Select version',
    'Idioma': 'Language', 'Cambiar a inglés': 'Switch to English', 'Cambiar a español': 'Switch to Spanish',
    'Tema': 'Theme', 'Tema claro': 'Light theme', 'Tema oscuro': 'Dark theme',
    'Activar movimiento 3D': 'Enable 3D motion', 'Desactivar movimiento 3D': 'Disable 3D motion',
    'Seleccionar carta': 'Select a card', 'FUT · Legendaria': 'FUT · Legendary',
    'Desliza para cambiar de carta': 'Swipe to change cards', 'Contacto': 'Contact',
    'Póker · Cuatro reyes': 'Poker · Four kings', 'Carta de Héctor Moreno Cervera': 'Héctor Moreno Cervera card',
    'Carta de perfil de Héctor Moreno Cervera · ': 'Héctor Moreno Cervera profile card · ',
    'España': 'Spain', 'Team Lead · Frontend · IA': 'Team Lead · Frontend · AI',
    '¿Qué hace este Joker?': 'What does this Joker do?', 'El programador': 'The Programmer',
    'Cada proyecto completado otorga': 'Each completed project grants',
    'En equipo, obtiene': 'In a team, gain', 'Mult por cada carta jugada': 'Mult for each card played',
    'Legendaria': 'Legendary', 'Mult por cada proyecto en juego': 'Mult for each project in play',
    'No se han recibido datos del sensor. Puedes seguir girando la carta al tocarla.': 'No sensor data was received. You can still tilt the card by touching it.',
    'No se ha concedido acceso al sensor. Puedes seguir girando la carta al tocarla.': 'Sensor access was denied. You can still tilt the card by touching it.',
    'Automatización': 'Automation', 'Experiencia': 'Experience', 'Visualización': 'Visualization',
    'Invitaciones': 'Invitations', 'Fotos': 'Photos', 'Turnos': 'Shifts',
    'Línea temporal': 'Timeline', 'Calendario': 'Calendar', 'Anomalías': 'Anomalies',
    'Órbitas': 'Orbits', 'Hípica': 'Equestrian', 'Marketing': 'Marketing',
    'Tickets': 'Receipts', 'Gasto': 'Spending', 'Precios': 'Prices',
    'Edición personal': 'Personal edition', 'EDICIÓN PERSONAL': 'PERSONAL EDITION',
    'HMC · 001 / 007 · EDICIÓN PERSONAL': 'HMC · 001 / 007 · PERSONAL EDITION',
    'HMC · EDICIÓN PERSONAL': 'HMC · PERSONAL EDITION',
    '2027 · EDICIÓN PERSONAL': '2027 · PERSONAL EDITION',
    'Coste: un maná blanco, uno azul, uno rojo y uno verde': 'Cost: one white, one blue, one red and one green mana',
    'Llanura': 'Plains', 'Isla': 'Island', 'Montaña': 'Mountain', 'Bosque': 'Forest',
    'Planeswalker Legendario — Developer ': 'Legendary Planeswalker — Developer ',
    'Crea una ficha de idea. Tus aliados obtienen +1/+1 hasta el final del turno.': 'Create an Idea token. Your allies get +1/+1 until end of turn.',
    'Convierte una idea en un proyecto y roba una carta.': 'Turn an idea into a project and draw a card.',
    'Obtienes un emblema con «Al principio del turno, roba una carta por cada idea que controles».': 'You get an emblem with “At the beginning of your turn, draw a card for each idea you control.”',
    'BÁSICO': 'BASIC', 'PS': 'HP', 'Eléctrico': 'Electric',
    'Pokémon Creador · Tipo Eléctrico': 'Creator Pokémon · Electric type',
    'Habilidad': 'Ability', 'Espíritu de equipo': 'Team Spirit',
    'Potencia el talento de todos los compañeros de tu Banca.': 'Boost the talent of everyone on your Bench.',
    'Potencia el talento de todos los compañeros de tu equipo.': 'Boost the talent of everyone on your team.',
    'Dos energías eléctricas': 'Two Electric Energy', 'Chispa creativa': 'Creative Spark',
    'Convierte una idea en una interfaz lista para brillar.': 'Turn an idea into an interface ready to shine.',
    'debilidad ': 'weakness ', 'retirada ': 'retreat ', 'Dragón': 'Dragon', 'Incolora': 'Colorless',
    'regla ex': 'ex rule', 'Si tu Pokémon ex queda Fuera de Combate, tu rival obtiene 2 puntos.': 'If your Pokémon ex is Knocked Out, your opponent takes 2 points.',
    'Coste de maná: 6': 'Mana cost: 6', 'Ataque: 6': 'Attack: 6', 'Salud: 6': 'Health: 6',
    'Grito de batalla:': 'Battlecry:', ' inspira a tu equipo y otorga +2/+2 a los compañeros adyacentes.': ' inspire your team and give adjacent teammates +2/+2.',
    'Siempre hay una forma': 'There is always a way', 'de hacerlo mejor.': 'to make it better.',
    'HUMANO · CREADOR': 'HUMAN · CREATOR', 'Retrato del rey de corazones': 'Portrait of the king of hearts',
    'Mano de póker · cuatro reyes de tréboles, picas, diamantes y corazones; corazones delante': 'Poker hand · four kings of clubs, spades, diamonds and hearts; hearts in front',
    'Rey de tréboles': 'King of clubs', 'Rey de picas': 'King of spades',
    'Rey de diamantes': 'King of diamonds', 'Rey de corazones': 'King of hearts',
    'escribeme en mis redes sociales y charlamos': 'Message me on social media and let’s chat',
    'si lees esto, me gustas. A no ser que te lo haya chivado una IA, eso resta puntos': 'If you’re reading this, I like you. Unless an AI gave it away, that costs you points',
    'no deberías de estar viendo esto': 'You shouldn’t be seeing this',
    'REY DE CÓDIGO': 'KING OF CODE', 'Retrato de Héctor pixelado': 'Pixelated portrait of Héctor',
    'HÉCTOR, ARQUITECTO DIGITAL': 'HÉCTOR, DIGITAL ARCHITECT', 'Atributo: luz': 'Attribute: light',
    'LUZ': 'LIGHT', 'Nivel 7': 'Level 7', '1.ª EDICIÓN': '1ST EDITION',
    'HMC-ES001 · 1.ª EDICIÓN': 'HMC-EN001 · 1ST EDITION',
    '[GUERRERO / EFECTO]': '[WARRIOR / EFFECT]',
    'Si controlas un equipo, puedes Invocar esta carta de Modo Especial. Una vez por turno: convierte una idea en un proyecto; todos tus aliados ganan 500 ATK.': 'If you control a team, you can Special Summon this card. Once per turn: turn an idea into a project; all your allies gain 500 ATK.',
    'Portfolio personal de Héctor Moreno Cervera.': 'Personal portfolio of Héctor Moreno Cervera.'
  }));
  const reverse = new Map([...translations].map(([es, en]) => [en, es]));
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const createReplacer = entries => {
    const lookup = new Map(entries);
    const pattern = new RegExp([...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(key => key === 'Contact' ? '\\bContact\\b' : escapePattern(key))
      .join('|'), 'g');
    return value => value.replace(pattern, match => lookup.get(match));
  };
  const replaceSpanish = createReplacer(reverse);
  const replaceEnglish = createReplacer(translations);
  const replace = (value, language) => {
    return language === 'en' ? replaceEnglish(value) : replaceSpanish(value);
  };
  function translateTree(container, language) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('#animatedName, #animatedSubtitle, .project-list')) continue;
      const previous = originalText.get(node);
      const source = previous && node.nodeValue === previous.rendered ? previous.source : node.nodeValue;
      const value = replace(source, language);
      originalText.set(node, { source, rendered: value });
      if (value !== node.nodeValue) node.nodeValue = value;
    }
    for (const element of [container, ...container.querySelectorAll('[aria-label], [title], [content]')]) {
      let attributes = originalAttributes.get(element);
      if (!attributes) {
        attributes = new Map();
        originalAttributes.set(element, attributes);
      }
      for (const attr of ['aria-label', 'title', 'content']) {
        if (!element.hasAttribute?.(attr)) continue;
        const current = element.getAttribute(attr);
        const previous = attributes.get(attr);
        const source = previous && current === previous.rendered ? previous.source : current;
        const value = replace(source, language);
        attributes.set(attr, { source, rendered: value });
        if (value !== current) element.setAttribute(attr, value);
      }
    }
  }
  let language = 'es';
  window.portfolioTranslate = value => replace(value, language);
  function setLanguage(next) {
    language = next;
    root.lang = language;
    save('portfolio-language', language);
    translateTree(document.body, language);
    translateTree(document.head, language);
    document.querySelectorAll('.language-switcher button').forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.dispatchEvent(new CustomEvent('portfolio-language-change', { detail: { language } }));
  }
  function setTheme(theme) {
    root.dataset.theme = theme;
    save('portfolio-theme', theme);
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f5f4ed' : '#050506';
    document.querySelectorAll('.theme-switcher button[data-theme]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
  }
  document.querySelectorAll('.language-switcher button').forEach((button, index) => {
    button.dataset.language = index === 0 ? 'en' : 'es';
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  document.querySelectorAll('.theme-switcher button:not(.motion-toggle)').forEach((button, index) => {
    button.dataset.theme = index === 0 ? 'light' : 'dark';
    button.addEventListener('click', () => setTheme(button.dataset.theme));
  });
  document.addEventListener('cardformatchange', () => {
    translateTree(document.querySelector('#profileCard'), language);
    const status = document.querySelector('#formatStatus');
    if (status) translateTree(status, language);
  });
  document.addEventListener('cardpreviewchange', event => translateTree(event.detail.card, language));
  if (document.querySelector('.theme-switcher')) setTheme(read('portfolio-theme', 'dark') === 'light' ? 'light' : 'dark');
  setLanguage(read('portfolio-language', 'es') === 'en' ? 'en' : 'es');
})();

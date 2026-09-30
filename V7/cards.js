// V7 collection: six formats, presented as a single, non-flippable profile card.
(() => {
  const card = document.querySelector('#profileCard');
  const selector = document.querySelector('#cardSelector');
  const buttons = [...selector.querySelectorAll('button[data-format]')];
  const indicator = selector.querySelector('.card-selector-indicator');
  const stage = document.querySelector('.card-stage');
  const transition = card.closest('.card-transition');
  const front = card.querySelector('.card-front');
  const currentYear = new Date().getFullYear();
  const cardNumber = String(currentYear - 1994).padStart(3, '0');
  const fut = front.innerHTML.replace(/<(span|b) data-year-base="(\d+)">[^<]*<\/\1>/g, (_, tag, base) => {
    const value = String(currentYear - Number(base));
    return `<${tag} data-year-base="${base}">${value}</${tag}>`;
  });
  front.innerHTML = fut;
  const pokemonPortrait = '<span class="tcg-art"><img src="../assets/profile-v7.webp" alt="Héctor Moreno Cervera" decoding="async" /></span>';
  const mtgPortrait = '<span class="tcg-art"><img src="../assets/profile-v7.webp" alt="Héctor Moreno Cervera" decoding="async" /></span>';
  const formats = {
    fut: { name: 'FUT · Legendaria', markup: fut },
    mtg: {
      name: 'Magic: The Gathering',
      markup: `<span class="planeswalker-frame">
        <span class="planeswalker-heading"><b>Héctor, Team Lead</b><span class="mana" role="img" aria-label="Coste: un maná blanco, uno azul, uno rojo y uno verde"><img src="../AI inspiration/W.svg" alt="" title="Llanura" /><img src="../AI inspiration/U.svg" alt="" title="Isla" /><img src="../AI inspiration/R.svg" alt="" title="Montaña" /><img src="../AI inspiration/G.svg" alt="" title="Bosque" /></span></span>
        ${mtgPortrait}
        <span class="planeswalker-type">Planeswalker Legendario — Developer <span>◆</span></span>
        <span class="planeswalker-abilities"><span><b><span>+1</span></b><span>Crea una ficha de idea. Tus aliados obtienen +1/+1 hasta el final del turno.</span></span><span><b><span>−2</span></b><span>Convierte una idea en un proyecto y roba una carta.</span></span><span><b><span>−7</span></b><span>Obtienes un emblema con «Al principio del turno, roba una carta por cada idea que controles».</span></span></span>
        <span class="planeswalker-footer"><span>HMC · ${cardNumber} / 099 · EDICIÓN PERSONAL</span><b><span>5</span></b></span>
      </span>`
    },
    pokemon: {
      name: 'Pokémon',
      markup: `<span class="tcg-frame pokemon-frame">
        <span class="tcg-heading"><span class="pokemon-name"><small>BÁSICO</small><b>Hecmocer <em class="pokemon-ex">EX</em></b></span><span class="pokemon-hp"><span class="pokemon-hp-label">PS</span><b>180</b><img src="../assets/pkm-electric.png" alt="Eléctrico" /></span></span>
        ${pokemonPortrait}
        <span class="tcg-type">N.º ${cardNumber} · Pokémon Creador · Tipo Eléctrico</span>
        <span class="tcg-rules"><span class="pokemon-ability"><span class="pokemon-ability-title"><span class="ability-label">Habilidad</span><b>Espíritu de equipo</b></span><span>Potencia el talento de todos los compañeros de tu equipo.</span></span><span class="pokemon-attack"><span class="pokemon-energy" role="img" aria-label="Dos energías eléctricas"><img src="../assets/pkm-electric.png" alt="" /><img src="../assets/pkm-electric.png" alt="" /></span><b>Chispa creativa</b><strong>120</strong></span></span>
        <span class="pokemon-traits"><span>debilidad <img class="pokemon-energy-icon" src="../assets/pkm-dragon.png" alt="Dragón" /> ×2</span><span>retirada <img class="pokemon-energy-icon pokemon-neutral" src="../assets/pkm-normal.webp" alt="Incolora" /></span></span>
        <span class="pokemon-ex-rule"><b>regla ex</b><span>Si tu Pokémon ex queda Fuera de Combate, tu rival obtiene 2 puntos.</span></span>
        <span class="tcg-footer"><span>HMC · EDICIÓN PERSONAL</span><b>${cardNumber} / 099 ✦</b></span>
      </span>`
    },
    hearthstone: {
      name: 'Hearthstone',
      markup: `<span class="hs-frame"><img class="hs-overlay" src="../AI inspiration/hearthstone-card-2.png" alt="" decoding="async" />
        <span class="hs-mana" aria-label="Coste de maná: 6">6</span>
        <span class="hs-portrait"><img src="../assets/profile-v7.webp" alt="Héctor Moreno Cervera" decoding="async" /></span>
        <svg class="hs-name" viewBox="0 0 320 449" aria-label="Héctor, Team Lead" role="img">
          <defs><path id="hs-name-curve" d="M 48,268 C 116,257 195,240 263,257" /></defs>
          <text><textPath href="#hs-name-curve" startOffset="50%" text-anchor="middle">Héctor, Team Lead</textPath></text>
        </svg>
        <span class="hs-gem" aria-label="Legendaria">◆</span>
        <span class="hs-rules"><b>Grito de batalla:</b> inspira a tu equipo y otorga +2/+2 a los compañeros adyacentes.</span>
        <span class="hs-tribe">HUMANO · CREADOR</span>
        <span class="hs-attack" aria-label="Ataque: 6">6</span><span class="hs-health" aria-label="Salud: 6">6</span>
        <span class="hs-edition">HMC · EDICIÓN PERSONAL</span>
      </span>`
    },
    poker: {
      name: 'Póker · Rey de picas',
      markup: `<span class="poker-frame">
        <span class="poker-index"><b>K</b><span>♠</span></span>
        <span class="poker-index poker-index-bottom" aria-hidden="true"><b>K</b><span>♠</span></span>
        <span class="poker-court">
          <span class="poker-half"><span class="poker-crown" aria-hidden="true">♛</span><img src="../assets/profile-v7.webp" alt="Retrato del rey de picas" decoding="async" /><span class="poker-suit" aria-hidden="true">♠</span></span>
          <span class="poker-half poker-reflection" aria-hidden="true"><span class="poker-crown">♛</span><img src="../assets/profile-v7.webp" alt="" decoding="async" /><span class="poker-suit">♠</span></span>
          <span class="poker-ribbon">REY DE CÓDIGO</span>
        </span>
      </span>`
    },
    balatro: {
      name: 'Balatro · Joker',
      markup: `<span class="balatro-frame">
        <span class="joker-word joker-left" aria-hidden="true">JOKER</span>
        <span class="balatro-photo"><img src="../assets/profile-v7.webp" alt="Retrato de Héctor pixelado" decoding="async" hidden /><canvas width="78" height="102" aria-hidden="true"></canvas></span>
        <span class="joker-word joker-right" aria-hidden="true">JOKER</span>
      </span>`
    }
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 580px)');
  const status = document.querySelector('#formatStatus');
  const swipeHint = document.querySelector('#swipeHint');
  let selectedIndex = 0;
  let hintTimer;
  let formatChanged = false;
  let exitTimer;
  let previewCard;
  let settling = false;
  let pendingIndex = null;
  let cardDrag;
  let selectorDrag;
  let suppressClick = false;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let highlightFrame = 0;
  let highlightUntil = 0;
  let buttonGeometry;
  let stageWidth;

  function syncSelectorText() {
    const highlight = indicator.getBoundingClientRect();
    buttons.forEach(button => {
      const bounds = button.getBoundingClientRect();
      const start = clamp(highlight.left - bounds.left, 0, bounds.width);
      const end = clamp(highlight.right - bounds.left, 0, bounds.width);
      button.style.backgroundImage = `linear-gradient(to right, #fff ${start}px, #162018 ${start}px ${end}px, #fff ${end}px)`;
      button.style.backgroundClip = 'text';
      button.style.webkitBackgroundClip = 'text';
      button.style.color = 'transparent';
    });
  }

  function trackSelectorText(time) {
    syncSelectorText();
    highlightFrame = time < highlightUntil ? window.requestAnimationFrame(trackSelectorText) : 0;
  }

  function scheduleSelectorText() {
    if (mobileLayout.matches || !window.requestAnimationFrame) return;
    highlightUntil = performance.now() + 550;
    if (!highlightFrame) highlightFrame = window.requestAnimationFrame(trackSelectorText);
  }

  function scheduleHint() {
    window.clearTimeout(hintTimer);
    if (formatChanged || document.hidden || !swipeHint) return;
    hintTimer = window.setTimeout(() => { swipeHint.setAttribute('aria-hidden', 'false'); }, 12000);
  }

  function hideHint(changed = false) {
    window.clearTimeout(hintTimer);
    if (swipeHint) swipeHint.setAttribute('aria-hidden', 'true');
    if (changed) formatChanged = true;
  }

  function moveIndicator(position) {
    buttonGeometry ??= buttons.map(button => ({ left: button.offsetLeft, width: button.offsetWidth }));
    const lower = Math.floor(clamp(position, 0, buttons.length - 1));
    const upper = Math.ceil(clamp(position, 0, buttons.length - 1));
    const progress = clamp(position - lower, 0, 1);
    const left = buttonGeometry[lower].left + (buttonGeometry[upper].left - buttonGeometry[lower].left) * progress;
    const width = buttonGeometry[lower].width + (buttonGeometry[upper].width - buttonGeometry[lower].width) * progress;
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
    scheduleSelectorText();
  }

  function setSelected(index) {
    if (index !== selectedIndex) hideHint(true);
    selectedIndex = index;
    buttons.forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(buttonIndex === index)));
    moveIndicator(index);
  }

  function updateCard(value) {
    card.dataset.format = value;
    front.innerHTML = formats[value].markup;
    card.setAttribute('aria-label', value === 'poker' ? 'Carta de póker · Rey de picas' : `Carta de perfil de Héctor Moreno Cervera · ${formats[value].name}`);
    if (status) status.textContent = `${formats[value].name} · Edición personal`;
    document.dispatchEvent(new Event('cardformatchange'));
  }

  function finishTransition() {
    window.clearTimeout(exitTimer);
    const wasTransitioning = Boolean(previewCard || settling);
    if (pendingIndex !== null && card.dataset.format !== buttons[pendingIndex].dataset.format) {
      updateCard(buttons[pendingIndex].dataset.format);
    }
    previewCard?.remove();
    previewCard = null;
    settling = false;
    pendingIndex = null;
    card.classList.remove('is-changing-format');
    transition.classList.remove('is-dragging', 'is-settling');
    card.removeAttribute('aria-busy');
    transition.style.setProperty('--drag-x', '0px');
    transition.style.removeProperty('--preview-offset');
    card.style.opacity = '';
    if (wasTransitioning) document.dispatchEvent(new Event('cardtransitionend'));
  }

  function slideDistance() {
    return stageWidth ??= (stage.clientWidth || card.offsetWidth || 320);
  }

  function showPreview(index, direction) {
    window.cardAssetPreload?.(buttons[index].dataset.format);
    previewCard?.remove();
    previewCard = card.cloneNode(true);
    previewCard.removeAttribute('id');
    previewCard.removeAttribute('role');
    previewCard.removeAttribute('aria-label');
    previewCard.setAttribute('aria-hidden', 'true');
    previewCard.setAttribute('inert', '');
    previewCard.classList.add('swipe-preview');
    // cloneNode copies the live 3D tilt; an inline transform would override
    // the CSS translateX that keeps the incoming card beside the current one.
    previewCard.style.removeProperty('transform');
    const value = buttons[index].dataset.format;
    previewCard.dataset.format = value;
    previewCard.querySelector('.card-front').innerHTML = formats[value].markup;
    previewCard.style.opacity = '0';
    transition.style.setProperty('--preview-offset', `${direction * slideDistance()}px`);
    transition.appendChild(previewCard);
    document.dispatchEvent(new CustomEvent('cardpreviewchange', { detail: { card: previewCard } }));
  }

  function settle(index, destination) {
    if (reducedMotion.matches) {
      if (index !== selectedIndex) {
        setSelected(index);
        updateCard(buttons[index].dataset.format);
      } else moveIndicator(selectedIndex);
      finishTransition();
      return;
    }
    const committed = index !== selectedIndex;
    if (committed) {
      setSelected(index);
    }
    settling = true;
    pendingIndex = index;
    // Paint both cards in their starting positions before enabling transitions.
    void transition.offsetWidth;
    transition.classList.remove('is-dragging');
    transition.classList.add('is-settling');
    transition.style.setProperty('--drag-x', `${destination}px`);
    card.style.opacity = committed ? '0' : '1';
    if (previewCard) previewCard.style.opacity = committed ? '1' : '0';
    moveIndicator(selectedIndex);
    if (committed) card.setAttribute('aria-busy', 'true');
    exitTimer = window.setTimeout(() => {
      finishTransition();
    }, 320);
  }

  function selectFormat(index, animate = true) {
    index = clamp(index, 0, buttons.length - 1);
    const value = buttons[index].dataset.format;
    const previousIndex = selectedIndex;
    cardDrag = null;
    stage.classList.remove('is-card-dragging');
    selector.classList.remove('is-dragging');
    finishTransition();
    if (!animate || reducedMotion.matches || previousIndex === index) {
      setSelected(index);
      updateCard(value);
      return;
    }
    const direction = Math.sign(index - previousIndex);
    showPreview(index, direction);
    // Let the browser paint the adjacent card at its starting position first.
    transition.classList.add('is-dragging');
    void transition.offsetWidth;
    settle(index, -direction * slideDistance());
  }

  buttons.forEach((button, index) => {
    button.addEventListener('pointerenter', () => window.cardAssetPreload?.(button.dataset.format));
    button.addEventListener('focus', () => window.cardAssetPreload?.(button.dataset.format));
    button.addEventListener('click', () => selectFormat(index));
  });
  stage.addEventListener('dragstart', event => event.preventDefault());
  selector.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);
  selector.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = clamp(selectedIndex + (event.key === 'ArrowRight' ? 1 : -1), 0, buttons.length - 1);
    buttons[next].focus();
    selectFormat(next);
  });

  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || cardDrag || settling) return;
    cardDrag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, delta: 0, direction: 0, active: false };
  });
  stage.addEventListener('pointermove', event => {
    if (!cardDrag || event.pointerId !== cardDrag.id) return;
    cardDrag.delta = event.clientX - cardDrag.startX;
    if (!cardDrag.active) {
      if (Math.abs((event.clientY ?? cardDrag.startY) - cardDrag.startY) > Math.abs(cardDrag.delta) && Math.abs((event.clientY ?? cardDrag.startY) - cardDrag.startY) > 10) { cardDrag = null; return; }
      if (Math.abs(cardDrag.delta) < 8) return;
      cardDrag.active = true;
      hideHint();
      stage.setPointerCapture(event.pointerId);
      stage.classList.add('is-card-dragging');
      transition.classList.add('is-dragging');
      selector.classList.add('is-dragging');
    }
    event.preventDefault?.();
    const direction = Math.sign(cardDrag.delta);
    const next = selectedIndex - direction;
    if (direction !== cardDrag.direction) {
      cardDrag.direction = direction;
      if (next >= 0 && next < buttons.length) showPreview(next, -direction);
      else { previewCard?.remove(); previewCard = null; }
    }
    const distance = previewCard
      ? clamp(cardDrag.delta, -slideDistance(), slideDistance())
      : clamp(cardDrag.delta, -72, 72);
    transition.style.setProperty('--drag-x', `${distance}px`);
    const progress = previewCard ? Math.abs(distance) / slideDistance() : 0;
    card.style.opacity = String(1 - progress);
    if (previewCard) previewCard.style.opacity = String(progress);
    moveIndicator(clamp(selectedIndex - distance / slideDistance(), selectedIndex - 1, selectedIndex + 1));
  });
  function endCardDrag(event, cancelled = false) {
    if (!cardDrag || event.pointerId !== cardDrag.id) return;
    const { delta, active, direction } = cardDrag;
    cardDrag = null;
    stage.classList.remove('is-card-dragging');
    selector.classList.remove('is-dragging');
    if (!active) return;
    const next = selectedIndex - direction;
    const commit = !cancelled && Math.abs(delta) >= 48 && previewCard && next >= 0 && next < buttons.length;
    settle(commit ? next : selectedIndex, commit ? Math.sign(delta) * slideDistance() : 0);
    if (!commit) scheduleHint();
  }
  stage.addEventListener('pointerup', event => endCardDrag(event));
  stage.addEventListener('pointercancel', event => endCardDrag(event, true));

  selector.addEventListener('pointerdown', event => {
    if (event.button !== 0 || selectorDrag) return;
    const centers = buttons.map(button => {
      const bounds = button.getBoundingClientRect();
      return bounds.left + bounds.width / 2;
    });
    selectorDrag = { id: event.pointerId, startX: event.clientX, moved: false, position: selectedIndex, centers };
  });
  selector.addEventListener('pointermove', event => {
    if (!selectorDrag || event.pointerId !== selectorDrag.id) return;
    if (!selectorDrag.moved && Math.abs(event.clientX - selectorDrag.startX) > 5) {
      selectorDrag.moved = true;
      selector.setPointerCapture(event.pointerId);
    }
    if (!selectorDrag.moved) return;
    selector.classList.add('is-dragging');
    const centers = selectorDrag.centers;
    const x = event.clientX;
    let position = 0;
    while (position < centers.length - 2 && x > centers[position + 1]) position++;
    selectorDrag.position = clamp(position + (x - centers[position]) / (centers[position + 1] - centers[position]), 0, buttons.length - 1);
    moveIndicator(selectorDrag.position);
  });
  function endSelectorDrag(event, cancelled = false) {
    if (!selectorDrag || event.pointerId !== selectorDrag.id) return;
    const { moved, position } = selectorDrag;
    selectorDrag = null;
    selector.classList.remove('is-dragging');
    if (cancelled || !moved) { moveIndicator(selectedIndex); return; }
    suppressClick = true;
    selectFormat(Math.round(position));
  }
  selector.addEventListener('pointerup', event => endSelectorDrag(event));
  selector.addEventListener('pointercancel', event => endSelectorDrag(event, true));
  window.addEventListener('resize', () => {
    buttonGeometry = undefined;
    stageWidth = undefined;
    moveIndicator(selectedIndex);
  });
  mobileLayout.addEventListener('change', () => {
    if (mobileLayout.matches) {
      if (highlightFrame) window.cancelAnimationFrame(highlightFrame);
      highlightFrame = 0;
      buttons.forEach(button => {
        button.style.backgroundImage = '';
        button.style.backgroundClip = '';
        button.style.webkitBackgroundClip = '';
        button.style.color = '';
      });
    } else scheduleSelectorText();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hideHint();
    else scheduleHint();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      const index = pendingIndex ?? selectedIndex;
      cardDrag = null;
      stage.classList.remove('is-card-dragging');
      selector.classList.remove('is-dragging');
      finishTransition();
      setSelected(index);
      updateCard(buttons[index].dataset.format);
    }
  });
  selectFormat(0, false);
  scheduleHint();
})();

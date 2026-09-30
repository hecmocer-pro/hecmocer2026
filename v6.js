// Keep the accessible heading stable while the visual name is edited.
(() => {
  const before = document.querySelector('#nameBefore');
  const accent = document.querySelector('#nameAccent');
  const after = document.querySelector('#nameAfter');
  const cursor = document.querySelector('#nameCursor');
  const subtitle = document.querySelector('#animatedSubtitle');
  const roles = [...subtitle.querySelectorAll('.subtitle-role')];
  const separators = [...subtitle.querySelectorAll('.subtitle-separator')];
  const intro = document.querySelector('.hero-v5 .intro');
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactDevice = window.matchMedia('(max-width: 580px)');
  const fullName = 'Héctor Moreno Cervera';
  const shortName = 'Hecmocer';
  const frames = [];
  let value = fullName;
  let caret = value.length;
  let frameIndex = 0;
  let phase = 'waiting';
  let timer;
  let introFinished = false;

  function frame(delay) { frames.push({ value, caret, delay }); }
  function backspace(count = 1) {
    for (let i = 0; i < count; i++) {
      value = value.slice(0, caret - 1) + value.slice(caret);
      caret--;
      frame(110);
    }
  }
  function type(characters) {
    for (const character of characters) {
      value = value.slice(0, caret) + character + value.slice(caret);
      caret++;
      frame(character === ' ' ? 160 : 115);
    }
  }
  function transition(target) {
    backspace(value.length - 1); // Keep the H visible.
    type(target.slice(1));
    frames[frames.length - 1].end = true;
  }
  transition(shortName);
  transition(fullName);

  function render(text, position) {
    const prefixLength = text.startsWith('Hé') ? 7 : Math.min(3, text.length);
    before.textContent = text.slice(0, Math.min(prefixLength, position));
    accent.textContent = text.slice(prefixLength, position);
    after.textContent = text.slice(position);
  }
  function finishIntro() {
    if (introFinished) return;
    introFinished = true;
    roles.forEach(role => role.classList.add('is-visible'));
    separators.forEach(separator => separator.classList.add('is-visible'));
    root.classList.add('intro-subtitle-started', 'intro-link-visible', 'intro-card-visible');
    root.classList.add('intro-complete');
    frameIndex = 0;
    phase = 'waiting';
    cursor.classList.remove('is-visible');
    render(fullName, fullName.length);
    if (!preference.matches && !compactDevice.matches && !window.navigator?.connection?.saveData && !document.hidden) timer = window.setTimeout(tick, 4500);
  }
  function typeIntro(index = 0) {
    if (preference.matches || document.hidden) { finishIntro(); return; }
    render(fullName.slice(0, index), index);
    cursor.classList.add('is-visible');
    if (index < fullName.length) timer = window.setTimeout(() => typeIntro(index + 1), index === 0 ? 180 : 75);
    else {
      cursor.classList.remove('is-visible');
      root.classList.add('intro-subtitle-started');
      timer = window.setTimeout(() => revealRole(), 250);
    }
  }
  function revealRole(index = 0) {
    if (preference.matches || document.hidden) { finishIntro(); return; }
    if (index > 0) separators[index - 1].classList.add('is-visible');
    roles[index].classList.add('is-visible');
    if (index < roles.length - 1) {
      timer = window.setTimeout(() => revealRole(index + 1), 540);
    } else {
      timer = window.setTimeout(() => {
        root.classList.add('intro-link-visible');
        timer = window.setTimeout(() => {
          root.classList.add('intro-card-visible');
          timer = window.setTimeout(finishIntro, 700);
        }, 1000);
      }, 540);
    }
  }
  function tick() {
    if (document.hidden || preference.matches || compactDevice.matches || window.navigator?.connection?.saveData) return;
    if (phase === 'waiting') {
      cursor.classList.add('is-visible');
      phase = 'ready';
      timer = window.setTimeout(tick, 2000);
      return;
    }
    if (phase === 'settling') {
      cursor.classList.remove('is-editing', 'is-visible');
      phase = 'waiting';
      timer = window.setTimeout(tick, 3750);
      return;
    }
    cursor.classList.add('is-editing');
    phase = 'editing';
    const current = frames[frameIndex];
    render(current.value, current.caret);
    frameIndex = (frameIndex + 1) % frames.length;
    if (current.end) {
      phase = 'settling';
      timer = window.setTimeout(tick, 250);
      return;
    }
    timer = window.setTimeout(tick, current.delay);
  }
  function reset() {
    window.clearTimeout(timer);
    if (!introFinished) {
      if (preference.matches || document.hidden) finishIntro();
      else typeIntro();
      return;
    }
    frameIndex = 0;
    phase = 'waiting';
    cursor.classList.remove('is-editing', 'is-visible');
    render(fullName, fullName.length);
    if (!preference.matches && !compactDevice.matches && !window.navigator?.connection?.saveData && !document.hidden) timer = window.setTimeout(tick, 4000);
  }
  preference.addEventListener('change', reset);
  document.addEventListener('portfolio-language-change', event => {
    intro.setAttribute('aria-label', event.detail.language === 'en' ? 'Team Lead · Frontend · AI' : 'Team Lead · Frontend · IA');
    roles[2].textContent = event.detail.language === 'en' ? 'AI' : 'IA';
  });
  document.addEventListener('visibilitychange', reset);
  if (preference.matches) finishIntro();
  else typeIntro();

  const details = document.querySelector('#jokerDetails');
  const grainSize = 2.2;
  function drawJoker(card) {
    const photo = card.querySelector('.balatro-photo img');
    const canvas = card.querySelector('.balatro-photo canvas');
    if (!photo || !canvas) return;
    const draw = () => {
      const context = canvas.getContext('2d');
      if (!context || !photo.naturalWidth) return;
      const tiny = document.createElement('canvas');
      tiny.width = Math.max(1, Math.round(canvas.width / grainSize));
      tiny.height = Math.max(1, Math.round(canvas.height / grainSize));
      const tinyContext = tiny.getContext('2d');
      if (!tinyContext) return;
      const zoom = 1.55;
      const ratio = Math.max(tiny.width / photo.naturalWidth, tiny.height / photo.naturalHeight) * zoom;
      const width = photo.naturalWidth * ratio;
      const height = photo.naturalHeight * ratio;
      tinyContext.imageSmoothingEnabled = true;
      tinyContext.fillStyle = '#dfe8e1';
      tinyContext.fillRect(0, 0, tiny.width, tiny.height);
      tinyContext.drawImage(photo, (tiny.width - width) / 2, 0, width, height);
      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(tiny, 0, 0, canvas.width, canvas.height);
    };
    if (photo.complete) draw();
    else photo.addEventListener('load', draw, { once: true });
  }
  function updateJoker() {
    details.hidden = document.querySelector('#profileCard').dataset.format !== 'balatro';
    if (details.hidden) return;
    drawJoker(document.querySelector('#profileCard'));
  }
  document.addEventListener('cardformatchange', updateJoker);
  document.addEventListener('cardpreviewchange', event => {
    details.hidden = true;
    drawJoker(event.detail.card);
  });
  document.addEventListener('cardtransitionend', updateJoker);
  updateJoker();
})();

// Let the first card finish loading before fetching artwork for the other formats.
(() => {
  const images = {
    mtg: ['../assets/mtg-background-v7.webp', '../AI inspiration/W.svg', '../AI inspiration/U.svg', '../AI inspiration/R.svg', '../AI inspiration/G.svg'],
    pokemon: ['../assets/pkm-background-v7.webp', '../assets/pkm-electric.png', '../assets/pkm-dragon.png', '../assets/pkm-normal.webp'],
    hearthstone: ['../assets/hearthstone-background.avif', '../AI inspiration/hearthstone-card-2.png'],
  };
  const fonts = {
    mtg: ['700 16px "Beleren Bold"', '700 16px "Beleren SmallCaps Bold"'],
    balatro: ['16px Balatro'],
  };
  const pendingImages = new Map();
  const pendingFormats = new Map();

  function loadImage(path) {
    const url = new URL(path, document.baseURI).href;
    if (!pendingImages.has(url)) {
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = 'low';
      pendingImages.set(url, new Promise(resolve => {
        image.onload = () => {
          // Decoding now avoids a blank frame when the card is first displayed.
          if (image.decode) image.decode().catch(() => {}).finally(resolve);
          else resolve();
        };
        image.onerror = resolve; // A failed asset must not stop the remaining queue.
        image.src = url;
      }));
    }
    return pendingImages.get(url);
  }

  function loadFormat(format) {
    if (!pendingFormats.has(format)) {
      pendingFormats.set(format, (async () => {
        await Promise.all((images[format] || []).map(loadImage));
        if (document.fonts) await Promise.all((fonts[format] || []).map(font => document.fonts.load(font).catch(() => {})));
      })());
    }
    return pendingFormats.get(format);
  }

  // Navigation can promote a format already in the background queue.
  window.cardAssetPreload = loadFormat;

  window.addEventListener('load', async () => {
    const portrait = document.querySelector('#profileCard .portrait');
    if (portrait?.decode) await portrait.decode().catch(() => {});
    for (const format of ['mtg', 'pokemon', 'hearthstone', 'poker', 'balatro']) {
      if (document.hidden) {
        await new Promise(resolve => document.addEventListener('visibilitychange', resolve, { once: true }));
      }
      await loadFormat(format);
    }
  }, { once: true });
})();

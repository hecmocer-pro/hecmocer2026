# Portfolio de Héctor Moreno Cervera

Código fuente de la versión pública V7 del portfolio.

El sitio es estático y no necesita instalar dependencias. Vercel ejecuta `node build.mjs` y sirve `dist/`, con la página principal en `/`.

Para probar el resultado localmente:

```sh
node build.mjs
python -m http.server 8127 --directory dist
```

Abre `http://localhost:8127/`.

Los archivos HTML, CSS y JavaScript de la página están en `src/`. `build.mjs` los publica en `dist/` y copia exclusivamente los recursos que usa el sitio desde `assets/` y `AI inspiration/`. Las licencias de las fuentes incluidas se conservan junto a sus archivos.

# Portfolio de Héctor Moreno Cervera

Código fuente de la versión pública V7 del portfolio.

El portfolio usa HTML, CSS y JavaScript. Para desarrollarlo necesitas Node.js 26 LTS y npm. El proyecto no tiene dependencias que instalar.

Arranca el servidor de desarrollo desde la raíz del repositorio.

```sh
npm run dev
```

El servidor prueba primero el puerto `8000`. Si está ocupado, prueba `8001`, `8002` y los siguientes hasta encontrar uno libre. La terminal muestra la URL efectiva. Puedes elegir el puerto inicial con la variable de entorno opcional `PORT`.

Abre la URL que muestra la terminal y sigue el enlace **Proyectos** para comprobar que carga `/projects`. Recarga la página tras editar archivos.

Ejecuta `npm run build` para generar `dist/` y comprueba que contiene `index.html` y `projects.html`. Vercel ejecuta `node build.mjs`, sirve `dist/` y dirige `/projects` a `projects.html`.

Los archivos HTML, CSS y JavaScript de la página están en `src/`. `build.mjs` los publica en `dist/` y copia exclusivamente los recursos que usa el sitio desde `assets/` y `AI inspiration/`. Las licencias de las fuentes incluidas se conservan junto a sus archivos.

La interacción de las cartas está en `cards.js`; `card-tilt.js` controla su inclinación. `visual-effects.js` contiene la animación de entrada y el efecto del Joker, con sus estilos en `visual-effects.css`. `preferences.js` gestiona el idioma y el tema.

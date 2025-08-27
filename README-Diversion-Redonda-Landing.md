# Diversión Redonda — Guía rápida de publicación y edición

¡Bienvenido! Este README explica **cómo publicar** la landing y **cómo editar** textos, precios, testimonios e imágenes **sin tocar diseño**.

---

## 1) Estructura del proyecto

```
/index.html                         ← HTML principal
/assets/css/styles.css              ← Estilos (incluye confeti y “faldón”)
/assets/js/app.js                   ← Carga textos/precios/testimonios
/assets/img/                        ← Logo, iconos y FOTOS de la web
  hero.jpg                          ← Niños saltando (sección HERO)
  taller.jpg                        ← Foto de taller creativo
  minidisco.jpg                     ← Foto de juego/minidisco
  padres.jpg                        ← Padres tranquilos con peques
  logo.png                          ← Logo PNG (puedes sustituir por SVG)
  icon-*.svg                        ← Iconos de valores
  confetti-tile.png                 ← Patrón de confeti
  faldon-wave.svg                   ← Onda decorativa para secciones
/content/
  home.json                         ← Titulares, “Quiénes somos”, WhatsApp
  services.json                     ← Packs y precios
  testimonials.json                 ← Testimonios
```

---

## 2) Publicar en Vercel (una vez)

1. Sube todo el proyecto a **GitHub** (Add file → Upload files → Commit).  
2. Entra en **Vercel** → *New Project* → Importa el repo → **Deploy**.  
3. Obtendrás una URL como `https://tu-proyecto.vercel.app`.

> Cada cambio en GitHub se **publica automáticamente** en Vercel en 1–2 minutos.

---

## 3) Cambiar textos y WhatsApp

Edita `content/home.json` en GitHub (icono ✏️ → Commit).

```json
{
  "headline": "Ellos ríen, tú disfrutas.",
  "subheadline": "Animación infantil para que tus celebraciones sean inolvidables.",
  "about": "Texto de '¿Quiénes somos?'",
  "cta_whatsapp": "https://wa.me/34655551741"
}
```

- **headline** → frase grande del HERO.  
- **subheadline** → frase bajo el titular.  
- **about** → texto de la sección ¿Quiénes somos?  
- **cta_whatsapp** → enlace directo a WhatsApp. Puedes pre-rellenar mensaje:  
  `https://wa.me/34655551741?text=Hola%20Diversion%20Redonda%2C%20quiero%20informacion`

---

## 4) Cambiar packs y precios

Edita `content/services.json`:

```json
{
  "items": [
    {
      "title": "Cumpleaños mágico (1h 30m)",
      "description": "Juegos dinámicos, pintacaras y globoflexia.",
      "price_from": 80
    },
    {
      "title": "Comunión especial (3h)",
      "description": "Talleres creativos + minidisco.",
      "price_from": 200
    }
  ]
}
```

- **Añadir un pack**: copia-pega un bloque `{ ... }` y separa con **coma**.  
- **price_from**: número **sin símbolo €**.  
- **Orden**: reordena los bloques para cambiar el orden en la web.

---

## 5) Cambiar testimonios

Edita `content/testimonials.json`:

```json
{
  "items": [
    { "quote": "Los niños no pararon de reír...", "author": "María G., madre de 2 niños" },
    { "quote": "Muy profesionales y cercanos.", "author": "AMPA San José" },
    { "quote": "Mis tres hijos lo pasaron en grande.", "author": "Carlos M., padre de 3 niños" }
  ]
}
```

- Puedes borrar o añadir testimonios (recuerda las **comas**).

---

## 6) Cambiar FOTOS y LOGO

- Sustituye los archivos en `/assets/img/` usando **el mismo nombre** para que el HTML ya los encuentre:  
  - `hero.jpg`, `taller.jpg`, `minidisco.jpg`, `padres.jpg`.  
- Logo: reemplaza `logo.png` (o usa `logo.svg` y cambia la ruta en `index.html`).

> Recomendado: JPG **1200 px** de ancho para fotos de secciones y **peso < 300 KB**.

---

## 7) Edición de colores de marca (opcional)

En `assets/css/styles.css` (variables al inicio):

```css
:root{
  --yellow:#FFD23F;
  --mint:#2EC4B6;
  --navy:#1C2541;
  --pink:#FF7EB9;
  --cream:#FFF8E7;
}
```

Cambia los **HEX** si deseas ajustar tonos.

---

## 8) Checklist antes de publicar

- [ ] Botones de WhatsApp abren correctamente.  
- [ ] Texto “¿Quiénes somos?” actualizado.  
- [ ] Precios revisados.  
- [ ] Fotos se ven y no pesan demasiado.  
- [ ] Favicon y OG listos (compartir en WhatsApp/Redes muestra vista previa).  
- [ ] Sin errores en JSON (ver sección siguiente).

---

## 9) Problemas comunes (y solución)

**Pantalla en blanco / contenido no carga**  
- Suele ser un **JSON con error** (coma de más, comillas, etc.).  
- Revisa el archivo que editaste y valida en https://jsonlint.com/.

**No veo los cambios**  
- Vercel tarda ~1–2 min. Refresca con **Ctrl/Cmd + F5** (limpia caché).

**Imagen rota**  
- Verifica que el nombre del archivo **y la ruta** coinciden con el HTML.  
- Subiste imagen al directorio `assets/img/` correcto.

**Emoji o tildes raras**  
- Asegúrate de que el archivo se guarda en **UTF-8** (GitHub lo hace por defecto).

---

## 10) ¿Cómo trabajar día a día?

1. En GitHub, edita `content/*.json` según lo que quieras cambiar.  
2. Pulsa **Commit**.  
3. Espera 1–2 minutos y refresca tu web de Vercel.  
4. Repite cuando necesites (tarifas, packs de temporada, fotos nuevas…).

---

## 11) Extensión futura (opcional)

- **Dominio propio** (ej. diversionredonda.es) → Vercel → *Project Settings → Domains*.  
- **Analytics** → Google Analytics 4 o Plausible.  
- **CMS visual** (Decap CMS) para editar con formularios en `/admin`.

---

Cualquier duda, abre este README y sigue los pasos 😊  

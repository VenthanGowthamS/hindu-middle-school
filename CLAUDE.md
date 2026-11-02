# Hindu Middle School Pannaipuram — Website

Static site for Hindu Middle School, Pannaipuram (est. 1942). No build step, no framework — plain HTML/CSS/JS served as-is.

## Files

- `index.html` — entire page (nav, hero, values marquee, about bento, founder legacy, timeline, gallery, admissions/contact, footer). Icons are an inline SVG sprite at the top of `<body>` (no Font Awesome).
- `style.css` — all styling. Desktop rules first, then `@media` blocks (960px, 820px, 600px) and `prefers-reduced-motion` at the bottom.
- `script.js` — `SCHOOL` config (phone, WhatsApp, email, map coords), EN/தமிழ் toggle, mobile menu, scroll reveal, count-up stats, auto year.
- Images used: `founder.webp`, `hero.webp`, `og.jpg` (share preview), `icon-192.png`. Originals (`founder.png`, `founder_new.png`, `school_hero_background.png`) are kept as sources only.

## Conventions

- **Contact details live only in `SCHOOL` in script.js.** Buttons use `data-href="tel|whatsapp|mailto|directions"`; never hard-code numbers in HTML. Phone/email are still placeholders.
- **Bilingual text:** every translatable element carries `data-en` and `data-ta`. Add both when adding copy. `<br>` is allowed inside them.
- Years-of-service and footer year are computed from `SCHOOL.founded` and the current date — don't hard-code them.
- Keep desktop rules and the mobile override blocks separate — don't nest desktop rules inside `@media` (this caused a real bug previously).
- Gallery uses placeholder tiles; replace each with `<figure class="gallery-item"><img src="..." alt="..." loading="lazy"></figure>`. Use WebP, ~1200px max.
- Keep the founding year (1942) consistent across `<title>`, meta/OG tags, JSON-LD, hero, and timeline.

## Local preview

`.claude/launch.json` runs `npx serve` on port 8000 for the Claude preview tool.

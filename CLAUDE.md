# Hindu Middle School Pannaipuram — Website

Static marketing site for Hindu Middle School, Pannaipuram (est. 1942). No build step, no framework — plain HTML/CSS/JS served as-is.

## Files

- `index.html` — entire page (nav, hero, about, founder legacy, stats, gallery, contact, footer)
- `style.css` — all styling, including the responsive `@media (max-width: 768px)` block at the bottom
- `script.js` — mobile nav toggle only
- `founder.png`, `founder_new.png`, `school_hero_background.png` — site images

## Conventions

- Single CSS file, no preprocessor. Keep desktop rules and the mobile override block separate — don't duplicate desktop rules inside the media query (this caused a real bug previously: the Founder Legacy section's styles were nested *inside* `@media` and invisible on desktop).
- Gallery currently uses styled placeholder tiles (icon + label) since real photos aren't available yet — swap in real `<img>` tags when photos are provided.
- Keep the founding year (1942) consistent across `<title>`, meta description, hero badge, and About section copy.

## Local preview

`.claude/launch.json` runs `npx serve` on port 8000 for the Claude preview tool.

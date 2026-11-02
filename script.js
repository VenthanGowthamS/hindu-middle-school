/* ---------------------------------------------------------------
   SCHOOL CONTACT DETAILS: edit these once, every button updates.
   TODO: replace the placeholder phone and email with the real ones.
---------------------------------------------------------------- */
const SCHOOL = {
    phone: '+91 98765 43210',          // placeholder
    whatsapp: '919876543210',          // country code + number, digits only (placeholder)
    email: 'info@hindumiddleschool.com', // placeholder
    founded: 1942,
    lat: 9.8650812,
    lng: 77.2839617,
};

document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const yearsRunning = year - SCHOOL.founded;

    /* ---------- Contact links ---------- */
    const hrefs = {
        tel: 'tel:' + SCHOOL.phone.replace(/\s/g, ''),
        whatsapp: 'https://wa.me/' + SCHOOL.whatsapp,
        mailto: 'mailto:' + SCHOOL.email,
        directions: `https://www.google.com/maps/dir/?api=1&destination=${SCHOOL.lat},${SCHOOL.lng}`,
    };
    document.querySelectorAll('[data-href]').forEach(el => { el.href = hrefs[el.dataset.href]; });
    document.querySelectorAll('[data-text]').forEach(el => { el.textContent = SCHOOL[el.dataset.text]; });

    /* ---------- Dates that stay current ---------- */
    document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = year; });
    document.querySelectorAll('[data-years-count]').forEach(el => { el.dataset.count = yearsRunning; el.textContent = yearsRunning; });

    /* ---------- Language toggle (EN / தமிழ்) ---------- */
    const applyLang = (lang) => {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-en]').forEach(el => {
            const txt = el.dataset[lang] || el.dataset.en;
            if (txt.includes('<br>')) el.innerHTML = txt; else el.textContent = txt;
        });
        document.querySelectorAll('[data-years]').forEach(el => {
            el.textContent = lang === 'ta' ? `${yearsRunning} ஆண்டுகள்` : `${yearsRunning} years`;
        });
        try { localStorage.setItem('hms-lang', lang); } catch (e) { /* storage unavailable */ }
    };
    let saved = 'en';
    try { saved = localStorage.getItem('hms-lang') || 'en'; } catch (e) { /* ignore */ }
    applyLang(saved);

    document.querySelector('.lang-toggle').addEventListener('click', () => {
        const next = document.documentElement.lang === 'ta' ? 'en' : 'ta';
        if (document.startViewTransition) document.startViewTransition(() => applyLang(next));
        else applyLang(next);
    });

    /* ---------- Mobile menu ---------- */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const setMenu = (open) => {
        navLinks.classList.toggle('active', open);
        menuBtn.setAttribute('aria-expanded', open);
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menuBtn.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    };
    menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

    /* ---------- Navbar shadow + active section ---------- */
    const navbar = document.querySelector('.navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('IntersectionObserver' in window) {
        const links = [...navLinks.querySelectorAll('a')];
        const spy = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

        /* Reveal on scroll */
        const reveal = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

        /* Count-up numbers */
        const counter = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                const el = en.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
                counter.unobserve(el);
                if (reduceMotion) { el.textContent = target + suffix; return; }
                const t0 = performance.now(), dur = 1200;
                const tick = now => {
                    const p = Math.min((now - t0) / dur, 1);
                    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
});

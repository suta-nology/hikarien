/* ─────────────────────────────────────────────
   HIKARI CARE — main.js  (shared, all pages)
   Requires: lang.js to be loaded first
───────────────────────────────────────────── */

/* ── 1. LANGUAGE SYSTEM ── */
let currentLang = localStorage.getItem('hikariLang') || 'ja';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('hikariLang', lang);

  const t = LANG[lang];
  if (!t) return;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // HTML content (for elements with line breaks)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key].replace(/\n/g, '<br>');
  });

  // Lang toggle button label
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.textContent = t.langToggle || (lang === 'ja' ? 'EN' : '日本語');

  // html lang attribute
  document.documentElement.lang = lang;
}

function toggleLang() {
  applyLang(currentLang === 'ja' ? 'en' : 'ja');
}

/* ── 2. HEADER SCROLL ── */
const siteHeader = document.getElementById('siteHeader');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── 3. MOBILE MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if (hamburger) hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* ── 4. ACTIVE NAV LINK ── */
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-nav-list a').forEach(link => {
  const href = (link.getAttribute('href') || '').split('#')[0];
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── 5. FADE-UP OBSERVER ── */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => io.observe(el));
}

/* ── 6. SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = siteHeader ? siteHeader.offsetHeight + 16 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── 7. INIT ── */
window.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
});

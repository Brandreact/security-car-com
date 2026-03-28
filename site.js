/**
 * Security Car – Shared Site Components
 * Injects nav, footer, mobile menu, scroll fx, fade animations
 * Each page sets: <html data-root="./"> or <html data-root="../">
 */
document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement.dataset.root || './';

  // ─── Navigation HTML ───────────────────────────────────────────────
  const navItems = [
    { label: 'Home',           href: root + 'index.html',                key: 'home' },
    { label: 'Unternehmen',    href: root + 'unternehmen.html',           key: 'unternehmen' },
    {
      label: 'Fahrzeugtechnik', href: root + 'fahrzeugtechnik/index.html', key: 'fahrzeugtechnik',
      sub: [
        { label: 'Übersicht',               href: root + 'fahrzeugtechnik/index.html' },
        { label: 'Kettenfahrzeuge & Panzer', href: root + 'fahrzeugtechnik/kettenfahrzeuge-panzer.html' },
        { label: 'Schwere Nutzfahrzeuge',    href: root + 'fahrzeugtechnik/schwere-nutzfahrzeuge.html' },
        { label: 'Sonderumbauten / Formenbau', href: root + 'fahrzeugtechnik/sonderumbauten-formenbau.html' },
      ]
    },
    { label: 'Flugzeugtechnik',  href: root + 'flugzeugtechnik/index.html',   key: 'flugzeugtechnik' },
    { label: 'Personenausrüstung', href: root + 'personenausruestung/index.html', key: 'personenausruestung' },
    { label: 'Kontakt',          href: root + 'index.html#contact',            key: 'contact' },
  ];

  const currentKey = document.documentElement.dataset.page || '';

  function buildDesktopNav() {
    return navItems.map(item => {
      const isActive = currentKey === item.key;
      if (item.sub) {
        const subHtml = item.sub.map(s =>
          `<a href="${s.href}" class="block px-4 py-2.5 text-sm text-gray-300 hover:text-gold hover:bg-white/5 transition-colors whitespace-nowrap">${s.label}</a>`
        ).join('');
        return `
          <div class="relative group">
            <a href="${item.href}" class="flex items-center gap-1 text-sm tracking-wide uppercase transition-colors ${isActive ? 'text-gold' : 'text-gray-300 hover:text-gold'}">
              ${item.label}
              <svg class="w-3 h-3 mt-0.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <div class="absolute top-full left-0 pt-3 hidden group-hover:block z-50">
              <div class="bg-black border border-dark-border shadow-xl min-w-max py-1">${subHtml}</div>
            </div>
          </div>`;
      }
      return `<a href="${item.href}" class="text-sm tracking-wide uppercase transition-colors ${isActive ? 'text-gold' : 'text-gray-300 hover:text-gold'}">${item.label}</a>`;
    }).join('');
  }

  function buildMobileNav() {
    return navItems.flatMap(item => {
      const links = [`<a href="${item.href}" class="text-gray-300 hover:text-gold py-2 uppercase tracking-wide text-sm font-medium">${item.label}</a>`];
      if (item.sub) {
        item.sub.slice(1).forEach(s => {
          links.push(`<a href="${s.href}" class="text-gray-500 hover:text-gold py-1.5 pl-4 text-xs tracking-wide">↳ ${s.label}</a>`);
        });
      }
      return links;
    }).join('');
  }

  // ─── Inject Nav ────────────────────────────────────────────────────
  const navEl = document.getElementById('sc-nav');
  if (navEl) {
    navEl.innerHTML = `
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <a href="${root}index.html" class="flex items-center gap-3 flex-shrink-0">
        <img src="${root}images/logo.png" alt="Security Car Logo" class="h-12 w-12 object-contain" onerror="this.style.display='none'">
        <div class="leading-tight">
          <span class="block text-gold font-bold text-lg tracking-wide">SECURITY CAR</span>
          <span class="block text-xs text-gray-400 tracking-widest uppercase">Valentin Tusch GmbH</span>
        </div>
      </a>
      <div class="hidden lg:flex items-center gap-7">${buildDesktopNav()}</div>
      <a href="${root}index.html#contact" class="hidden lg:inline-flex ml-2 px-5 py-2.5 border border-gold text-gold text-sm font-semibold tracking-wide hover:bg-gold hover:text-black transition-all duration-200">Anfrage</a>
      <button id="sc-menu-toggle" class="lg:hidden text-gold p-2" aria-label="Menü">
        <svg id="sc-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        <svg id="sc-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div id="sc-mobile-menu" class="sc-mobile-menu lg:hidden border-t border-dark-border">
      <div class="py-4 flex flex-col gap-1 px-2">
        ${buildMobileNav()}
        <a href="${root}index.html#contact" class="mt-3 w-full text-center px-5 py-3 border border-gold text-gold font-semibold hover:bg-gold hover:text-black transition-all">Anfrage stellen</a>
      </div>
    </div>
  </div>
</nav>`;
  }

  // ─── Inject Footer ──────────────────────────────────────────────────
  const footerEl = document.getElementById('sc-footer');
  if (footerEl) {
    footerEl.innerHTML = `
<footer class="bg-dark border-t border-dark-border">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3 mb-4">
          <img src="${root}images/logo.png" alt="Security Car" class="h-10 w-10 object-contain" onerror="this.style.display='none'">
          <div>
            <span class="block text-gold font-bold tracking-wide">SECURITY CAR</span>
            <span class="block text-xs text-gray-500 tracking-widest uppercase">Valentin Tusch GmbH</span>
          </div>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed">Gepanzerte Fahrzeuge und beschussfeste Spezialfahrzeuge für Polizei, Streitkräfte und Regierungen weltweit.</p>
      </div>
      <div>
        <h4 class="text-xs font-semibold text-gold tracking-widest uppercase mb-5">Services</h4>
        <ul class="space-y-3">
          <li><a href="${root}fahrzeugtechnik/index.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Fahrzeugtechnik</a></li>
          <li><a href="${root}fahrzeugtechnik/kettenfahrzeuge-panzer.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Kettenfahrzeuge &amp; Panzer</a></li>
          <li><a href="${root}fahrzeugtechnik/schwere-nutzfahrzeuge.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Schwere Nutzfahrzeuge</a></li>
          <li><a href="${root}fahrzeugtechnik/sonderumbauten-formenbau.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Sonderumbauten / Formenbau</a></li>
          <li><a href="${root}flugzeugtechnik/index.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Flugzeugtechnik</a></li>
          <li><a href="${root}personenausruestung/index.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Personenausrüstung</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs font-semibold text-gold tracking-widest uppercase mb-5">Quick Links</h4>
        <ul class="space-y-3">
          <li><a href="${root}unternehmen.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Unternehmen</a></li>
          <li><a href="${root}index.html#projects" class="text-gray-500 hover:text-gold text-sm transition-colors">Aktuelle Projekte</a></li>
          <li><a href="${root}index.html#contact" class="text-gray-500 hover:text-gold text-sm transition-colors">Kontakt</a></li>
          <li><a href="${root}impressum.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Impressum</a></li>
          <li><a href="${root}datenschutz.html" class="text-gray-500 hover:text-gold text-sm transition-colors">Datenschutz</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs font-semibold text-gold tracking-widest uppercase mb-5">Kontakt</h4>
        <div class="space-y-3 text-sm text-gray-500">
          <p>Plescherken 18<br>9074 Keutschach<br>Kärnten, Austria</p>
          <a href="mailto:valentin.tusch@security-car.com" class="block hover:text-gold transition-colors">valentin.tusch@security-car.com</a>
          <a href="tel:+43427321007" class="block hover:text-gold transition-colors">+43 (0) 4273/21007</a>
          <a href="tel:+436642534388" class="block hover:text-gold transition-colors">+43 (0) 664/2534 388</a>
        </div>
      </div>
    </div>
  </div>
  <div class="border-t border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-gray-600 text-sm">2026 © Valentin Tusch GmbH. Alle Rechte vorbehalten.</p>
      <p class="text-gray-600 text-xs">
        <a href="${root}impressum.html" class="hover:text-gold transition-colors mr-4">Impressum</a>
        <a href="${root}datenschutz.html" class="hover:text-gold transition-colors">Datenschutz</a>
      </p>
    </div>
  </div>
</footer>`;
  }

  // ─── Init behaviors ─────────────────────────────────────────────────
    // Screenshot mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('screenshot') === '1') {
      document.body.classList.add('screenshot');
      document.querySelectorAll('.fade-on-scroll').forEach(el => el.classList.add('visible'));
    }

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 80);
      });
    }

    // Mobile menu
    const toggle = document.getElementById('sc-menu-toggle');
    const mobileMenu = document.getElementById('sc-mobile-menu');
    const iconOpen = document.getElementById('sc-icon-open');
    const iconClose = document.getElementById('sc-icon-close');
    let menuOpen = false;
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('open', menuOpen);
        iconOpen.classList.toggle('hidden', menuOpen);
        iconClose.classList.toggle('hidden', !menuOpen);
      });
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          menuOpen = false;
          mobileMenu.classList.remove('open');
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        });
      });
    }

    // Fade-in observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));
});
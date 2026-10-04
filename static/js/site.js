/* =====================================================================
   Shared page chrome: sidebar, footer, page loader, image fallbacks.

   ▸ To change the navigation, social links, name or photo on EVERY page,
     edit the SITE object below — nothing else.
   ▸ Each page marks where the pieces go with:
        <div data-include="sidebar"></div>
        <div data-include="footer"></div>
     and tells this script which nav item is active and where the site
     root is:
        <body data-page="articles" data-root="../">
   ===================================================================== */
(function () {
  'use strict';

  const SITE = {
    nameLines: ['Surya T.', 'Bijjala'],
    fullName: 'Surya T. Bijjala',
    initials: 'SB',
    taglinePrimary: 'Materials Scientist',
    taglineSecondary: 'And Professional Human',

    // TODO: rename the file to something like static/img/profile.jpg and update here.
    profileImage: 'static/img/apk.png',

    // Order here = order in the sidebar. `key` must match <body data-page="…">.
    nav: [
      { key: 'home',          label: 'Home',                   href: 'index.html' },
      { key: 'cv',            label: 'Curriculum Vitae',       href: 'cv/index.html' },
      { key: 'articles',      label: 'Articles',               href: 'articles/index.html' },
      { key: 'computational', label: 'Computational Projects', href: 'computational/index.html' },
      { key: 'experimental',  label: 'Experimental Projects',  href: 'experimental/index.html' },
      { key: 'conferences',   label: 'Conferences',            href: 'conferences/index.html' },
      { key: 'collaborate',   label: 'Collaborations',         href: 'collaborate/index.html' },
    ],

    // Leave `href` empty to hide an icon until you have a link for it.
    social: [
      {
        label: 'GitHub',
        href: 'https://github.com/suryabteja',
        hover: 'hover:text-neutral-900',
        icon: '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
      },
      {
        label: 'ORCID',
        href: 'https://orcid.org/0009-0005-4805-0829',
        hover: 'hover:text-[#A6CE39]',
        icon: '<svg width="20" height="20" viewBox="0 0 256 256" aria-hidden="true"><circle cx="128" cy="128" r="128" fill="currentColor"/><path d="M86 175V81h20v94H86zm10-108a13 13 0 100-26 13 13 0 000 26z" fill="#fff"/><path d="M122 81h54c51 0 51 94 0 94h-54V81zm20 17v60h31c31 0 31-60 0-60h-31z" fill="#fff"/></svg>',
      },
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=A4swq4MAAAAJ&hl=en',
        hover: 'hover:text-[#4285F4]',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/suryabijjala/',
        hover: 'hover:text-[#0A66C2]',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      },
      {
        label: 'Streamlit',
        href: '', // TODO: add your Streamlit app URL to show this icon
        hover: 'hover:text-[#FF4B4B]',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.486 9.423a2.646 2.646 0 0 0-2.589-2.05h-3.8A2.645 2.645 0 0 1 7.5 4.735a2.644 2.644 0 0 1 2.597-2.637h4.94a.895.895 0 0 0 .894-.896.892.892 0 0 0-.895-.89h-4.94A4.434 4.434 0 0 0 5.71 4.736a4.436 4.436 0 0 0 4.386 4.426h3.8a.856.856 0 0 1 .844.664.85.85 0 0 1-.303.876.862.862 0 0 1-.54.19H5.711a2.644 2.644 0 0 0-2.596 2.637 2.644 2.644 0 0 0 2.596 2.635h3.8a2.645 2.645 0 0 1 2.597 2.636 2.645 2.645 0 0 1-2.597 2.637H4.571a.895.895 0 0 0-.894.895c0 .493.4.894.894.894h4.94A4.435 4.435 0 0 0 13.9 18.232a4.436 4.436 0 0 0-4.388-4.428h-3.8a.853.853 0 0 1-.542-1.066.853.853 0 0 1 .542-.662h8.183a2.646 2.646 0 0 0 2.59-2.653zm5.728 1.15a.892.892 0 0 0-.894-.89h-1.393a.894.894 0 0 0 0 1.787h1.393a.895.895 0 0 0 .894-.897zm-1.788 3.55a.892.892 0 0 0-.894-.891h-2.923a.894.894 0 0 0 0 1.787h2.923a.895.895 0 0 0 .894-.896z"/></svg>',
      },
    ],

    // How long the atom loader stays up before fading (ms). Set to 0 to skip it.
    loaderDelayMs: 1000,
  };

  /* ------------------------------------------------------------------ */

  const body = document.body;
  const root = body.dataset.root || '';
  const page = body.dataset.page || '';

  function sidebarHTML() {
    const social = SITE.social
      .filter((s) => s.href)
      .map((s) => `
        <li>
          <a href="${s.href}" target="_blank" rel="noopener" class="${s.hover} transition-colors duration-200 flex items-center gap-2" aria-label="${s.label}" title="${s.label}">
            ${s.icon}
          </a>
        </li>`)
      .join('');

    const nav = SITE.nav
      .map((n) => {
        const active = n.key === page;
        return `<li><a href="${root}${n.href}" class="nav-link${active ? ' active' : ''}"${active ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
      })
      .join('\n        ');

    return `
  <aside class="w-full lg:w-[26rem] xl:w-[30rem] lg:h-screen lg:sticky lg:top-0 bg-neutral-50 lg:bg-white lg:border-r border-neutral-200 flex flex-col px-8 py-12 lg:p-14 z-10 opacity-0 animate-fade-in custom-scrollbar overflow-y-auto">
    <a href="${root}index.html" class="block w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border border-neutral-200 shadow-sm transition-transform hover:scale-105 duration-300 shrink-0" aria-label="Home">
      <img src="${root}${SITE.profileImage}" alt="${SITE.fullName}" class="w-full h-full object-cover" data-fallback="initials">
    </a>

    <div class="mt-8 shrink-0">
      <p class="font-serif text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-none mb-3">${SITE.nameLines.join('<br>')}</p>
      <p class="text-sm font-sans tracking-[0.2em] uppercase text-neutral-500 font-medium leading-relaxed">
        ${SITE.taglinePrimary}<br>
        <span class="text-neutral-400">${SITE.taglineSecondary}</span>
      </p>
    </div>

    <ul class="flex flex-wrap gap-4 mt-6 text-neutral-400 shrink-0">${social}
    </ul>

    <div class="my-10 w-8 border-t border-neutral-300 shrink-0"></div>

    <nav class="flex-1 shrink-0 pb-8" aria-label="Main">
      <ul class="flex flex-col space-y-4 text-base font-sans text-neutral-500 tracking-wide">
        ${nav}
      </ul>
    </nav>
  </aside>`;
  }

  function footerHTML() {
    return `
    <footer class="mt-20 pt-8 border-t border-neutral-200 text-sm tracking-wider uppercase text-neutral-400 font-medium opacity-0 animate-fade-in delay-300">
      &copy; ${new Date().getFullYear()} ${SITE.fullName}
    </footer>`;
  }

  function loaderHTML() {
    const orbit = '<div class="atom-orbit"><div class="atom-electron-wrapper"><div class="atom-electron"></div></div></div>';
    return `
  <div id="page-loader" class="fixed inset-0 z-[100] bg-neutral-50 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out pointer-events-none" aria-hidden="true">
    <div class="atom-spinner mb-6"><div class="atom-nucleus"></div>${orbit}${orbit}${orbit}</div>
    <div class="text-neutral-500 font-sans tracking-[0.25em] text-xs uppercase font-medium">Loading</div>
  </div>`;
  }

  /* ── Insert shared chrome ─────────────────────────────────────────── */
  const includes = { sidebar: sidebarHTML, footer: footerHTML };
  document.querySelectorAll('[data-include]').forEach((el) => {
    const build = includes[el.dataset.include];
    if (build) el.outerHTML = build();
  });

  /* ── Image fallbacks ──────────────────────────────────────────────
     <img data-fallback="initials">        → "SB" circle (profile photo)
     <img data-fallback="hide-figure">     → hides the surrounding <figure>
     <img data-fallback="Any label">       → grey box with that label      */
  function applyFallback(img) {
    const mode = img.dataset.fallback;
    if (mode === 'hide-figure') {
      const fig = img.closest('figure');
      if (fig) fig.style.display = 'none';
      return;
    }
    const box = document.createElement('div');
    if (mode === 'initials') {
      box.className = 'w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400 font-serif text-7xl font-medium tracking-tighter';
      box.textContent = SITE.initials;
    } else {
      box.className = 'absolute inset-0 w-full h-full flex items-center justify-center text-neutral-400 font-sans text-xs tracking-widest uppercase';
      box.textContent = mode;
    }
    img.replaceWith(box);
  }
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) applyFallback(img);
    else img.addEventListener('error', () => applyFallback(img), { once: true });
  });

  /* ── Page loader ──────────────────────────────────────────────────── */
  function startPage() {
    body.classList.remove('loading-active');
  }
  if (SITE.loaderDelayMs > 0) {
    body.classList.add('loading-active');
    body.insertAdjacentHTML('afterbegin', loaderHTML());
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) {
          loader.classList.add('opacity-0');
          setTimeout(() => loader.remove(), 500);
        }
        startPage();
      }, SITE.loaderDelayMs);
    });
  } else {
    startPage();
  }
})();

/* =====================================================================
   Tag filter (Conferences page).

   The tag cloud is built automatically from the tag chips inside each
   card, so adding a new talk only means writing its card:
     <div class="js-filter-card …">
       …
       <span class="js-tag …">DFT</span>
     </div>
   Buttons are sorted by how many cards use the tag, then alphabetically.
   ===================================================================== */
(function () {
  'use strict';

  const cloud = document.getElementById('tagCloud');
  const cards = Array.from(document.querySelectorAll('.js-filter-card'));
  if (!cloud || !cards.length) return;

  const BTN_CLASS =
    'tag-btn px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-neutral-600 ' +
    'hover:border-neutral-400 hover:text-neutral-900 text-sm font-medium cursor-pointer select-none';

  // Collect tags per card (exact strings, case preserved).
  const counts = new Map();
  cards.forEach((card) => {
    const tags = Array.from(card.querySelectorAll('.js-tag')).map((t) => t.textContent.trim());
    card.dataset.tagList = JSON.stringify(tags);
    tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1));
  });

  const tags = Array.from(counts.keys()).sort(
    (a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b)
  );

  function makeButton(tag) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = BTN_CLASS;
    btn.dataset.tag = tag;
    btn.textContent = tag;
    btn.setAttribute('aria-pressed', 'false');
    return btn;
  }

  const buttons = [makeButton('All'), ...tags.map(makeButton)];
  buttons.forEach((b) => cloud.appendChild(b));

  function select(tag) {
    buttons.forEach((b) => {
      const on = b.dataset.tag === tag;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    cards.forEach((card) => {
      const list = JSON.parse(card.dataset.tagList);
      card.classList.toggle('hidden', tag !== 'All' && !list.includes(tag));
    });
  }

  cloud.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-btn');
    if (btn) select(btn.dataset.tag);
  });

  select('All');
})();

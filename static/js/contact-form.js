/* =====================================================================
   Contact form (Collaborations page).

   GitHub Pages can't receive form posts, so on submit this opens the
   visitor's email app with the message pre-filled and addressed to you.
   To use a form service instead (e.g. Formspree), set the <form action>
   to the service URL and delete this script tag from the page.
   ===================================================================== */
(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = form.dataset.to;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value;
    const message = form.elements.message.value.trim();

    const bodyText = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`;
    const url =
      `mailto:${to}` +
      `?subject=${encodeURIComponent(`${subject}${name ? ` — ${name}` : ''}`)}` +
      `&body=${encodeURIComponent(bodyText)}`;

    window.location.href = url;
  });
})();

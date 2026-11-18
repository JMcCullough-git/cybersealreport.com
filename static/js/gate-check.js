// Subscriber-only articles: runs in <head> before the page paints. If this device already
// signed up, mark the page so the modal never shows. See layouts/_partials/subscriber-gate.html.
try {
  if (localStorage.getItem('cs-subscribed') === '1') document.documentElement.classList.add('is-subscribed');
} catch (e) { /* storage blocked: the modal shows and works as usual */ }

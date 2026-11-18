// Subscriber-only articles: send the email to Kit without leaving the page, then open the article.
// Kit sends its normal confirmation email. The modal can't be closed without subscribing.
(function () {
  var root = document.documentElement;
  var gate = document.querySelector('[data-gate]');
  if (!gate || root.classList.contains('is-subscribed')) return;

  var form = gate.querySelector('[data-gate-form]');
  var ask = gate.querySelector('.gate__ask');
  var done = gate.querySelector('[data-gate-done]');
  var openBtn = gate.querySelector('[data-gate-open]');
  var input = form.querySelector('input[type="email"]');
  var button = form.querySelector('button');

  function unlock() {
    root.classList.add('is-subscribed');
    var article = document.querySelector('.gated-content');
    if (article) { article.setAttribute('tabindex', '-1'); article.focus({ preventScroll: true }); }
  }

  // Keep keyboard focus inside the modal while it's open.
  gate.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var items = Array.prototype.filter.call(
      gate.querySelectorAll('input, button, a[href], [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null && !el.disabled; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!input.value || !input.checkValidity()) { input.reportValidity(); return; }
    button.disabled = true;
    button.textContent = 'Subscribing…';
    var body = new URLSearchParams(new FormData(form));
    function finish() {
      try { localStorage.setItem('cs-subscribed', '1'); } catch (err) { /* this page still opens */ }
      ask.hidden = true;
      done.hidden = false;
      var title = done.querySelector('.gate__title');
      if (title) title.focus();
    }
    // no-cors: Kit receives the signup; the reply is unreadable from here, which is fine.
    fetch(form.action, { method: 'POST', body: body, mode: 'no-cors', credentials: 'omit' })
      .then(finish, finish);
  });

  openBtn.addEventListener('click', unlock);
  if (input) input.focus({ preventScroll: true });
})();

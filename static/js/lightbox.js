// Image viewer for article figures.
// A click on a figure opens the full-size image in an overlay with its caption,
// instead of loading the bare .webp file. Arrow keys, swipes and the Prev/Next buttons
// move between the page's figures; Esc, the Close button or a click on the backdrop closes it.
// Without JavaScript the links still open the full-size file.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('figure.evidence > a.evidence__zoom'));
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var current = 0;
  var opener = null;

  // A lightning bolt from the Cyber Seal mark, drawn as an SVG polygon (no inline styles).
  function bolt(cls) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 32 20');
    svg.setAttribute('class', cls);
    svg.setAttribute('aria-hidden', 'true');
    var poly = document.createElementNS(ns, 'polygon');
    poly.setAttribute('points', '0,1 12,5.6 10,7.4 32,19 7.6,8.4 9.6,6.6');
    poly.setAttribute('fill', 'currentColor');
    svg.append(poly);
    return svg;
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  var dialog = el('dialog', 'lightbox');
  dialog.setAttribute('aria-label', 'Image viewer');

  var bar = el('div', 'lightbox__bar');
  // Counter reads "1 [bolt] 3"; screen readers get "1 of 3".
  var count = el('span', 'lightbox__count');
  var countNow = el('span');
  var countAll = el('span');
  var countLabel = el('span', 'visually-hidden');
  countNow.setAttribute('aria-hidden', 'true');
  countAll.setAttribute('aria-hidden', 'true');
  count.append(countNow, bolt('lightbox__bolt'), countAll, countLabel);
  var close = el('button', 'lightbox__btn', 'Close');
  close.type = 'button';
  bar.append(count, close);

  var stage = el('div', 'lightbox__stage');
  var img = el('img', 'lightbox__img');
  img.alt = '';
  // While a large image loads, the crossed bolts strike in turn in its place.
  // Visitors who turn off motion get a still frame.
  var loader = el('img', 'lightbox__loader');
  loader.alt = '';
  loader.width = loader.height = 48;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  loader.src = document.querySelector('script[src*="lightbox.js"]').src.replace(/js\/lightbox\.js.*$/, 'images/bolts-loader' + (still ? '-still' : '') + '.webp');
  stage.append(loader, img);
  img.addEventListener('load', function () { stage.classList.remove('is-loading'); });
  img.addEventListener('error', function () { stage.classList.remove('is-loading'); });

  var foot = el('div', 'lightbox__foot');
  var prev = el('button', 'lightbox__btn', '← Prev');
  var next = el('button', 'lightbox__btn', 'Next →');
  prev.type = next.type = 'button';
  var caption = el('p', 'lightbox__caption');
  foot.append(prev, caption, next);

  dialog.append(bar, stage, foot);
  document.body.append(dialog);

  function show(i) {
    current = (i + links.length) % links.length;
    var link = links[current];
    var thumb = link.querySelector('img');
    var href = link.getAttribute('href');
    if (img.getAttribute('src') !== href) {
      stage.classList.add('is-loading');
      img.src = href;
    }
    img.alt = thumb ? thumb.alt : '';

    // Copy the figure caption (Fig. N + text) as nodes, never as HTML strings.
    caption.textContent = '';
    var figcap = link.parentNode.querySelector('figcaption');
    if (figcap) {
      Array.prototype.forEach.call(figcap.childNodes, function (n) { caption.append(n.cloneNode(true)); });
    }
    caption.hidden = !figcap;

    var many = links.length > 1;
    count.hidden = !many;
    countNow.textContent = current + 1;
    countAll.textContent = links.length;
    countLabel.textContent = ' (' + (current + 1) + ' of ' + links.length + ')';
    prev.hidden = next.hidden = !many;
  }

  function open(i) {
    opener = links[i];
    show(i);
    document.documentElement.classList.add('lightbox-open');
    dialog.showModal();
    close.focus();
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
      e.preventDefault();
      open(i);
    });
  });

  close.addEventListener('click', function () { dialog.close(); });
  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });

  // A click on the dark area around the image (not the image or the controls) closes it.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target === stage) dialog.close();
  });

  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
  });

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('lightbox-open');
    img.removeAttribute('src');
    if (opener) opener.focus();
  });

  // Swipe left or right on phones.
  var startX = null;
  stage.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (startX === null || links.length < 2) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();

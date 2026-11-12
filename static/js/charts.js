// Interactive charts (```chart / ![Caption](chart.html) in articles).
// Each chart reports its content height from inside its sandboxed frame; this sizes the frame.
// Messages are only accepted from one of this page's chart frames, and only a number is read.
(function () {
  var frames = Array.prototype.slice.call(document.querySelectorAll('iframe.chart__frame'));
  if (!frames.length) return;
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.cyberseal !== 'chart-height' || typeof d.height !== 'number') return;
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i];
      if (f.contentWindow !== e.source) continue;
      if (f.hasAttribute('data-fixed-height')) return;
      var h = Math.round(Math.min(Math.max(d.height, 160), 1400));
      if (Math.abs(h - (parseInt(f.getAttribute('height'), 10) || 0)) > 2) f.setAttribute('height', String(h));
      return;
    }
  });
})();

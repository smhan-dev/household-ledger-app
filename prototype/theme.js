/* Palette preview: add ?theme=midnight | teal | plum to the URL. Anything else keeps the default palette.
   Only names on this list are loaded, so the URL cannot point the page at another stylesheet. */
(function () {
  var THEMES = { midnight: '#121A3A', teal: '#0F4A52', plum: '#2D1A45' };
  var name = new URLSearchParams(location.search).get('theme');
  if (!Object.prototype.hasOwnProperty.call(THEMES, name)) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'themes/' + name + '.css';
  document.head.appendChild(link);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEMES[name]);
})();

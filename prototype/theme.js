/* Palette preview: add ?theme=midnight | teal | plum | clear | pine | mono to the URL. Anything else keeps the default palette.
   Only names on this list are loaded, so the URL cannot point the page at another stylesheet. */
(function () {
  var THEMES = { midnight: '#121A3A', teal: '#0F4A52', plum: '#2D1A45', clear: '#0956CC', pine: '#17402F', mono: '#111111' };
  var name = new URLSearchParams(location.search).get('theme');
  if (!Object.prototype.hasOwnProperty.call(THEMES, name)) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'themes/' + name + '.css';
  document.head.appendChild(link);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEMES[name]);
})();

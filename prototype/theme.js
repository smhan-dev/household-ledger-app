/* Palette preview: add ?theme=<name> to the URL (names listed in THEMES below). Anything else keeps the default palette.
   Only names on this list are loaded, so the URL cannot point the page at another stylesheet. */
(function () {
  var THEMES = {
    midnight: '#121A3A', teal: '#0F4A52', plum: '#2D1A45', clear: '#0956CC', pine: '#17402F', mono: '#111111',
    plumlime: '#2D1A45', cocoa: '#4E2F24', monolav: '#111111',
    navylime: '#1A2B85', merlot: '#561B3A', olive: '#38431F',
    ink: '#202838', cobalt: '#243B93', silver: '#292D32'
  };
  var name = new URLSearchParams(location.search).get('theme');
  if (!Object.prototype.hasOwnProperty.call(THEMES, name)) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'themes/' + name + '.css';
  document.head.appendChild(link);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEMES[name]);
})();

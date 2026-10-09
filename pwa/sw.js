const CACHE = 'envi-shell-v9-water-badge';
const FILES = ['index.html','style.css','metrics.js','app.js','interface.js','history.js','install.js','icon.svg','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await Promise.all((await caches.keys()).filter(key => key.startsWith('envi-shell-') && key !== CACHE).map(key => caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('message', event => { if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope);
  const isHome = event.request.mode === 'navigate' && (url.pathname === scope.pathname || url.pathname === scope.pathname + 'index.html');
  const file = isHome ? 'index.html' : FILES.find(name => new URL(name, scope).pathname === url.pathname);
  if (!file) return; // Never cache device APIs or authentication responses.
  event.respondWith((async () => {
    const cached = await (await caches.open(CACHE)).match(new URL(file, scope).href);
    return cached || fetch(event.request);
  })());
});




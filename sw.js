// Service worker: the whole app is stored on the phone,
// so after the first load it works without a server and without internet.
const CACHE = 'workspot-v3';
const ASSETS = ["./","index.html","manifest.json","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","https://unpkg.com/leaflet@1.9.4/dist/leaflet.css","https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // one by one: if one file fails, the rest is still cached
    await Promise.all(ASSETS.map(u => c.add(u).catch(() => {})));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // The page itself comes from the network when possible, otherwise the phone
  // would be stuck on an old version forever. Offline, serve the last saved copy.
  const isDoc = req.mode === 'navigate' || req.destination === 'document';
  if (isDoc) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req, { cache: 'no-store' });
        const c = await caches.open(CACHE);
        c.put(req, res.clone()).catch(() => {});
        return res;
      } catch (err) {
        return (await caches.match(req))
            || (await caches.match('index.html'))
            || (await caches.match('./'));
      }
    })());
    return;
  }

  // Everything else (photos, videos, icons, map) comes from the phone cache first.
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) {
        const c = await caches.open(CACHE);
        c.put(req, res.clone()).catch(() => {});
      }
      return res;
    } catch (err) {
      const any = await caches.match(req, { ignoreSearch: true });
      if (any) return any;
      throw err;
    }
  })());
});

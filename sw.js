self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('vault-cache-v2').then((cache) => {
      return cache.addAll(['./index.html', './manifest.json']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

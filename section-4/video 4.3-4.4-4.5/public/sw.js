const STATIC_CACHE_VERSION = 'static_1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

self.addEventListener('install', (event) => {
  // console.log('[SW] Installing Service Worker ...', event);
  console.log('[SW] Installing Service Worker ...');
  // accept promise
  event.waitUntil(
    // caches.open('static').then(cache => {
    //   cache.add('/');
    //   cache.add('/index.html');
    // })
    caches.open(STATIC_CACHE_VERSION)
    .then((cache) => {
      console.log('[SW] preached ready');
      return cache.addAll(STATIC_ASSETS);
    })
    .catch(e => {
      console.error('[SW] cache ready install error');
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker ....', event);
});

self.addEventListener('fetch', (event) => {
  // console.log('[SW] Activating Service Worker ....', event);
  console.log('[SW] Fetch ....');
  const request = event.request;

  if (request.url === 'http://127.0.0.1:8080/index.html') {
    event.respondWith(
      caches.match(request)
      .then((response) => {
        return response
      })
      .catch(console.error)
    );
  }
});

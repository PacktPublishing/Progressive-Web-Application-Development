self.addEventListener('install', function (event) {
  console.log('[SW] Installing SW...', event);
  // self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  console.log('[SW] activating SW...', event);
});

self.addEventListener('fetch', function (event) {
  console.log('[SW] fetching SW...', event);
});

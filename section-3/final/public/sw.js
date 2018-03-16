self.addEventListener('install', function (event) {
  console.log('[SW] Installing Service Worker ...', event);
});

self.addEventListener('activate', function (event) {
  console.log('[SW] Activating Service Worker ....', event);
});


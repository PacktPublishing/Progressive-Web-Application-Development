const STATIC_CACHE_VERSION = 'static_2';
const DYNAMIC_CACHE_VERSION = 'dynamic_2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/help.html',
  '/offline.html',
  '/css/skeleton.css',
  '/images/placeholder.png',
  '/css/style.css',
  '/js/main.js',
];

self.addEventListener('install', (event) => {
  // console.log('[SW] Installing Service Worker ...', event);
  console.log('[SW] Installing Service Worker ...');
  // accept promise
  event.waitUntil(
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

  // if (request.url === 'http://127.0.0.1:8080/index.html') {
  event.respondWith(
    caches.match(request)
    .then((response) => {
      return response || fetch(request).then((res) => {
        caches.open(DYNAMIC_CACHE_VERSION)
          .then((cache) => {
            cache.put(request, res);
          });
        return res.clone();
      }).catch((err) => {
        console.error('[SW] cache in fetch error');
        return caches.open(STATIC_CACHE_VERSION)
          .then(function (cache) {
            if (request.headers.get('accept').includes('text/html')) {
              return cache.match('/offline.html');
            }
            if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
              return cache.match('/images/placeholder.png');
            }
          });

      });
    })
    .catch(console.error)
  );
  // }
});

const STATIC_CACHE_VERSION = 'static_4';
const DYNAMIC_CACHE_VERSION = 'dynamic_4';
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

function preCache() {
  // caches.open('static').then(cache => {
  //   cache.add('/');
  //   cache.add('/index.html');
  // })
  return caches.open(STATIC_CACHE_VERSION)
    .then((cache) => {
      console.log('[SW] preached ready');
      return cache.addAll(STATIC_ASSETS);
    })
    .catch(e => {
      console.error('[SW] cache ready install error');
    });
}

self.addEventListener('install', (event) => {
  // console.log('[SW] Installing Service Worker ...', event);
  console.log('[SW] Installing Service Worker ...');
  // accept promise
  event.waitUntil(preCache());
});

function cleanUp() {
  return caches.keys()
    .then((keys) => {
      // console.log(keys)
      return Promise.all(keys.map((key) => {
        if (key !== STATIC_CACHE_VERSION && key !== DYNAMIC_CACHE_VERSION) {
          console.log('[SW] Removeing Old Caches ....', key);
          return caches.delete(key);
        }
      }));
    });
}

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker ....', event);
  event.waitUntil(cleanUp());
  return self.clients.claim();
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

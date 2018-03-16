var GOOGLE_FONT_URL = 'https://fonts.gstatic.com';
var CACHE_STATIC_NAME = 'pwanote-static_v1';
var CACHE_DYNAMIC_NAME = 'pwanote-dynamic_v1';
var STATIC_ASSETS = [
  '/',
  '/index.html',
  '/add.html',
  '/offline.html',
  '/favicon.ico',
  '/assets/js/main.js',
  '/assets/js/helpers.js',
  '/assets/js/db.js',
  '/assets/js/firebase.js',
  '/assets/js/libs/fetch.min.js',
  '/assets/js/libs/promise.min.js',
  '/assets/js/libs/material.min.js',
  '/assets/js/libs/idb.min.js',
  '/assets/css/style.css',
  '/assets/css/libs/material.min.css',
  '/manifest.json',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];

self.addEventListener('install', function (event) {
  // console.log('[SW] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
    .then(function (cache) {
      console.log('[SW] Precaching App Shell');
      return cache.addAll(STATIC_ASSETS);
    })
    .catch(function (e) {
      console.error('[SW] Precaching Error!', e);
    })
  );
});

self.addEventListener('activate', function (event) {
  // console.log('[SW] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            // console.log('[SW] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
    }));
  return self.clients.claim();
});

function isIncluded(string, array) {
  var path;
  if (string.indexOf(self.origin) === 0) {
    // request for same domain (i.e. NOT a CDN)
    path = string.substring(self.origin.length);
  } else {
    // for CDNs
    path = string;
  }
  return array.indexOf(path) > -1;
}

var isGoogleFont = function (request) {
  return request.url.indexOf(GOOGLE_FONT_URL) === 0;
};

var cacheGFonts = function (request) {
  return fetch(request)
    .then(function (newRes) {
      caches
        .open(CACHE_DYNAMIC_NAME)
        .then(function (cache) {
          // you can also Remove other old fonts here if you want
          cache.put(request, newRes);
        });
      return newRes.clone();
    });
};

self.addEventListener('fetch', function (event) {
  var request = event.request;
  // cacheOnly for statics assets
  if (isIncluded(request.url, STATIC_ASSETS)) {
    event.respondWith(caches.match(request));
  }
  // Runtime or Dynamic cache for google fonts
  if (isGoogleFont(request)) {
    event.respondWith(
      caches.match(request)
      .then(function (res) {
        return res || cacheGFonts(request);
      })
    );
  }
});

importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "add.html",
    "revision": "a10c5824fe914ecdf038700a47b4d75a"
  },
  {
    "url": "assets/css/libs/material.min.css",
    "revision": "0d64f3c2e287b623b346a0fb4384b75d"
  },
  {
    "url": "assets/css/style.css",
    "revision": "f051c862c9654d25c41b06811187b2c3"
  },
  {
    "url": "assets/images/icons/apple-icon-152x152.png",
    "revision": "3d0ec27099734b1b61715e535cf4a5d3"
  },
  {
    "url": "assets/images/icons/apple-icon-167x167.png",
    "revision": "2fa6811090d838d7ce59f987750a76aa"
  },
  {
    "url": "assets/images/icons/apple-icon-180x180.png",
    "revision": "9fbe0bb8eda240a388569cecab77e530"
  },
  {
    "url": "assets/images/icons/icon-114x114.png",
    "revision": "cb5b0f194c0169fb6bccfeb395b57e55"
  },
  {
    "url": "assets/images/icons/icon-144x144.png",
    "revision": "4ece563791b00a2c7ade5e1aa373f957"
  },
  {
    "url": "assets/images/icons/icon-192x192.png",
    "revision": "45cac75197cc8d8413a07ebf200c0ad5"
  },
  {
    "url": "assets/images/icons/icon-256x256.png",
    "revision": "3b1625494373519c68f65236187d192f"
  },
  {
    "url": "assets/images/icons/icon-384x384.png",
    "revision": "02e802622df3ac9c9fcefc32b7f31458"
  },
  {
    "url": "assets/images/icons/icon-48x48.png",
    "revision": "cba7c0d6a76facfbb5253a73becfa466"
  },
  {
    "url": "assets/images/icons/icon-512x512.png",
    "revision": "0215bddebebfc0c7250b6287bbe0fdff"
  },
  {
    "url": "assets/images/icons/icon-57x57.png",
    "revision": "558eb6b0e46521da10d1c2ae32ece07f"
  },
  {
    "url": "assets/images/icons/icon-72x72.png",
    "revision": "d45b536092d9b311835bbbaf6c1a987a"
  },
  {
    "url": "assets/images/icons/icon-76x76.png",
    "revision": "428a92b4c4e148841a5dab5364132102"
  },
  {
    "url": "assets/images/icons/icon-96x96.png",
    "revision": "4043177661a7843f07a18a07d86b1246"
  },
  {
    "url": "assets/js/helpers.js",
    "revision": "7e5b388909abb74527b13c781cf5a605"
  },
  {
    "url": "assets/js/libs/fetch.min.js",
    "revision": "61478bcdcb971c65d82e288077995c03"
  },
  {
    "url": "assets/js/libs/material.min.js",
    "revision": "12c6e3e5b562a9440844abb419b66707"
  },
  {
    "url": "assets/js/libs/promise.min.js",
    "revision": "09500f50b7e90fa9e6709bf8999e2ea6"
  },
  {
    "url": "assets/js/main.js",
    "revision": "102cec3400ba089649007bece4010d2a"
  },
  {
    "url": "favicon.ico",
    "revision": "f66cff8e23d522c4f1c640786b633fb6"
  },
  {
    "url": "index.html",
    "revision": "c4435af3166051ad3eb702ec102c43ff"
  },
  {
    "url": "manifest.json",
    "revision": "3d8526e0413a3781df0078c7f2493ab0"
  },
  {
    "url": "offline.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "sw.js",
    "revision": "08292efa6042d3343d421722c5264099"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);

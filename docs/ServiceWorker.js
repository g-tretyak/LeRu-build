const cacheName = "DefaultCompany-LeRu-v.01.12.02.2026.20:55";
const contentToCache = [
    "Build/ed5cf2989c31980a5445c599824aebd4.loader.js",
    "Build/478ecd4ea8c438fde32ed1c2b0090080.framework.js",
    "Build/750ddadf01c557ca4584029f0b19ce25.data",
    "Build/95f7a09390d5403fa7f3f0a624527bb7.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

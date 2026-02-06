const cacheName = "DefaultCompany-LeRu-v.01.06.02.2026.16:22";
const contentToCache = [
    "Build/03984065e02c1e8569f141375a4419ec.loader.js",
    "Build/df00ad00516d9af2e2fa4fd8fe373d66.framework.js",
    "Build/8553aca90676d6878ad8552bd5a81d45.data",
    "Build/a6e0b527325ad02bd5d1430568fd0338.wasm",
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

const CACHE_NAME = "markups";
const urlsToCache = [
  "index.html",
  "offline.html",
  "offline.css",
  "images/offline.png",
];

const self = this;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened the cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch((err) => {
        let url = event.request.url;
        if (url.endsWith(".css")) return caches.match("offline.css");
        if (url.endsWith(".jpg") || url.endsWith(".png"))
          return caches.match("images/offline.png");
        return caches.match("offline.html");
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName))
            return caches.delete(cacheName);
        })
      );
    })
  );
});

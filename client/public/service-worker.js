self.addEventListener("install", (event) => {
  console.log("SW installation event");
  event.waitUntil(
    caches.open("my-pwa-app").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        // Add other assets you want to cache
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("SW fetch event");
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

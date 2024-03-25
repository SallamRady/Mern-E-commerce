// TODO::declare our variables..
const STATIC_CACHE = "pre-cache";
const DYNAMIC_CACHE = "dynamic-cache";

/**
 * * Installation Event of Service Worker.
 * * handle store static cache
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    // * store STATIC_CACHE
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/offline",
          "/manifest.json",
          "/cart",
          "/register",
          "/login",
        ]);
      })
      .catch((err) => {
        console.log("SW-Error in installation::", err);
      })
  );
});

/**
 * Active Event
 * Here we will handle cleap-up process for our cache
 */
self.addEventListener("active", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
              return caches.delete(key);
            }
          })
        );
      })
      .catch((err) => {
        console.log("SW-Error in activation::", err);
      })
  );
});

/**
 * TrimCache
 * It's a function will remove an addational
 * items in dynamic cache to save our memory
 */
function trimCache(cacheName, mxLen) {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > mxLen) {
        cache.delete(keys[0]).then(() => trimCache(cacheName, mxLen));
      }
    });
  });
}
/**
 * Fetch Event
 * if exist in cache return it
 * else return it from network then store it in dynamic cache
 * if u are offline return offline page
 */
self.addEventListener("fetch", (event) => {
  console.log("SW fetch event");
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Exist in cache return it.
        if (response) return response;
        // else get it from network.
        return fetch(event.request).then((res) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request.url, res.clone());
            trimCache(DYNAMIC_CACHE, 10);
            return res;
          });
        });
      })
      .catch((err) => {
        // !Error in get request from network return offline page
        console.log("SW-Error in Fetch::", err);
        return caches.match("/offline");
      })
  );
});

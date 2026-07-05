const CACHE_NAME = "global-market-board-v55";
const APP_SHELL = [
  "./",
  "./index.html",
  "./about.html",
  "./disclaimer.html",
  "./privacy.html",
  "./contact.html",
  "./blog.html",
  "./guide.html",
  "./glossary.html",
  "./checklist.html",
  "./nikkei-contribution-guide.html",
  "./posts/nikkei225-cfd-vs-index.html",
  "./posts/soxx-vs-sox.html",
  "./posts/market-board-guide.html",
  "./styles.css?v=54",
  "./app.js?v=51",
  "./manifest.webmanifest",
  "./app-icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});

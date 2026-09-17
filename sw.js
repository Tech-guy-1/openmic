// Minimal service worker: makes the site installable and gives a basic
// offline fallback for the app shell. Deliberately network-first (not
// cache-first) so people always get the latest code and data, and
// deliberately skips every request to Supabase so live data (votes,
// posts, opportunities, auth) is never served from a stale cache.

const CACHE_NAME = "openmic-shell-v1";
const SHELL_FILES = ["index.html", "assets/supabase-client.js", "assets/logo.png", "assets/favicon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.hostname.includes("supabase.co")) return; // never cache live data or auth

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

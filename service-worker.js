const cacheName = "molegame-v5"; // 버전을 v2로 올려서 새 코드를 반영합니다.

const filesToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sieun.png",
  "./gaeun.png",
  "./doll.png",
  "./dad.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(() => self.skipWaiting()) // 설치 즉시 활성화
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          return caches.delete(key); // 이전 버전 캐시 삭제
        }
      }));
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
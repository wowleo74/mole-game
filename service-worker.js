// 버전을 v105로 높여서 브라우저가 새 코드를 강제로 새로고침하게 합니다.
const cacheName = "molegame-v105";

// 경로 앞에 서비스 명칭(/mole-game/)을 붙여주는 것이 안전합니다.
const filesToCache = [
  "/mole-game/",
  "/mole-game/index.html",
  "/mole-game/manifest.json",
  "/mole-game/sieun.png",
  "/mole-game/gaeun.png",
  "/mole-game/doll.png",
  "/mole-game/dad.png",
  "/mole-game/icon-192.png",
  "/mole-game/icon-512.png"
];

// 설치 단계: 파일을 캐시에 저장
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(() => self.skipWaiting()) // 즉시 활성화
  );
});

// 활성화 단계: 오래된 캐시 삭제
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// 호출 단계: 네트워크 우선 혹은 캐시 응답
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
const cacheName="molegame-v1"

const filesToCache=[
"/",
"/index.html",
"/sieun.png",
"/gaeun.png",
"/doll.png",
"/dad.png"
]

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(cacheName)
.then(cache=>cache.addAll(filesToCache))
)
})

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request)
.then(response=>response || fetch(e.request))
)
})
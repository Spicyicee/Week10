var cacheName ='petstore-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/catfood.png',
    'images/yarn.jpeg',
    'images/ball.jpg',
    'images/litter.jpg',
    'images/sandjpeg.jpeg',
    'images/icon-store-512.png',
];
// self.addEventListener('install', (e) =>{
//     console.log('[ServiceWorker] Install');
//     e.waitUntil(
//         caches.open(cacheName).then((cache) =>{
//             console.log('[Service Worker] Caching all the files');
//             return cache.addAll(cacheFiles);
//         })
//     );
// });
self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
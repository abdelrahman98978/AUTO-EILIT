const CACHE_NAME = 'auto-elite-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './images/favicon.svg',
  './images/hero-bg.svg',
  './images/showroom.svg',
  './images/car1.svg',
  './images/car2.svg',
  './images/car3.svg',
  './images/car4.svg',
  './images/car5.svg',
  './images/car6.svg',
  './images/client1.svg',
  './images/client2.svg',
  './images/client3.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap'
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح الكاش');
        return cache.addAll(urlsToCache);
      })
  );
});

// تنشيط Service Worker وحذف الكاش القديم
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// استراتيجية الكاش ثم الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد في الكاش، أعد الاستجابة من الكاش
        if (response) {
          return response;
        }
        
        // إذا لم يوجد في الكاش، قم بجلبه من الشبكة
        return fetch(event.request).then(
          response => {
            // تحقق من أن الاستجابة صالحة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // انسخ الاستجابة لأن الاستجابة هي تيار وتستخدم مرة واحدة فقط
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
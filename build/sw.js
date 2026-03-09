const CACHE_NAME = 'learnai-v1';
const CACHE_FILES = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(CACHE_FILES);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // API calls handle Network-first
    if (url.origin === location.origin && (url.pathname.includes('/recommend') || url.pathname.includes('/health'))) {
        event.respondWith(
            fetch(request)
                .catch(() => {
                    return caches.match(request).then((response) => {
                        if (response) return response;
                        return new Response(JSON.stringify({ error: "You are currently offline. Please check your connection." }), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                    });
                })
        );
        return;
    }

    // Static assets and pages
    event.respondWith(
        caches.match(request).then((response) => {
            if (response) return response;

            return fetch(request)
                .then((fetchResponse) => {
                    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                        return fetchResponse;
                    }

                    const responseToCache = fetchResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });

                    return fetchResponse;
                })
                .catch(() => {
                    if (request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                });
        })
    );
});

// Sync Event (Background Sync)
self.addEventListener('sync', (event) => {
    if (event.tag === 'recommend-sync') {
        event.waitUntil(retryRecommendation());
    }
});

// Push Event
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Your Courses Are Ready! 🎓';
    const options = {
        body: data.body || 'We found some perfect courses for you.',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        data: { url: '/recommend' }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

async function retryRecommendation() {
    // Logic to retry failed recommendation from IndexedDB would go here
    console.log('Retrying failed recommendations...');
}

const CACHE_NAME = 'clops-cache'
const urlsToCache = [
  '/',
  '/index.html?homescreen=1',
  '/?homescreen=1',
  '/index.html',
  '/favorites/*',
  '/all/*',
  '/map/*',
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
          // if it's not in the cache, server the regular network request.
          // And save it to the cache
          return resp || fetch(event.request).then(function(response) {
            return caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, response.clone())
              return response
            })
          })
        })


    )
})

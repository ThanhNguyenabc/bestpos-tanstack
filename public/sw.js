const CACHE_NAME = 'bestpos-v1'
const RUNTIME_CACHE = 'bestpos-runtime-v1'

const PRECACHE_URLS = ['/', '/pos.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name)),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') return

  if (url.origin === location.origin && url.pathname === '/pos.json') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request).then((response) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, response.clone())
            return response
          })
        })
      }),
    )
    return
  }

  if (url.hostname === 'res.cloudinary.com') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, response.clone())
              return response
            })
          }
          return response
        })
      }),
    )
  }
})

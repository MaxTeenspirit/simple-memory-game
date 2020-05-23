const staticCacheName = 'static-cache-v0';
const dynamicCacheName = 'dynamic-cache-v0';

const staticAssets = [
  './',
  './index.html',
  './img/images/icons/icon-128x128.png',
  './img/images/icons/icon-192x192.png',
  './style.css',
  './app.js',
  './script.js',
  './img/angular.svg',
  './img/aurelia.svg',
  './img/backbone.svg',
  './img/bg.jpeg',
  './img/ember.svg',
  './img/js-badge.svg',
  './img/react.svg',
  './img/vue.svg',
  './offline.html'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName); 
  await cache.addAll(staticAssets);
  console.log('Service Worker has been installed');
});

self.addEventListener('activate', async event => {
  const cachesKeys = await cahces.keys();
  const checkKeys = cachesKeys.map(async key => {
    if(staticCacheName !== key) {
      await caches.delete(key);
    }
  });
  await Promise.all(checkKeys);
  console.log('Service Worker has been activated');
});

self.addEventListener('fetch', async event => {
  console.log('Fetching');
  event.respondWith(caches.match(event.request).then(cachedResponse => {
    return cachedResponse || fetch(event.request)
  }));
});

async function checkCache(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || checkOnline(req);
} 

async function checkOnline(req) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (error) {
    const cachedRes = await cache.match(req);
    if(cachedRes) {
      return cachedRes
    } else if(req.url.indexOf('.html') !== -1) {
      return caches.match('./offline.html')
    } else {
      return null
    }


    return await cache.match(req); 
  }
}
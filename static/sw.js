importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "karai-music",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.7d30290068963ecff17e.js",
    "revision": "7fe473b2f06c77f61357c6aa88ce5e2a"
  },
  {
    "url": "/_nuxt/layouts/default.1751e76340d93ce19b4b.js",
    "revision": "9ea6059506d1598e9a79dc7d91090729"
  },
  {
    "url": "/_nuxt/manifest.8373753f6db0c4ff310e.js",
    "revision": "b24c86251bfe9f607aa11be7ce2f6b53"
  },
  {
    "url": "/_nuxt/pages/albums/_album/index.728a4c2af842aec285c7.js",
    "revision": "037037009bc4c120c9e9671c6e370f2d"
  },
  {
    "url": "/_nuxt/pages/albums/index.d099d3147117e74f042d.js",
    "revision": "fc5ca5f9a62737a64103850911bd8157"
  },
  {
    "url": "/_nuxt/pages/index.190821e7452e99ff1088.js",
    "revision": "d72fb2cad33fbd2a8e64150a20df12dd"
  },
  {
    "url": "/_nuxt/pages/radio/index.9539ff0b789167406e9d.js",
    "revision": "f90fe362d5b7c2bcaa978edf7993e681"
  },
  {
    "url": "/_nuxt/pages/tracks/_track/index.8aed6f4c667f43ff3d9d.js",
    "revision": "5aa4947b6ae6ce236aa2ae3caba4d38d"
  },
  {
    "url": "/_nuxt/pages/tracks/index.5093e8afaae42d9547f5.js",
    "revision": "841bcef1061f959b782ddee1732c4308"
  },
  {
    "url": "/_nuxt/vendor.bf273d01a2ce5bcaf9d6.js",
    "revision": "b78af8df7e32e931e910d92039960a56"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')


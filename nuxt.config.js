const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Karai Music',
    meta: [
      { charset: 'utf-8' },
      { name: 'google-site-verification', content: 'QU7SBL4iMOySnsWNxCm4czzlZUWuQ8-n0m_PTN-sxaI' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Music Sharing Site' },
      { property: 'og:site_name', content: 'Karai Music'},
      { hid: 'og:url', property: 'og:url', content: 'https://karaimusic.com'},
      { hid: 'og:description', property: 'og:description', content: 'Music site serving up the spiciest [ ka-ra-i / 辛い ] new tunes'},
      { hid: 'og:title', property: 'og:title', content: 'Karai Music'},
      { hid: 'og:image', property: 'og:image', content: 'https://karaimusic.co.uk/wp-content/uploads/2018/03/karai-logo.png'},
      { hid: 'og:image:alt', property: 'og:image:alt', content: `Karai Music` },
      { hid: 'og:type', property: 'og:type', content: 'object' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Base styles
  */
  css: ['@/assets/styles/main.scss'],
  loading: {color: '#E91E63'},
  generate: {
    fallback: true,
  },
  modules: ['@nuxtjs/sitemap',
    ['@nuxtjs/google-analytics', {
      id: 'UA-107203076-1'
    }]],
  sitemap: {
      hostname: 'https://karaimusic.com',
      generate: false,
      routes() {
        return axios.all([
          axios.get('https://karaimusic.co.uk/wp-json/wp/v2/posts?categories=2&per_page=100'),
          axios.get('https://karaimusic.co.uk/wp-json/wp/v2/posts?categories=3&per_page=100')
        ])
        .then(axios.spread((tracksRes, albumsRes) => {
          return [...tracksRes.data.map(track =>  '/tracks/' + track.slug),...albumsRes.data.map(album =>  '/albums/' + album.slug)]
        }))
      }
  }
}
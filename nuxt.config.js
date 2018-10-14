module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Karai Music',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Karai Music - Music Sharing Site' }
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
  sitemap: {
    hostname: 'https://karaimusic.co.uk',
    generate: true,
    routes () {
      return axios.all([
        axios.get('https://karaimusic.co.uk/wp-json/wp/v2/posts?categories=2'),
        axios.get('https://karaimusic.co.uk/wp-json/wp/v2/posts?categories=3')
      ])
      .then(axios.spread((tracksRes, albumsRes) => {
        return [...tracksRes.data.map(track =>  '/tracks/' + track.slug),...albumsRes.data.map(album =>  '/albums/' + album.slug)]
      }))
    }
  }
}

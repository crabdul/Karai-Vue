import axios from 'axios'
import CircularJSON from 'circular-json'

class WpApi {
  constructor (siteurl) {
    this.apiURL = `${siteurl}/wp-json/wp/v2/posts`
  }

//   posts () {
  posts () {
    return axios.get( this.apiURL, {
      params: {
        // category,
        // page,
        // category: "tracks",
        page: 1,
        per_page: 2
      }
    })
      .then(json => {
        return { posts: CircularJSON.stringify(json) }
        // return { posts: JSON.stringify(JSON.decycle(json)) }
      })
      .catch(e => {
        return { error: e }
      })
  }
}

const wp = new WpApi('https://karaimusic.co.uk/wp-json/wp/v2')

export default wp
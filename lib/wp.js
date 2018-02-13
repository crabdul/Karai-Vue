import axios from 'axios'
import CircularJSON from 'circular-json'

class WpApi {
    constructor(siteurl) {
        this.apiURL = `${siteurl}/wp-json/wp/v2`
    }
    //   Returns n posts from page m of specified category
    posts(category, page, per_page = 4) {
        return axios.get(`${this.apiURL}/posts`, {
                params: {
                    categories: category,
                    page: page,
                    per_page: per_page
                }
            })
            .then(json => {
                return json.data;
            })
            .catch(e => {
                return {
                    error: e
                }
            })
    }
    // Return Track Posts
    trackPosts(page, per_page) {
        return this.posts(2, page, per_page);
    }
    // Return Album Posts
    albumPosts(page, per_page) {
        return this.posts(3, page, per_page);
    }
    // Return Radio Posts
    radioPosts(page, per_page) {
        return this.posts(4, page, per_page);
    }
}

const wp = new WpApi('https://karaimusic.co.uk')

export default wp
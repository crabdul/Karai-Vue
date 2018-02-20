import axios from 'axios'

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
    getRadioPosts(page, per_page) {
        return this.posts(4, page, per_page);
    }
    // Return Inital Post 
    initialPosts() {
        return Promise.all([this.trackPosts(1,4), this.albumPosts(1,4), this.getRadioPosts(1,4)])
    }
    // Get Post by slug
    getPost(slug) {
        return axios.get(`${this.apiURL}/posts`, {
            params: {
                slug
            }
        })
        .then(json => {
            return json.data[0];
        })
        .catch(e => {
            return {
                error: e
            }
        })
    }
    // Get Post by Id
    getPostById(id) {
        return axios.get(`${this.apiURL}/posts/${id}`)
        .then(json => {
            return json.data;
        })
        .catch(e => {
            return {
                error: e
            }
        })
    }
}

const wp = new WpApi('https://karaimusic.co.uk')

export default wp
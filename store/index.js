import Vuex from 'vuex'
import wp from '~/lib/wp'

// Mutation Types
export const types = {
  INITIAL_TRACK_DATA: 'INITIAL_TRACK_DATA',
  INITIAL_ALBUM_DATA: 'INITIAL_ALBUM_DATA', 
  INITIAL_RADIO_DATA: 'INITIAL_RADIO_DATA',   
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      trackPosts: [],
      albumPosts: [],
      radioPosts: []
    },
    mutations: {
      [types.INITIAL_TRACK_DATA] (state, payload) {
        state.trackPosts = payload
      },
      [types.INITIAL_ALBUM_DATA] (state, payload) {
        state.albumPosts = payload
      },
      [types.INITIAL_RADIO_DATA] (state, payload) {
        state.radioPosts = payload
      },
    },
    actions: {
      nuxtServerInit ({ commit }) {
        const page = 1;
        return  wp.initialPosts()
          .then(res => {
            commit(types.INITIAL_TRACK_DATA, res[0])
            commit(types.INITIAL_ALBUM_DATA, res[1])
            commit(types.INITIAL_RADIO_DATA, res[2])
          })
      }
    },
    getters: {
        getTrackBySlug: (state) => (slug) => {
            return state.trackPosts.find(track => track.slug === slug.split('/')[2])
        }     
    }
  })
}

export default createStore
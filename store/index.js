import Vuex from 'vuex'
import wp from '~/lib/wp'

// Mutation Types
export const types = {
  INITIAL_TRACK_DATA: 'INITIAL_TRACK_DATA',
  INITIAL_ALBUM_DATA: 'INITIAL_ALBUM_DATA', 
  INITIAL_RADIO_DATA: 'INITIAL_RADIO_DATA',   
  ADD_TRACK_DATA: 'ADD_POST_DATA'
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
      [types.ADD_TRACK_DATA] (state, payload) {
        state.trackPosts.push(payload[0])
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
      },
      addPostData ({commit}, data) {
          commit(types.ADD_TRACK_DATA, data)
      }
    },
    getters: {
        getTrackBySlug: (state) => (slug) => {
            return state.trackPosts.find(track => track.slug === slug.split('/')[2])
        },
        checkTrackBySlug: (state) => (params) => {
            return state.trackPosts.find(track => track.slug === params.track) ? true : false
        }
    }
  })
}

export default createStore
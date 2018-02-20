import Vuex from 'vuex'
import wp from '~/lib/wp'

// Mutation Types
export const types = {
  SET_SONG_DATA: 'SET_SONG_DATA',
  OPEN_PLAYER: 'OPEN_PLAYER', 
  CLOSE_PLAYER: 'CLOSE_PLAYER',   
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      title: '',
      artist: '',
      coverArt: '',
      youtubeID: '',
      showPlayer: false
    },
    mutations: {
      [types.SET_SONG_DATA] (state, payload) {
        state.title = payload.title
        state.artist = payload.artist
        state.coverArt = payload.cover_art
        state.youtubeID = payload.youtube_id
      },
      [types.OPEN_PLAYER] (state) {
        state.showPlayer = true
      },
      [types.CLOSE_PLAYER] (state) {
        state.showPlayer = false
      }
    },
    actions: {
      songData ({ commit }, data) {
        commit(types.SET_SONG_DATA, data)
      },
      openPlayer ({ commit }) {
        commit(types.OPEN_PLAYER)
      },
      closePlayer ({ commit }) {
        commit(types.CLOSE_PLAYER)
      },
    },
    getters: {
        getTrackBySlug: (state) => (slug) => {
            return state.trackPosts.find(track => track.slug === slug.split('/')[2])
        },
        getPlayerState: state => {
          return state.showPlayer
        },
        getSongTitle: state => {
          return state.title
        },
        getSongArtist: state => {
          return state.artist
        },
        getSongCoverArt: state => {
          return state.coverArt
        },
        getSongYoutubeId: state => {
          return state.youtubeID
        },
    }
  })
}

export default createStore
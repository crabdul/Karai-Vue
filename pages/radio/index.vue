<template>
<div id="radio">
  <div class="spotify-player">
    <div class="spotify-player__container" :class="{ fadeOut: isFadingOut }">
      <iframe 
        :src="`https://open.spotify.com/embed?uri=spotify:user:karaimusic:playlist:${playingId}`" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
    </div>
  </div>
  <div class="playlist-selection">
    <div class="playlist-selection__container">
      <div class="playlist" 
        v-for="(playlist, index) in playlists" 
        v-bind:key="index"
        @click="changePlaylist(playlist)">
        <div class="playlist__container">
          <div class="playlist__number">
            {{ playlist.acf.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import wp from '~/lib/wp'
    export default {
    async asyncData ({ params }) {
        const n = 8
        const playlists = await wp.getRadioPosts(1,n)
        const mostRecent = playlists[playlists.length - 1]
        const playingId = mostRecent.acf.spotify_id
        return {
            playlists,
            mostRecent,
            playingId
        }
    },
    data() {
        return {
            activePlaylist: true,
            isFadingOut: false,
        }
    },
    head () {
        return {
            meta: [
                { property: 'og:url', content: 'https://karaimusic.com/radio/'},
                { property: 'og:description', content: 'Latest playlists'},
                { property: 'og:title', content: 'Karai Music | New Playlists'}
            ]
        }
    },
    methods: {
        changePlaylist(playlist) {
            this.playingId = playlist.acf.spotify_id
        }
    }
}
</script>


<style lang="scss" scoped>
    #radio {
        color: white;
        min-height: 100vh;
    }

    .spotify-player {
        padding-top: 64px;
        display: grid;
        .spotify-player__container {
            text-align: center;
        }
    }

    .playlist-selection {
        display: grid;
        grid-template-areas: 1fr 500px 1fr;
        grid-template-columns: '. playlists .';
        margin: 32px 0;
        .playlist-selection__container {
            grid-area: playlists;
            display: grid;
            grid-template-columns: 100px 100px 100px;
            grid-gap: 16px;
            .playlist {
                .playlist__container {
                    background-color: #212121;
                    border-radius: 5px;
                    padding: 4px 0;
                    cursor: pointer;
                    .playlist__number {
                        font-family: 'Lato', sans-serif;
                        font-size: 26pt;
                        font-style: italic; // text-shadow: -0.06em 0 red, 0.06em 0 cyan;
                        transition: all ease-out 0.3s;
                        text-align: center;
                    }
                }
                &:hover {
                    .playlist__number {
                        text-shadow: -0.06em 0 black, 0.08em 0 red;
                    }
                }
            }
        }
    }

    .active {
        .playlist__number {
            text-shadow: -0.06em 0 black, 0.08em 0 red !important;
            color: #E91E63;
        }
    }

</style>

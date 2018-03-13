<template>
    <div class="album-youtube">
        <div class="album-youtube__song" v-for="(song, index) in post.songs" :key="index">
            <div class="album-youtube__play-button" v-on:click="playSong(index)">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 64 64" width="24" height="24"><defs><clipPath id="_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR"><rect width="64" height="64"/></clipPath></defs><g clip-path="url(#_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR)"><path d=" M 1 32 C 1 14.891 14.891 1 32 1 C 49.109 1 63 14.891 63 32 C 63 49.109 49.109 63 32 63 C 14.891 63 1 49.109 1 32 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="1.5" stroke="rgb(255,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><polygon points="44,32.5,25,47,25,18" fill="rgb(255,255,255)"/></g></svg>
            </div>
            <div class="album-youtube__song-title">
                {{ song.song_title }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    post: { type: Object }
  },
  methods: {
      playSong: function(index) {
        this.$store.dispatch('songData', {
            title: this.post.songs[index].song_title,
            artist: this.post.artist,
            cover_art: this.post.cover_art,
            youtube_id: this.post.songs[index].song_youtube_id
        })
        this.$store.dispatch('openPlayer')
    },
  }
}
</script>


<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.album-youtube {
    margin-top: 32px;
    margin-bottom: 16px;
    .album-youtube__song {
        display: flex;
        align-self: center;
        margin: 8px 0;
        .album-youtube__play-button {
            display: inline-flex;
            margin-right: 8px;
            cursor: pointer;
            svg {
                height: 32px;
                width: 32px;
                transition: all ease-in 0.1s; // circle colour
                path {
                    stroke: #9E9E9E;
                }
                &:hover {
                    transform: scale(1.05);
                    path {
                        stroke: black;
                    }
                }
            }
        }
        .album-youtube__song-title {
            align-self: center;
        }
    }
}
.post {
    svg g polygon {
        fill: $black;
    }
    .album-youtube__song-title {
        color: $black;
    }
}

@media screen and (min-width: 1200px) {
    .album-youtube {
        display: grid;
        justify-content: center;
        align-content: center;
    }
}
</style>

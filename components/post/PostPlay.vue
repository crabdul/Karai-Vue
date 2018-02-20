<template>
  <div class="post-youtube">
    <div class="post-youtube__play-button" v-on:click="playSong()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 64 64" width="64" height="64"><defs><clipPath id="_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR"><rect width="64" height="64"/></clipPath></defs><g clip-path="url(#_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR)"><path d=" M 1 32 C 1 14.891 14.891 1 32 1 C 49.109 1 63 14.891 63 32 C 63 49.109 49.109 63 32 63 C 14.891 63 1 49.109 1 32 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="1.5" stroke="rgb(255,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><polygon points="44,32.5,25,47,25,18" fill="rgb(255,255,255)"/></g></svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object }
  },
  methods: {
      playSong: function() {
        this.$store.dispatch('songData', this.post)
        this.$store.dispatch('openPlayer')
    },
  }
}
</script>


<style lang="scss" scoped>
.post-youtube {
    margin-top: 32px;
    margin-bottom: 16px;
    .post-youtube__play-button svg {
        transition: all ease-in 0.1s; // circle colour
        path {
            stroke: #9E9E9E;
        }
        &:hover {
            transform: scale(1.05);
            path {
                stroke: white;
            }
        }
    }
}
</style>

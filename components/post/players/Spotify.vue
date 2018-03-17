<template>
  <div class="spotify-player">
      <iframe :src="`https://open.spotify.com/embed?uri=${uri}`" width="80" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  </div>
</template>

<script>
export default {
  props: {
      uri: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.spotify-player {
    margin: 32px 0;
}
</style>


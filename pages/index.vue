<template>
  <div class="container">
      <BlockTiles class="trackPosts" :posts="trackPosts" :section='"tracks"'/>
      <BlockTiles class="albumPosts" :posts="albumPosts" :section='"albums"'/>
      <BlockTiles class="radioPosts" :posts="radioPosts" :section='"radio"'/>
  </div>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import wp from '~/lib/wp'

export default {
  // GET Data before loading components
  async asyncData ({ params }) {
    const page = 1;
    const[trackPosts, albumPosts, radioPosts] = await wp.initialPosts()

    return {
      trackPosts,
      albumPosts,
      radioPosts,
    }
  },
  components: {
    BlockTiles
  }
}
</script>

<style lang="scss">

$screen-lg: 1024px;
$screen-m: 512px;

// Grid styling
.container {
    display: grid;
    grid-template-columns: 32px 1fr 32px;
    grid-template-areas: '. tracks .' '. albums .' '. radio .';

    font-family: 'Lato', sans-serif;
    font-style: italic;
    color: white;

}
.trackPosts {
    grid-area: tracks;
}
.albumPosts {
    grid-area: albums;
}
.radioPosts {
  grid-area: radio;
}

@media screen and (min-width: $screen-m) {
    .container {
        grid-template-columns: 1fr $screen-m 1fr;
    }
}

@media screen and (min-width: $screen-lg ) {
    .container {
        grid-template-columns: 1fr $screen-lg 1fr;
    }
}
</style>
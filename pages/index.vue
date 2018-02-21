<template>
  <div class="container">
      <BlockHero :post="trackPosts[0]" :section='"tracks"'/>
      <BlockTiles class="trackPosts" :posts="trackPosts.slice(1,5)" :section='"tracks"'/>
      <BlockHero :post="albumPosts[0]" :section='"albums"'/>
      <BlockTiles class="albumPosts" :posts="albumPosts.slice(1,5)" :section='"albums"'/>
      <BlockTiles class="radioPosts" :posts="radioPosts" :section='"radio"'/>
  </div>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import BlockHero from '~/components/home/BlockHero.vue'
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
    BlockTiles,
    BlockHero
  }
}
</script>

<style lang="scss">

$screen-lg: 1024px;
$screen-m: 512px;

// Grid styling
.container {
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
.hero {
    grid-area: hero;
}

@media screen and (min-width: $screen-m) {
    
}

@media screen and (min-width: $screen-lg ) {

}
</style>
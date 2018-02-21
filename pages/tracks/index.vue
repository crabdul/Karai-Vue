<template>
  <div class="tracks">
      <block-tiles :posts="posts" :section="'tracks'"/>
  </div>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import wp from '~/lib/wp'
import util from '~/lib/util'


export default {
    // GET Data before loading components
    async asyncData ({ params }) {
        const page = 1;
        const posts = await wp.getTrackPosts(1,12)
        return {
            posts
        }
    },
    components: {
        BlockTiles
    }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.tracks {
    font-family: 'Lato', sans-serif;
}

</style>


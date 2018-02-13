<template>
  <section class="container">
    <div>
      <BlockTiles :posts="trackPosts" />
    </div>
    <div>
      <BlockTiles :posts="albumPosts" />
    </div>
    <div>
      <BlockTiles :posts="radioPosts" />
    </div>
  </section>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import wp from '~/lib/wp'

export default {
  // GET Data before loading components
  async asyncData ({ params }) {
    const page = 1;
    const [trackPosts, albumPosts, radioPosts] = await Promise.all([
        wp.trackPosts(page),
        wp.albumPosts(page),
        wp.radioPosts(page)
      ])
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

<style>
.container {
  margin: 1rem auto;
  width: 90%;
  max-width: 900px;
}
</style>
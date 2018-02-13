<template>
  <section class="container">
    <div>
      <BlockTiles :posts="posts" />
    </div>
  </section>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import wp from '~/lib/wp'

export default {
  data() {
    return {
      posts: [],
    }
  },
  async asyncData ({ params }) {
    return wp.posts()
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
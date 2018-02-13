<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.id" class="post-list-item">
      <BlockTile :post="post" />
    </li>
  </ul>
</template>

<script>
import BlockTile from './BlockTile.vue'

export default {
  props: {
    posts: { type: Array }
  },
  components: {
    BlockTile
  }
}
</script>

<style scoped>
.post-list {
  padding: 0;
}

.post-list-item {
  list-style: none;
}
</style>
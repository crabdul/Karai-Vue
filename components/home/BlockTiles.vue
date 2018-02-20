<template>
  <section>
    <nuxt-link 
      :to="section" 
      tag="div" 
      class="section-header">
      <h2 class="section-title">new {{ section }}</h2>
    </nuxt-link>
    <ul class="items">
      <li v-for="post in posts" :key="post.id">
        <BlockTile :post="post" :category="section" class="item" v-if="section === 'tracks' || section === 'albums'"/>
        <RadioTile :post="post" :category="section" class="item" v-if="section === 'radio'"/>
      </li>
    </ul>
  </section>
</template>

<script>
import BlockTile from './BlockTile.vue'
import RadioTile from './RadioTile.vue'

export default {
  props: {
    posts: { type: Array },
    section: { type: String }
  },
  components: {
    BlockTile,
    RadioTile
  }
}
</script>

<style lang="scss" scoped>

$screen-lg: 1024px;
$screen-m: 512px;

@media screen and (min-width: $screen-m) {
    .items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 64px;
    }
}

@media screen and (min-width: $screen-lg ) {
    .items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 64px;
    }
}

section {
    margin: 32px 0;
    .section-header {
        display: flex;
        align-items: center;
        .section-title {
            font-size: 24pt;
            white-space: nowrap;
            margin-right: 16px;
            cursor: pointer;
            &:hover {
                color: #E91E63;
            }
        }
    }
}

</style>
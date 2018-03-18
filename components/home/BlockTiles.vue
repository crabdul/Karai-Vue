<template>
  <section>
    <ul class="items">
      <li v-for="post in posts" :key="post.id">
        <card :post="post" :category="section" v-if="section === 'tracks' || section === 'albums'"/>
      </li>
    </ul>
  </section>
</template>

<script>
import Card from '~/components/card/Card.vue'
import RadioTile from './RadioTile.vue'

export default {
  props: {
    posts: { type: Array },
    section: { type: String }
  },
  components: {
    Card,
    RadioTile
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

section {
    background-color: #f7f7f7;;
    position: relative;
    z-index: 20;

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

// Temp
section.radioPosts {
    padding-top: 32px;

}

.items li {
    margin: 32px 0;
}

@media screen and (min-width: $screen-m) {
    .items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 64px;
    }
    .items li {
        margin: 0;
    }
}

@media screen and (min-width: $screen-lg ) {
    .items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 64px;
    }
}




</style>
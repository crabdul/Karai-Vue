<template>
  <section>
    <ul class="radio__items">
      <li v-for="post in posts" :key="post.id">
        <RadioTile :post="post" :category="section" v-if="section === 'radio'"/>
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

.radio__items {
    height: 100%;
}
.radio__items li {
    margin: 32px 0;
    height: 100%;
}

@media screen and (min-width: $screen-m) {
    .radio__items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 64px;
    }
    .radio__items li {
        margin: 0;
    }
}

@media screen and (min-width: $screen-lg ) {
    .radio__items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 64px;
    }
}




</style>
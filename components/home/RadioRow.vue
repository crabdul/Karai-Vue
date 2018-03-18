<template>
  <section>
    <ul class="radio__items">
      <li v-for="post in posts" :key="post.id">
        <RadioTile :post="post" :category="section"/>
      </li>
    </ul>
  </section>
</template>

<script>
import RadioTile from './RadioTile.vue'

export default {
  props: {
    posts: { type: Array }
  },
  components: {
    RadioTile
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

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

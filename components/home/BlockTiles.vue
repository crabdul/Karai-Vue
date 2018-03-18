<template>
  <section>
    <ul class="cards">
      <li v-for="post in posts" :key="post.id">
        <card :post="post" :category="section"/>
      </li>
    </ul>
  </section>
</template>

<script>
import Card from '~/components/card/Card.vue'

export default {
  props: {
    posts: { type: Array },
    section: { type: String }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.cards li {
    margin: 32px 0;
}

@media screen and (min-width: $screen-m) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 64px;
    }
    .cards li {
        margin: 0;
    }
}

@media screen and (min-width: $screen-lg ) {
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 64px;
    }
}

</style>
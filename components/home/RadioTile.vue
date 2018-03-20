<template>
  <nuxt-link :to="{ name: 'radio', query: { playlist: post.acf.title }}">
      <div class="radio__item">
        <div class="radio__playlist">
            {{ post.acf.title }}
        </div>
      </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: { type: Object }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.radio__item {
  background-color: white;
  text-align: center;
  height: 100%;
  display: grid;
  align-content: center;
}

.radio__playlist {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 32pt;
  font-style: italic;

  &:hover {
    color: $pink-500;
  }
}

</style>

<template>
    <div class="item">
        <nuxt-link 
        :to="{ name: 'radio', query: { playlist: post.acf.title }}">
            <div class="img-container">            
                <div class="playlist-img__box">
                    <div class="playlist-img__number">
                        {{ post.acf.title }}
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
export default {
  props: {
    post: { type: Object }
  }
}
</script>

<style lang="scss" scoped>

  .playlist-img__box {
    background-color: white;
    border-radius: 5px;
    padding: 16px 0;

    .playlist-img__number {
      color: black;
      font-size: 40pt;
      text-shadow: -0.06em 0 red, 0.06em 0 cyan;
      text-align: center;
      transition: all ease-out 0.3s;

      &:hover {
        text-shadow: -0.06em 0 cyan, 0.06em 0 red;
      }
    }
  }
</style>

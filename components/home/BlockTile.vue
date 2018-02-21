<template>
  <div class="item">
    <nuxt-link 
      :to="`${category}/${post.slug}`"
      >
      <div class="img-container">
        <img :src="post.acf.cover_art" :alt="'post.acf.title post.acf.artist'">
      </div>
      <div class="info">
        <h3 class="title"> {{ post.acf.title }} </h3>
        <h3 class="artist">{{ post.acf.artist }} </h3>
        <h4 class="date">{{ post.acf.date }}</h4>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object },
    category: { type: String }
  }
}
</script>

<style lang="scss" scoped>
    .item {
        cursor: pointer;
        .info {
            text-align: center;
            * {
                margin: 16px 0;
            }
            .artist {
                color: white;
            }
            .title {
                font-style: normal;
                color: white;
                font-size: 13pt;
            }
            .date {
                font-size: 9pt;
                font-style: normal;
                color: lightgray;
            }
        }
        &:hover {
            .title,
            .artist {
                color: #E91E63;
            }
        }
    }

    img {
    width: 100%;
    border-radius: 5px;
}
</style>

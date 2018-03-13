<template>
    <div class="card">
        <nuxt-link 
        :to="`${category}/${post.slug}`"
        >
        <div class="card__img">
            <img :src="post.acf.cover_art" :alt="'post.acf.title post.acf.artist'">
        </div>
        <div class="card__details">
            <div class="card__post-details">
                <h3 class="card__title"> {{ post.acf.title }} </h3>
                <h3 class="card__artist">{{ post.acf.artist }} </h3>
            </div>
            <div class="card__meta">
                <p class="card__date">{{ date }}</p>
            </div>
        </div>
        </nuxt-link>
    </div>
</template>

<script>
import util from '~/lib/util'

export default {
  props: {
    post: { type: Object },
    category: { type: String }
  },
  computed: {
        date () {
            return util.getDate(this.post.date)
        }
  }
}
</script>

<style lang="scss" scoped>
.card {
    background-color: white;
    height: 100%;
    font-family: 'Roboto Condensed', sans-serif;

    cursor: pointer;
    .card__details {
        text-align: center;
        display: grid;
        .card__post-details {
            padding: 1rem;
            min-height: 70px;
        }
 
        .card__artist {
            color: #2b2b2b;
            margin-bottom: 12px;
        }
        .card__title {
            font-style: normal;
            color: #2b2b2b;
            font-size: 13pt;
            margin-bottom: 12px;
            font-weight: 700;
        }
        .card__date {
            font-size: 9pt;
            font-style: normal;
            color: lightgray;
            padding: 12px;
        }
    }
    &:hover {
        .card__title,
        .card__artist {
            color: #E91E63;
        }
    }
}

.card__img img {
    width: 100%;
}
</style>

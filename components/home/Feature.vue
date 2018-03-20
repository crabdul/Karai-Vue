<template>
<div class="feature">
    <div class="feature__bg">
        <div class="spread">
            <img :src="post.acf.cover_art" alt="">
        </div>
        <div class="shadow"></div>
    </div>
    <div class="feature__content">
        <div class="post">
            <div class="post__meta mv-16">
                <div class="card__genres">
                    <span class="card__genre" v-for="(genre, index) in genres" v-bind:key="index">{{ genre }}</span>
                </div>
                <div class="post__author">BY: {{ author }} </div>
                <div class="post__date">{{ date }} </div>
            </div>
            <nuxt-link :to="`${section}/${post.slug}`">
                <div class="post__cover-art mv-16">
                    <img :src="post.acf.cover_art" alt="">
                </div>
            </nuxt-link>
            <nuxt-link class="post__details" :to="`${section}/${post.slug}`" tag="div">
                <div class="post__title"><p>{{ post.acf.title }}</p></div>
                <div class="post__artist"><p>{{ post.acf.artist }}</p></div>
            </nuxt-link>
        </div>
    </div>
</div>
</template>

<script>
import util from '~/lib/util'

export default {
  props: {
      post: { type: Object },
      section: { type: String }
  },
    computed: {
        author () {
            return util.getAuthor(this.post.author)
        },
        date () {
            return util.getDate(this.post.date)
        },
        genres () {
            return util.getGenres(this.post.genre)
        }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';
@import 'assets/styles/mixins.scss';

.feature {
    position: relative;
    overflow: hidden;
    font-family: 'Roboto Condensed', sans-serif;
    color: whitesmoke;
}
.feature__content {
    position: relative;
    z-index: 20;
    height: 100%;
    display: grid;
}

.spread {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: blur(60px);
    }
}

.shadow {
    z-index: 15;
    position: absolute;
    background: rgba(0,0,0,.40);
    width: 100%;
    height: 100%;
}

.post {
    display: grid;
    grid-template-areas: 'art''details''meta';
    // grid-template-columns: 22% 23% 55%;
    justify-content: center;
    align-content: center;
    margin: 16px $margin-s;


}
.post__meta {
    display: grid;
    grid-area: meta;
    align-content: center;
    justify-content: center;
    font-style: normal;
    font-size: 9pt;
    text-align: center;
    * {
        margin: 4px 0;

    }
    .post__date {
        color: lightgray;
    }
}
.post__cover-art {
    justify-content: center;
    display: grid;
    grid-area: art;
    align-content: center;

    img {
        width: 100%;
                box-shadow: 0 8px 6px -6px black;

    }
}

.post__details {
    text-align: center;
    grid-area: details;
    align-content: center;
    display: grid;
    align-content: center;
    justify-content: center;
    cursor: pointer;

    .post__title {
        font-size: 20pt;
        margin-bottom: 16px;
        display: inline-block;
        font-style: italic;

        p {
            display: inline-block;
            border-bottom: 2px solid transparent;
        }
    }
    .post__artist {
        font-size: 16pt;
        display: inline-block;

        p {
            display: inline-block;
            border-bottom: 2px solid transparent;
        }
    }

    &:hover {
        .post__title p,
        .post__artist p{
            border-bottom: 2px solid white;
        }
    }
}


@media screen and (min-width: $screen-m) {
    .feature__header-container {
        margin-left: $margin-m;
        margin-right: $margin-m;
    }
    .post {
        margin-left: $margin-m;
        margin-right: $margin-m;
        grid-template-areas: 'meta art details';
        grid-template-columns: 20% 25% 55%;
    }
    .post__meta {
        justify-content: start;
        text-align: initial;
    }
}

@media screen and (min-width: $screen-lg) {
    .feature__header-container {
        margin-left: $margin-lg;
        margin-right: $margin-lg;
    }
    .post {
        margin-left: $margin-lg;
        margin-right: $margin-lg;
    }
}

</style>

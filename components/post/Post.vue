<template>
  <div class="post">
        <div class="post-details__container">
                <div class="post-details">
                    <h3>{{ post.acf.title }} </h3>
                    <h3 class="post-details__artist">{{ post.acf.artist }} </h3>
                    <div class="post-details__meta">
                        <h4 class="post-details__author">BY: Jolyon </h4>
                        <h4 class="post-details__date">{{ post.acf.date }} </h4>
                    </div>
                </div>
                <PostPlay :post="post.acf"/>
            </div>
            <div class="post-image__container">
                <div class="post-image">
                    <img :src="post.acf.cover_art" :alt="`${post.acf.title} ${post.acf.artist}`">
                </div>
                <div class="post-image__copyright">
                    {{ post.acf.label }}
                </div>
            </div>
            <div class="post-content__container">
                <div class="post-content" v-html="post.content.rendered">
                </div>
            </div>
  </div>
</template>

<script>
import PostPlay from '~/components/post/PostPlay.vue'

export default {
  props: {
      post: {type: Object},
      index: {type: Number}
  },
  components: {
      PostPlay
  }
}
</script>

<style lang="scss" scoped>
$red-A700: #D50000;
$screen-xl: 1300px;
$screen-lg: 960px;
$screen-m: 512px;

$image-lg: 384px;
$image-xl: 512px;

.infinity-container {
    position: relative;
    z-index: 1;
    color: white;
    font-family: 'Lato', sans-serif;
}

.post {
    display: grid;
    grid-template-columns: 16px 1fr 16px;
    grid-template-areas: '. image .''. header .''. content .';
    grid-gap: 16px;
    min-height: 100vh;
    align-content: center;
    margin: 64px 0;
}

.post:first-child {
    min-height: calc(100vh - 54px);
}

.post:last-child {
    min-height: 90vh;
}

.post-details__container {
    grid-area: header;
    display: grid;
    align-content: center;
    .post-details {
        * {
            margin: 8px 0;
        }
        h3 {
            font-size: 30pt;
        }
        .post-details__artist {
            font-style: italic;
            color: $red-A700;
        }
        .post-details__meta {
            margin-top: 32px;
            font-size: 10pt;
        }
        .post-details__date {
            color: #9E9E9E;
        }
    }
}

.post-image__container {
    grid-area: image;
    .post-image img {
        width: 100%;
    }
    .post-image__copyright {
        font-size: 9pt;
        color: grey;
    }
}

.post-content__container {
    grid-area: content;
    border-bottom: 2px solid grey;
    padding-bottom: 24px;
    display: grid;
    align-content: center;
    color: #E0E0E0;
    font-family: 'Lato-400', sans-serif;
    white-space: pre-wrap;
    line-height: 1.5;
    font-size: 10.5pt;
    
}

@media screen and (min-width: $screen-m) {
    .post {
        display: grid;
        grid-template-columns: 1fr 500px 1fr;
        grid-template-areas: '. image .''. header .''. content .';
        grid-gap: 16px;
        .post-content__container {
            margin-left: 0;
                font-size: 12pt;
        }
    }
}

@media screen and (min-width: $screen-lg) {
    .post {
        display: grid;
        grid-template-columns: 1fr 250px $image-lg 300px 1fr;
        grid-template-areas: '. header image content .';
        grid-gap: 0px;
        margin: 0;
        .post-content__container {
            margin-left: 48px;
            border-bottom: none;
            padding-bottom: 0;
                font-size: 10.5pt;
                max-height: $image-lg;
                overflow: scroll;
                padding-right: 8px;
        }
    }
}

@media screen and (min-width: $screen-xl) {
    .post {
        grid-template-columns: 1fr 384px $image-xl 384px 1fr;
        .post-content__container {
            margin-left: 64px;
                font-size: 12pt;
                max-height: $image-xl;
        }
        .post-details h3 {
            font-size: 36pt;
        }
    }
}
</style>


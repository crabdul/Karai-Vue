<template>
<div class="hero">
    <div class="spread">
        <img :src="post.acf.cover_art" alt="">
    </div>
    <div class="hero__content">
        <div class="hero__header-container mv-16">
            <nuxt-link 
            :to="section" 
            tag="div" 
            class="hero__header">
                <h2>new {{ section }}</h2>
            </nuxt-link>
        </div>
        <nuxt-link 
        :to="`${section}/${post.slug}`">
        <div class="post">
            <div class="post__meta mv-16">
                <div class="post__author">By: {{ post.author }} </div>
                <div class="post__date">{{ post.acf.date }} </div>
            </div>
            <div class="post__cover-art mv-16">
                <img :src="post.acf.cover_art" alt="">
            </div>
            <div class="post__details mv-16">
                <div class="post__title">{{ post.acf.title }}</div>
                <div class="post__artist">{{ post.acf.artist }} </div>
            </div>
        </div>
        </nuxt-link>
    </div>
</div>
</template>

<script>
export default {
  props: {
      post: { type: Object },
      section: { type: String }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.hero {
    width: 100%;
    position: relative;
}
.hero__content {
    position: relative;
    z-index: 5;
    height: 100%;
    display: grid;
}
.hero__header-container {
    margin-left: $margin-s;
    margin-right: $margin-s;
    display: grid;
    align-content: center;
}
.hero__header {
    padding: 8px 0;
    border-bottom: 1px solid white;
    cursor: pointer;
    h2 {
        font-size: 24pt;
    }
    &:hover {
        h2 {
            color: #E91E63;
        }
    }
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
        filter: blur(8px);
    }
}

.post {
    display: grid;
    grid-template-areas: 'art''details''meta';
    // grid-template-columns: 22% 23% 55%;
    justify-content: center;
    align-content: center;
    margin: 16px $margin-s;

    &:hover {
        .post__title {
            color: #E91E63;
        }
    }
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
    }
}

.post__details {
    text-align: center;
    display: grid;
    grid-area: details;
    align-content: center;
    .post__title {
        font-size: 28pt;
        margin-bottom: 16px;
    }
    .post__artist {
        font-size: 24pt;
    }
}
a {
    color: white;
}

@media screen and (min-width: $screen-m) {
    .hero__header-container {
        margin-left: $margin-m;
        margin-right: $margin-m;
    }
    .post {
        margin-left: $margin-m;
        margin-right: $margin-m;
        grid-template-areas: 'meta art details';
        grid-template-columns: 22% 23% 55%;
    }
    .post__meta {
        justify-content: start;
        text-align: initial;
    }
}

@media screen and (min-width: $screen-lg) {
    .hero__header-container {
        margin-left: $margin-lg;
        margin-right: $margin-lg;
    }
    .post {
        margin-left: $margin-lg;
        margin-right: $margin-lg;
    }
}

</style>

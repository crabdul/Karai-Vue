<template>
    <div class="post">
        <div class="post__header">
            <div class="post-image__container">
                <div class="post-image">
                    <img :src="post.acf.cover_art" :alt="decode(post.title.rendered)">
                </div>
                <div class="post-image__copyright">
                    {{ post.acf.label.toUpperCase() }}
                </div>
            </div>
            <div class="post-details__container">
                <div class="post-details">
                    <h3 class="post-details__title">{{ post.acf.title }} </h3>
                    <h3 class="post-details__artist">{{ post.acf.artist }} </h3>
                </div>
            </div>
            <PostPlayAlbum :post="post.acf"/>
        </div>
        <div class="post-content">
            <div class="post-content__text" v-html="post.content.rendered">
            </div>
            <div class="post-details__meta">
                <h4 class="post-details__author">BY: {{ author }}</h4>
                <h4 class="post-details__date">{{ date }} </h4>
            </div>
        </div>
    </div>
</template>

<script>
import util from '~/lib/util'
import PostPlayAlbum from '~/components/post/PostPlayAlbum.vue'

export default {
    data () {
        return {
            description: ''
        }
    },
    props: {
        post: {
            type: Object
        },
        category: {
            type: String
        },
        index: {
            type: Number
        }
    },
    head () {
        return {
            meta: [
                { hid: 'description', name: 'description', content: this.description },
                { hid: 'og:description', property: 'og:description', content: this.description },
                { property: 'og:type', content: 'article' },
                { hid: 'og:title', property: 'og:title', content: this.post.acf.abstract },
                { property: 'og:image', content: this.post.acf.cover_art },
                { hid: 'og:url', property: 'og:url', content: `https://karaimusic.com/${this.category}/${this.post.slug}`}
            ]
        }
    },
    components: {
        PostPlayAlbum,
    },
    computed: {
        author () {
            return util.getAuthor(this.post.author)
        },
        date () {
            return util.getDate(this.post.date)
        }
    },
    methods: {
        decode: function(str) {
			return str.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
		}
    },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.post {
    color: $black;
    background: linear-gradient(#f7f7f7, white);
    padding: 20px;
}

.post__header {
    display: grid;
    grid-template-areas: 'info' 'image' 'meta';
}

.post-details__container {
    grid-area: info;
    display: grid;
    align-content: center;
    .post-details {
        font-family: 'Roboto Condensed', sans-serif;
        text-align: center;
        margin-bottom: 24px;
        h3 {
            font-size: 24pt;
        }
        .post-details__title {
            font-weight: 700;
            margin: 8px 0;
        }
        .post-details__artist {
            font-style: italic;
            color: $red-A700;
            font-weight: 400;
        }
    }
}
.post-details__meta {
    grid-area: meta;
    font-size: 10pt;
    margin-bottom: 24px;
}

.post-details__author {
    margin: 8px 0;
}

.post-details__date {
    color: #9E9E9E;
}

.post-image__container {
    grid-area: image;
    .post-image img {
        width: 100%;
    }
    .post-image__copyright {
        margin-top: 8px;
        font-size: 9pt;
        color: grey;
    }
}

.post-content {
    display: grid;
    grid-template-areas: 'meta''content';
}

.post-content__text {
    grid-area: content;
    grid-area: content;
    padding-bottom: 24px;
    align-content: center;
    // color: #E0E0E0;
    color: $black;
    font-family: 'Lato-400', sans-serif;
    line-height: 2;
    font-size: 12pt;
    letter-spacing: 0.3px;
    white-space: pre-wrap;
    
}

@media screen and (min-width: $screen-m) {
    .post {
        padding: 32px;
    }
    .post-image__container {
        width: 66%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media screen and (min-width: $screen-ml) {
    .post {
        padding: 64px;
    }

    .post-image__container {
        width: 100%;
    }

    .post-image {
        width: 100%;
    }

    .post-content {
        grid-template-columns: 200px 600px 1fr;
        grid-template-areas: 'meta content .';
        margin: 32px 32px;
    }
    .post__header {
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-areas: 'image info play';
        justify-content: center;
        padding: 32px;
        background-color: white;
    }
    .post-details__container {
        grid-area: info;
        display: grid;
        align-content: center;
        .post-details {
            font-family: 'Roboto Condensed', sans-serif;
            text-align: center;
            h3 {
                font-size: 30pt;
            }
        }
    }
    .post-content__text {
        font-size: 14pt;
    }

}

@media screen and (min-width: $screen-xl) {
}
</style>


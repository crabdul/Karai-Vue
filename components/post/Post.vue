<template>
  <div class="post">
        <div class="post-details__container">
            <div class="post-details">
                <h3 class="post-details__title">{{ post.acf.title }} </h3>
                <h3 class="post-details__artist">{{ post.acf.artist }} </h3>
                <div class="post-details__meta">
                    <h4 class="post-details__author">BY: {{ author }}</h4>
                    <h4 class="post-details__date">{{ date }} </h4>
                </div>
            </div>
            <PostPlay :post="post.acf" v-if="post.acf.song_platform == 'Youtube'"/>
            <spotify-player :uri="post.acf.song_id" v-if="post.acf.song_platform == 'Spotify'"/>
        </div>
        <div class="post-image__container">
            <div class="post-image">
                <img :src="post.acf.cover_art" :alt="decode(post.title.rendered)">
            </div>
            <div class="post-image__copyright">
                {{ post.acf.label.toUpperCase() }}
            </div>
        </div>
        <div class="post-content__container">
            <div class="post-content" v-html="post.content.rendered">
            </div>
        </div>
    </div>
</template>

<script>
import util from '~/lib/util'
import PostPlay from '~/components/post/PostPlay.vue'
import PostPlayAlbum from '~/components/post/PostPlayAlbum.vue'
import SpotifyPlayer from '~/components/post/players/Spotify.vue'

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
        PostPlay,
        PostPlayAlbum,
        SpotifyPlayer
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

.infinity-container {
    position: relative;
    z-index: 1;
}

.post {
    display: grid;
    grid-template-columns: 16px 1fr 16px;
    grid-template-areas: '. image .''. header .''. content .';
    grid-gap: 16px;
    align-content: center;
    padding: 64px 0;
}

.post:last-child {
    min-height: 90vh;
}
.post:nth-child(even) {
    background-color: black;

    .post-content {
        color: $white;
    }
}

.post:nth-child(odd) {
    .post-details__title {
        color: $black;
    }
    .post-details__author {
        color: $black;
    }
    svg g polygon {
        fill: $black;
    }
}

.post-details__container {
    grid-area: header;
    display: grid;
    align-content: center;
    .post-details {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 400;
        * {
            margin: 8px 0;
        }
        h3 {
            font-size: 30pt;
        }
        .post-details__title {
            font-weight: 700;
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
        margin-top: 8px;
    }
}

.post-content__container {
    grid-area: content;
    padding-bottom: 24px;
    display: grid;
    align-content: center;
    // color: #E0E0E0;
}

.post-content {
    color: $black;
    font-family: 'Lato-400', sans-serif;
    line-height: 1.8;
    font-size: 12pt;
    white-space: pre-wrap;
}

@media screen and (min-width: $screen-m) {
    .post {
        display: grid;
        grid-template-columns: 1fr 500px 1fr;
        grid-template-areas: '. image .''. header .''. content .';
        grid-gap: 16px;
    }
    .post-content {
        font-size: 13pt;
    }
}

@media screen and (min-width: $screen-lg) {
    .post:first-child {
        height: calc(100vh - 54px);
    }
    .post {
        display: grid;
        grid-template-columns: 1fr 250px $image-lg 430px 1fr;
        grid-template-areas: '. header image content .';
        grid-gap: 0px;
        margin: 0;
        min-height: 600px;
        height: 100vh;
        .post-content__container {
            margin-left: 48px;
            border-bottom: none;
            padding-bottom: 0;
            max-height: $image-lg;
                // overflow: scroll;
                padding-right: 8px;
        }
    }
    .post-content {
        font-size: 11pt;
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


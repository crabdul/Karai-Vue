<template>
    <div id="posts">
        <div class="post" :id="'post__'+index" v-for="(post, index) in posts" :key="index">
            <div class="post-details__container">
                <div class="post-details">
                    <h3>{{ post.acf.title }} </h3>
                    <h3 class="post-details__artist">{{ post.acf.artist }} </h3>
                    <div class="post-details__meta">
                        <h4 class="post-details__author">BY: Jolyon </h4>
                        <h4 class="post-details__date">{{ post.acf.date }} </h4>
                    </div>
                </div>
                <div class="post-youtube">
                    <div class="post-youtube__play-button" v-on:click="playSong({title:post.field_title[0].value, artist:post.field_artist[0].value, image:post.field_cover_art[0].url, videoId:post.field_videoid[0].value})">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 64 64" width="64" height="64"><defs><clipPath id="_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR"><rect width="64" height="64"/></clipPath></defs><g clip-path="url(#_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR)"><path d=" M 1 32 C 1 14.891 14.891 1 32 1 C 49.109 1 63 14.891 63 32 C 63 49.109 49.109 63 32 63 C 14.891 63 1 49.109 1 32 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="1.5" stroke="rgb(255,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><polygon points="44,32.5,25,47,25,18" fill="rgb(255,255,255)"/></g></svg>
                    </div>
                </div>
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
    </div>
</template>

<script>

import wp from '~/lib/wp'

    // import { eventBus } from '../../components/eventBus/eventBus';

    export default {
        async asyncData ({ params }) {
            const posts = [await wp.getPost(params.track)]
            return {
                posts
            }
        },
        // Methods called here as mounted lifecycle hook doesn't run on the server-side rendinering
        mounted () {
            this.windowResize();
            this.windowScroll();
        },
        methods: {
            // Determine if central element is in the viewport
            isInViewportSingle: function(element) {
                var rect = element.getBoundingClientRect();
                var html = document.documentElement;
                return  rect.bottom <= ( window.innerHeight || html.clientHeight) && rect.top >= 0; 
            },
            // Determine if element is in the viewport
            isInViewport: function(element) {
                var rect = element.getBoundingClientRect();
                var html = document.documentElement;
                return  rect.bottom >= 0 && rect.top <= ( window.innerHeight || html.clientHeight); 
            },
            changeURL: function() {
                [...this.$el.querySelectorAll('.post')].forEach((post, index) => {
                    if (this.isInViewportSingle(post)) {
                        const slug = this.posts[index].field_slug[0].value;
                        this.$router.replace({
                            path: `/posts/${slug}`
                        })
                    }
                });
            },
            playSong: function(songInfo) {
                // if(eventBus.firstPlayer) {
                    const showPlayer = true;
                    eventBus.showPlayer(showPlayer);
                    eventBus.firstPlayer = false;
                // }
                setTimeout(() => {
                    eventBus.startPlayer(songInfo);
                }, 10);
            },
            parallax() {
                [...this.$el.querySelectorAll('.post')].forEach((post, index) => {
                    if (this.isInViewport(post)) {
                        const ratio = this.getParallaxRatio(post);
                        console.log(ratio);
                        post.querySelector('.post-content__container').style.transform = `matrix(1, 0, 0, 1, 0, ${ratio * 40})`;
                        post.querySelector('.post-details__container').style.transform = `matrix(1, 0, 0, 1, 0, ${ratio * 40})`;
                    }
                });
            },
            getParallaxRatio(element) {
                let rect = element.getBoundingClientRect();
                let html = document.documentElement;
                let midViewPort = html.clientHeight / 2;
                let midEl = (rect.top + rect.bottom) / 2;
                const ratio = (midEl - midViewPort)/midViewPort;
                return ratio
            },
            windowResize() {
                window.onresize = () => {
                    // toggle scroll event listener for parallax
                    if(window.innerWidth >= 960) {
                        window.addEventListener('scroll', this.parallax );
                    } else { 
                        window.removeEventListener('scroll', this.parallax );
                        // remove transformation
                        [...this.$el.querySelectorAll('.post-content__container')].forEach( e => e.style.transform = 'matrix(1, 0, 0, 1, 0, 0)');
                        [...this.$el.querySelectorAll('.post-details__container')].forEach( e => e.style.transform = 'matrix(1, 0, 0, 1, 0, 0)');
                    };
                }
            },
            windowScroll() {
                window.addEventListener('scroll', this.changeURL);
                if(window.innerWidth >= 960 ){
                    window.addEventListener('scroll', this.parallax );
                }
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.changeURL);
            window.removeEventListener('scroll', this.parallax);

        },
        beforeRouteUpdate(to, from, next) {
            this.$route.params.slug = '';
            next();
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

#posts {
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

.post-youtube {
    margin-top: 32px;
    margin-bottom: 16px;
    .post-youtube__play-button svg {
        transition: all ease-in 0.1s; // circle colour
        path {
            stroke: #9E9E9E;
        }
        &:hover {
            transform: scale(1.05);
            path {
                stroke: white;
            }
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
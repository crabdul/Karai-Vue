<template>
    <div class="infinity-container">
        <div class="albums-container" v-if="category == 'albums'">
            <div class="albums-inner" v-if="category == 'albums'">
                <AlbumPost v-if="category == 'albums'" :category="category" :id="'post__'+(index+1)" :post="post" :index="index" v-for="(post, index) in posts" :key="index"/>
            </div>
        </div>
        <TrackPost v-if="category == 'tracks'" :category="category" :id="'post__'+(index+1)" :post="post" :index="index" v-for="(post, index) in posts" :key="index"/>
    </div>
</template>

<script>
import wp from '~/lib/wp'
import TrackPost from '~/components/post/TrackPost.vue'
import AlbumPost from '~/components/post/AlbumPost.vue'

    export default {
        components: {
            TrackPost,
            AlbumPost
        },
        props: {
            posts: { type: Array },
            category: { type: String },
            isParallax: { type: Boolean }
        },
        data () {
            return {
                postCount: 1,
                currentPost: 0
            }
        },
        head () {
            return {
                title: `${this.posts[this.currentPost].acf.title} - ${this.posts[this.currentPost].acf.artist} | Karai Music`,
                meta: [
                    { hid: 'description', name: 'description', content: this.posts[this.currentPost].acf.abstract },
                    { hid: 'og:description', property: 'og:description', content: this.posts[this.currentPost].acf.abstract },
                    { property: 'og:type', content: 'article' },
                    { hid: 'og:title', property: 'og:title', content: `${this.posts[this.currentPost].acf.title} - ${this.posts[this.currentPost].acf.artist}` },
                    { property: 'og:image', content: this.posts[this.currentPost].acf.cover_art },
                    { hid: 'og:url', property: 'og:url', content: `https://karaimusic.com/${this.category}/${this.posts[this.currentPost].slug}`}
                ]
            }
        },
        // Methods called here as mounted lifecycle hook doesn't run on the server-side rendinering
        mounted () {
            this.windowResize();
            this.windowScroll();
            // this.infiniteScroll();
        },
        methods: {
            // Determine if central element is in the viewport
            isInViewportSingle: function(element) {
                var rect = element.getBoundingClientRect();
                var html = document.documentElement;
                return  rect.bottom <= ( window.innerHeight + 100 || html.clientHeight + 100) && rect.top >= 0; 
            },
            // Determine if element is in the viewport
            isInViewport: function(element) {
                var rect = element.getBoundingClientRect();
                var html = document.documentElement;
                return  rect.bottom >= 0 && rect.top <= ( window.innerHeight || html.clientHeight); 
            },
            changeURL: function() {
                [...this.$el.querySelectorAll('.post')].forEach((post, index) => {
                    if (this.isInViewportSingle(post) && (index !== this.currentPost)) {
                        const slug = this.posts[index].slug;
                        history.pushState(null, null, `/${this.category}/${slug}`)
                        this.currentPost = index
                    }
                });
            },
            parallax() {
                [...this.$el.querySelectorAll('.post')].forEach((post, index) => {
                    if (this.isInViewport(post)) {
                        const ratio = this.getParallaxRatio(post);
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
            
            windowScroll () {
                window.addEventListener( 'scroll', this.changeURL)
                if (window.innerWidth >= 960){
                    window.addEventListener( 'scroll', this.parallax )
                }
                window.addEventListener( 'scroll', this.infiniteScroll)
            },
            infiniteScroll () {
                const posts = this.$el.querySelectorAll('.post')
                const lastPost = posts[posts.length - 1]
                if (this.isInViewport(lastPost) && (lastPost.id.split('__')[1] == this.postCount)) {
                    window.removeEventListener('scroll', this.infiniteScroll)
                    this.getNextPost();
                }
            },
            getNextPost () {
                const nextPostId  = this.posts[this.posts.length - 1].next_post
                if(nextPostId) {
                    wp.getPostById(nextPostId)
                    .then(post => {
                        this.posts.push(post)
                        this.postCount++
                        window.addEventListener( 'scroll', this.infiniteScroll)
                    })
                }
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.changeURL)
            window.removeEventListener('scroll', this.parallax)
            window.removeEventListener('scroll', this.infiniteScroll)
        }
    }
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.infinity-container {
    position: relative;
    z-index: 1;
}

@media screen and (min-width: $screen-lg) {
    .albums-container {
        display: grid;
        grid-template-columns: 1fr $screen-lg 1fr;
        grid-template-areas: '. albums .'
    }

    .albums-inner {
        grid-area: albums;
    }
}

</style>

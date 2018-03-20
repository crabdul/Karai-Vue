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
                    { hid: 'og:url', property: 'og:url', content: `https://karaimusic.com/${this.category}/${this.posts[this.currentPost].slug}`},
                ]
            }
        },
        // Methods called here as mounted lifecycle hook doesn't run on the server-side rendinering
        mounted () {
            this.windowResize()
            if (window.innerWidth >= 514 && this.isParallax) this.addParallax()
            this.addInfiniteScroll()
            this.addChangeUrl()
        },
        methods: {
            // Determine if central element is in the viewport
            isInViewportSingle (element) {
                let rect = element.getBoundingClientRect();
                let html = document.documentElement;
                return  rect.bottom <= (window.innerHeight || html.clientHeight) && rect.top >= 0; 
            },
            // Determine if element is in the viewport
            isInViewport (element) {
                let rect = element.getBoundingClientRect();
                let html = document.documentElement;
                return  rect.bottom >= 0 && rect.top <= ( window.innerHeight || html.clientHeight); 
            },
            changeURL: function() {
                [...this.$el.querySelectorAll('.post')].forEach((post, index) => {
                    if (this.isInViewportSingle(post.querySelector('.post-image')) && (index !== this.currentPost)) {
                        const slug = this.posts[index].slug;
                        history.pushState(null, null, `/${this.category}/${slug}`)
                        this.currentPost = index
                    }
                });
            },
            parallax() {
                [...this.$el.querySelectorAll('.post')].forEach((e, index) => {
                    const ratio = this.getParallaxRatio(e);
                    this.applyMatrixTransformation(e.querySelector('.post-content__container'), ratio)
                    this.applyMatrixTransformation(e.querySelector('.post-details__container'), ratio)
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
                window.onresize = () => (window.innerWidth >= 514) ? this.addParallax() : this.removeParallax()
            },
            applyMatrixTransformation (element, ratio) {
                element.style.transform = `matrix(1, 0, 0, 1, 0, ${ratio * 40})`
            },
            addInfiniteScroll () {
                window.addEventListener( 'scroll', this.infiniteScroll)
            },
            removeInfinitScroll () {
                window.removeEventListener('scroll', this.infiniteScroll)
            },
            addChangeUrl () {
                window.addEventListener( 'scroll', this.changeURL)
            },
            removeChangeUrl () {
                window.removeEventListener('scroll', this.changeURL)
            },
            addParallax () {
                window.addEventListener( 'scroll', this.parallax )
            },
            removeParallax () {
                window.removeEventListener('scroll', this.parallax );
                [...this.$el.querySelectorAll('.post-content__container')].forEach( e => this.applyMatrixTransformation(e, 0));
                [...this.$el.querySelectorAll('.post-details__container')].forEach( e => this.applyMatrixTransformation(e, 0));
            },
            infiniteScroll () {
                const lastPost = this.$el.querySelector('.post:last-child')
                if (this.isInViewport(lastPost) && (lastPost.id.split('__')[1] == this.postCount)) {
                    this.removeInfinitScroll()
                    this.getNextPost()
                }
            },
            getNextPost () {
                const nextPostId  = this.posts[this.posts.length - 1].next_post
                if(nextPostId) {
                    wp.getPostById(nextPostId)
                    .then(post => {
                        this.posts.push(post)
                        this.postCount++
                        this.addInfiniteScroll()
                    })
                }
            }
        },
        destroyed() {
            this.removeChangeUrl()
            this.removeParallax()
            this.removeInfinitScroll()
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

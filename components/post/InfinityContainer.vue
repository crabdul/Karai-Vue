<template>
    <div class="infinity-container">
        <Post class="post" :id="'post__'+(index+1)" :post="post" :index="index" v-for="(post, index) in posts" :key="index"/>
    </div>
</template>

<script>
import wp from '~/lib/wp'
import Post from '~/components/post/Post.vue'
    // import { eventBus } from '../../components/eventBus/eventBus';

    export default {
        components: {
            Post
        },
        props: {
            posts: { type: Array}
        },
        data () {
            return {
                postCount: 1
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
                    if (this.isInViewportSingle(post)) {
                        const slug = this.posts[index].slug;
                        history.pushState(null, null, `/tracks/${slug}`)
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

.infinity-container {
    position: relative;
    z-index: 1;
    color: white;
    font-family: 'Lato', sans-serif;
}

</style>
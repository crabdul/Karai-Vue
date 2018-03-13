<template>
    <div class="infinity-container">
        <Post v-if="category == 'tracks'" :category="category" :id="'post__'+(index+1)" :post="post" :index="index" v-for="(post, index) in posts" :key="index"/>
        <AlbumPost v-if="category == 'albums'" :category="category" :id="'post__'+(index+1)" :post="post" :index="index" v-for="(post, index) in posts" :key="index"/>
    </div>
</template>

<script>
import wp from '~/lib/wp'
import Post from '~/components/post/Post.vue'
import AlbumPost from '~/components/post/AlbumPost.vue'

    export default {
        components: {
            Post,
            AlbumPost
        },
        props: {
            posts: { type: Array },
            category: { type: String }
        },
        data () {
            return {
                postCount: 1,
                currentPost: 0
            }
        },
        head () {
            return {
                title: `${this.posts[this.currentPost].acf.title} - ${this.posts[this.currentPost].acf.artist} | Karai Music`
            }
        },
        // Methods called here as mounted lifecycle hook doesn't run on the server-side rendinering
        mounted () {
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
            windowScroll () {
                window.addEventListener( 'scroll', this.changeURL)
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

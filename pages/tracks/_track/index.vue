<template>
    <div>
        <infinity-container :posts="post" :category="'tracks'" :isParallax="true" />
    </div>
</template>

<script>
import wp from '~/lib/wp'
import InfinityContainer from '~/components/post/InfinityContainer.vue'
    export default {
        components: {
            InfinityContainer
        },
        async asyncData ({ params }) {
            const post = [await wp.getPost(params.track)]
            return {
                post
            }
        },
        head () {
            return {
                title: `${this.post[0].acf.title} - ${this.post[0].acf.artist} | Karai Music`,
                meta: [
                    { hid: 'description', name: 'description', content: this.post[0].acf.abstract },
                    { hid: 'og:description', property: 'og:description', content: this.post[0].acf.abstract },
                    { property: 'og:type', content: 'article' },
                    { hid: 'og:title', property: 'og:title', content: `New Track | "${this.post[0].acf.title}" by ${this.post[0].acf.artist}`},
                    { hid: 'og:image', property: 'og:image', content: this.post[0].acf.cover_art },
                    { hid: 'og:image:alt', property: 'og:image:alt', content: `${this.post[0].acf.title} - ${this.post[0].acf.artist}` },
                    { hid: 'og:url', property: 'og:url', content: `https://karaimusic.com/tracks/${this.post[0].slug}`},
                    { property: 'og:image:width', content: `500`},
                    { property: 'og:image:height', content: `500`}
                ]
            }
        },
    }
    

</script>

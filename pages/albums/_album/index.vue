<template>
    <div>
        <infinity-container :posts="post" :category="'albums'" :isParallax="false"/>
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
            const post = [await wp.getPost(params.album)]
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
                    { hid: 'og:title', property: 'og:title', content: `${this.post[0].acf.title} - ${this.post[0].acf.artist} | Karai Music`},
                    { property: 'og:image', content: this.post[0].acf.cover_art },
                    { property: 'og:image:alt', content: `${this.post[0].acf.title} - ${this.post[0].acf.artist}` },
                    { hid: 'og:url', property: 'og:url', content: `https://karaimusic.com/albums/${this.post[0].slug}`},
                ]
            }
        }
    }
    

</script>

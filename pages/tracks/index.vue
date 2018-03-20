<template>
    <div class="tracks-page">
        <list-posts :category="'tracks'" :isTrack="false" :posts="posts"/>
    </div>
</template>

<script>
import ListPosts from '~/components/list/ListPosts.vue'
import wp from '~/lib/wp'

export default {
    components: {
        ListPosts
    },
    head () {
        return {
            meta: [
                { hid: 'og:url', property: 'og:url', content: 'https://karaimusic.com/tracks/'},
                { hid: 'og:description', property: 'og:description', content: 'Latest tracks released'},
                { hid: 'og:title', property: 'og:title', content: 'Karai Music | New tracks'},
                { property: 'og:type', content: 'object' },
                { property: 'og:image', content: this.posts[3].acf.cover_art },

            ]
        }
    },
    async asyncData ({ params }) {
        const posts = await wp.getTrackPosts(1,12)
        return {
            posts
        }
    },
}
</script>

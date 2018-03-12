<template>
  <div class="tracks">
      <block-tiles :posts="posts" :section="'tracks'"/>
  </div>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import wp from '~/lib/wp'
import util from '~/lib/util'


export default {
    // GET Data before loading components
    async asyncData ({ params }) {
        const posts = await wp.getTrackPosts(1,12)
        return {
            posts
        }
    },
    components: {
        BlockTiles
    },
    head () {
        return {
            meta: [
                { hid: 'og:url', property: 'og:url', content: 'https://karaimusic.com/tracks/'},
                { hid: 'og:description', property: 'og:description', content: 'Latest tracks released'},
                { hid: 'og:title', property: 'og:title', content: 'Karai Music | New Tracks'},
                { property: 'og:type', content: 'object' }
            ]
        }
    },
    data () {
        return {
            page: 2
        }
    },
    mounted () {
        document.addEventListener('scroll', this.checkBottomReached)
    },
    methods: {
        checkBottomReached () {
            const e = document.querySelector('.items').lastChild
            if (util.isInViewport(e)) {
                this.getNewPosts()
            }
        },
        getNewPosts () {
            document.removeEventListener('scroll', this.checkBottomReached)
            wp.getTrackPosts(this.page, 12)
            .then( posts => {
                posts.forEach(post => this.posts.push(post))
                this.page++
                document.addEventListener('scroll', this.checkBottomReached)
            })
            .catch(e => document.removeEventListener('scroll', this.checkBottomReached))
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.tracks {
    font-family: 'Lato', sans-serif;
}

</style>


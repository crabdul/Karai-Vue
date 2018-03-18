<template>
    <div class="list-page">
        <div class="page-header">
            <h2>best new {{ category }}</h2>
        </div>
        <div class="container-fluid">
            <row-cards class="content" :posts="posts" :section="category"/>
        </div>
    </div>
</template>

<script>
import RowCards from '~/components/home/RowCards.vue'
import wp from '~/lib/wp'
import util from '~/lib/util'

export default {
    props: {
        isTrack: { type: Boolean },
        category: { type: String },
        posts: { type: Array }
    },
    components: {
        RowCards
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
            try {
                const e = document.querySelector('.infinity-container').lastChild
                if (util.isInViewport(e)) {
                    this.getNewPosts()
                }
            } catch (error) {
                document.removeEventListener('scroll', this.checkBottomReached)
            }
        },
        getNewPosts () {
            document.removeEventListener('scroll', this.checkBottomReached)
            wp.getPostByCategory(this.category, this.page, 12)
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

.list-page {
    margin-bottom: 64px;
}

.page-header {
    text-align: center;
    margin: 64px 0;

    h2 {
        font-size: 32pt;
    }
}

.content {
    grid-area: content;
}

.container-fluid {
    position: relative;
    margin: 0 32px;
}

@media screen and (min-width: $screen-lg) {
    .container-fluid {
        display: grid;
        grid-template-columns: 1fr $screen-lg 1fr;
        grid-template-areas: '. content .';
    }
    .page-header {
        h2 {
            font-size: 40pt;
        }
    }
}
</style>


<template>
    <div>
        <infinity-container :posts="post"/>
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
        }
    }
    

</script>


<style lang="scss" scoped>


</style>
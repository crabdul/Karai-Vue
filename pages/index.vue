<template>
    <div id="home-page">
        <div class="container">
            <row-title :section="tracks" :sectionTitle="tracksTitle">
                <feature slot="content" :post="trackPosts[0]" :section="tracks"/>
            </row-title>
            <BlockTiles :posts="trackPosts.slice(1,5)" :section="tracks"/>
            <row-title :section="albums" :sectionTitle="albumsTitle">
                <feature slot="content" :post="albumPosts[0]" :section="albums"/>
            </row-title>            
            <BlockTiles :posts="albumPosts.slice(1,5)" :section="albums"/>
            <row-title :section="radio" :sectionTitle="radioTitle">
                <radio-cards slot="content" class="feature radio-posts" :posts="radioPosts" :section="radio"/>
            </row-title>
        </div>
    </div>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import RadioCards from '~/components/home/RadioCards.vue'
import Feature from '~/components/home/Feature.vue'
import RowTitle from '~/components/home/RowTitle.vue'
import wp from '~/lib/wp'

export default {
  // GET Data before loading components
  async asyncData ({ params }) {
    const page = 1;
    const[trackPosts, albumPosts, radioPosts] = await wp.initialPosts()
    return {
      trackPosts,
      albumPosts,
      radioPosts,
    }
  },
  components: {
    BlockTiles,
    RowTitle,
    RadioCards,
    Feature
  },
  data () {
      return {
          tracksTitle: 'best new tracks',
          tracks: 'tracks',
          albumsTitle: 'best new albums',
          albums: 'albums',
          radioTitle: 'karai radio',
          radio: 'radio'
      }
  }
}
</script>

<style lang="scss">
#home-page {
    background-color: #f7f7f7;
}
.container > * {
    margin: 64px 32px;
}

</style>
<template>
    <div id="home-page">
        <div class="container">
            <row-title :section="tracks" :sectionTitle="tracksTitle">
                <feature slot="content" :post="trackPosts[0]" :section="tracks"/>
            </row-title>
            <row-cards :posts="trackPosts.slice(1,5)" :section="tracks"/>
            <row-title :section="albums" :sectionTitle="albumsTitle">
                <feature slot="content" :post="albumPosts[0]" :section="albums"/>
            </row-title>            
            <row-cards :posts="albumPosts.slice(1,5)" :section="albums"/>
            <row-title :section="radio" :sectionTitle="radioTitle">
                <radio-cards slot="content" class="feature radio-posts" :posts="radioPosts" :section="radio"/>
            </row-title>
        </div>
    </div>
</template>

<script>
import RowCards from '~/components/home/RowCards.vue'
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
    RowCards,
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
@import 'assets/styles/util.scss';

#home-page {
    background-color: #f7f7f7;
}
.container > * {
    margin: 64px 32px;
}

@media screen and (min-width: $screen-lg) {
    #home-page {
        display: grid;
        grid-template-areas: '. container .';
        grid-template-columns: 1fr $container 1fr;
    }
    .container {
        grid-area: container;
        > * {
            margin: 64px 0;
        }
    }
}

</style>